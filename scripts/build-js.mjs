// Precompile the browser JSX and vendor React for index.html.
//
//   npm run build:js       # write dist/ + vendor/
//   npm run verify:build   # rebuild in memory, fail if the committed copy drifted
//
// WHY THIS EXISTS: index.html used to fetch react, react-dom and
// @babel/standalone from unpkg and compile profile.jsx / tweaks-panel.jsx in
// the visitor's browser on every single load. That put first render behind
// three third-party requests plus an in-page compiler: a cold-start cost on a
// page that is otherwise a handful of static files, a permanently blank #root
// whenever unpkg is slow, unreachable, or blocked (corporate proxy, extension,
// strict CSP), and a standing obstacle to ever setting a script-src policy.
// Everything index.html loads is now same-origin and already compiled.
//
// COMPILE, DON'T BUNDLE: these files are classic global scripts, not ES
// modules — profile.jsx reads window.PORTFOLIO, window.TweaksPanel and the
// design-system primitives off the global object instead of importing them,
// and index.html owns the load order. So this runs esbuild's JSX *transform*
// once per file and emits a plain-JS sibling that is loaded exactly where its
// source used to be. Bundling would mean rewriting every cross-file reference
// into an import graph — a far larger change than removing the CDN needs.
//
// THE OUTPUT IS COMMITTED: GitHub Pages serves this repo's files exactly as
// they are checked in; there is no deploy step to build in. That makes dist/
// and vendor/ copies that can silently go stale against their sources, which
// is the whole reason for --check (npm run verify:build, wired into CI).

import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { transform } from "esbuild";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(SCRIPT_DIR, "..");
const DIST_DIR = path.join(REPO_ROOT, "dist");
const VENDOR_DIR = path.join(REPO_ROOT, "vendor");

// Sources compiled 1:1 into dist/. Each one must keep handing itself to the
// page through `window` (Object.assign(window, …) / window.ProfilePage = …),
// because the IIFE wrapper below denies it any other way out.
const JSX_SOURCES = ["tweaks-panel.jsx", "profile.jsx"];

// Third-party runtime copied out of node_modules into vendor/. It has to be
// the UMD build specifically: that is the one that defines the `React` and
// `ReactDOM` globals these scripts expect. The packages' default entry points
// are CommonJS and define nothing at all when loaded with a <script> tag.
const VENDOR_FILES = [
  { pkg: "react", from: "umd/react.production.min.js" },
  { pkg: "react-dom", from: "umd/react-dom.production.min.js" },
];

// Syntax floor for the emitted JSX. es2020 covers every feature the sources
// actually use (optional chaining, nullish coalescing), so nothing is
// downleveled: each output file is its source with JSX lowered and comments
// dropped (esbuild reprints from the AST), and nothing else. That is what keeps
// a `git diff` over dist/ reviewable — and it is an explicit floor rather than
// whatever @babel/standalone's default preset happened to emit, which nobody
// here ever chose. The explanatory comments stay where they belong, in the
// .jsx sources.
const TARGET = "es2020";

const rel = (file) => path.relative(REPO_ROOT, file).split(path.sep).join("/");

function generatedBanner(sourceName) {
  return `// GENERATED FILE — do not edit. Compiled from ${sourceName} by
// scripts/build-js.mjs (npm run build:js). GitHub Pages serves what is
// committed, so this output is committed too; npm run verify:build fails if it
// drifts from its source.
//
// The IIFE is load-bearing. index.html loads this as a classic <script>, so
// every top-level binding would otherwise share ONE global lexical scope with
// repo-data.jsx and the sibling compiled file — where a duplicate name is a
// page-blanking SyntaxError, not a warning (repo-data.jsx's header documents
// the collision that was already dodged by hand). Wrapping makes the window
// assignments at the end of ${sourceName} the file's entire contract.
`;
}

async function compileJsx(sourceName) {
  const source = await readFile(path.join(REPO_ROOT, sourceName), "utf8");
  const { code } = await transform(source, {
    loader: "jsx",
    target: TARGET,
    logLevel: "silent",
  });
  return Buffer.from(`${generatedBanner(sourceName)}(() => {\n${code}})();\n`, "utf8");
}

async function readInstalledVersion(pkg) {
  const manifest = path.join(REPO_ROOT, "node_modules", pkg, "package.json");
  try {
    return JSON.parse(await readFile(manifest, "utf8")).version;
  } catch {
    throw new Error(`${pkg} is not installed — run npm install (looked for ${rel(manifest)})`);
  }
}

// Copy the pinned UMD build out of node_modules as raw bytes. The version is
// asserted against package.json rather than trusted: a vendored file that no
// longer matches what `npm ci` installs for everyone else is exactly the drift
// this script exists to make impossible.
async function readVendorBytes({ pkg, from }, pinnedVersion) {
  const installed = await readInstalledVersion(pkg);
  if (installed !== pinnedVersion) {
    throw new Error(
      `${pkg}@${installed} is installed but package.json pins ${pinnedVersion} — run npm install`,
    );
  }
  const file = path.join(REPO_ROOT, "node_modules", pkg, ...from.split("/"));
  try {
    return await readFile(file);
  } catch {
    throw new Error(
      `${pkg}@${installed} does not ship ${from}. React stopped publishing UMD builds after ` +
        `18.x, so if that pin ever moves forward index.html needs another way to get the ` +
        `globals — a browser build is not optional here, it is what defines React/ReactDOM.`,
    );
  }
}

// Everything this build produces, as {outPath, origin, content} — built the
// same way for both modes, so --check can never disagree with what a write
// would have put on disk.
async function buildArtifacts() {
  const manifest = JSON.parse(await readFile(path.join(REPO_ROOT, "package.json"), "utf8"));
  const pins = manifest.devDependencies ?? {};
  const artifacts = [];

  for (const sourceName of JSX_SOURCES) {
    artifacts.push({
      outPath: path.join(DIST_DIR, sourceName.replace(/\.jsx$/, ".js")),
      origin: sourceName,
      content: await compileJsx(sourceName),
    });
  }

  for (const entry of VENDOR_FILES) {
    const pinned = pins[entry.pkg];
    if (!pinned) {
      throw new Error(`package.json pins no "${entry.pkg}" devDependency — index.html needs it vendored`);
    }
    artifacts.push({
      outPath: path.join(VENDOR_DIR, path.basename(entry.from)),
      origin: `${entry.pkg}@${pinned}/${entry.from}`,
      content: await readVendorBytes(entry, pinned),
    });
  }

  return artifacts;
}

// Committed output that nothing generates any more. Renaming or dropping a
// source leaves its old .js behind, and because Pages serves whatever is in the
// repo, that file keeps being served — the stale-output failure this whole
// script guards against, arriving from the other direction.
async function findOrphans(artifacts) {
  const expected = new Set(artifacts.map((artifact) => artifact.outPath));
  const orphans = [];
  for (const dir of [DIST_DIR, VENDOR_DIR]) {
    let entries;
    try {
      entries = await readdir(dir);
    } catch {
      continue; // Never built here yet — the missing-file check below covers it.
    }
    for (const entry of entries) {
      const full = path.join(dir, entry);
      if (entry.endsWith(".js") && !expected.has(full)) orphans.push(rel(full));
    }
  }
  return orphans;
}

async function writeArtifacts(artifacts) {
  await mkdir(DIST_DIR, { recursive: true });
  await mkdir(VENDOR_DIR, { recursive: true });
  for (const artifact of artifacts) {
    await writeFile(artifact.outPath, artifact.content);
    console.log(
      `  wrote ${rel(artifact.outPath).padEnd(38)} <- ${artifact.origin} (${artifact.content.length}B)`,
    );
  }
  // Reported, never deleted: removing files the user did not ask about is not
  // a build script's call to make.
  for (const orphan of await findOrphans(artifacts)) {
    console.warn(`  NOTE: ${orphan} is generated by nothing any more — delete it.`);
  }
  console.log(`\nBuilt ${artifacts.length} file(s). Commit them — Pages serves this repo as-is.`);
}

async function checkArtifacts(artifacts) {
  const problems = [];
  let current = 0;

  for (const artifact of artifacts) {
    let committed;
    try {
      committed = await readFile(artifact.outPath);
    } catch {
      problems.push(`${rel(artifact.outPath)} is missing — run npm run build:js`);
      continue;
    }

    if (committed.equals(artifact.content)) {
      console.log(`  OK   ${rel(artifact.outPath)}`);
      current += 1;
      continue;
    }

    // A pure line-ending difference means the checkout rewrote the file, not
    // that anyone edited a source. .gitattributes pins these paths to LF so it
    // cannot happen — say which one it is rather than sending the reader into
    // a diff of visually identical text.
    const normalize = (buf) => buf.toString("utf8").replace(/\r\n/g, "\n");
    problems.push(
      normalize(committed) === normalize(artifact.content)
        ? `${rel(artifact.outPath)} differs only in line endings — check core.autocrlf against .gitattributes`
        : `${rel(artifact.outPath)} is stale against ${artifact.origin} — run npm run build:js and commit the result`,
    );
  }

  for (const orphan of await findOrphans(artifacts)) {
    problems.push(`${orphan} is generated by nothing any more — delete it`);
  }

  console.log(`\n${current}/${artifacts.length} generated file(s) current.`);
  if (problems.length > 0) {
    console.error("Generated output does not match its sources:");
    for (const message of problems) console.error(`- ${message}`);
    process.exit(1);
  }
}

async function main() {
  const isCheck = process.argv.slice(2).includes("--check");
  const artifacts = await buildArtifacts();
  if (isCheck) await checkArtifacts(artifacts);
  else await writeArtifacts(artifacts);
}

main().catch((err) => {
  console.error("build-js failed:", err.message);
  process.exit(1);
});
