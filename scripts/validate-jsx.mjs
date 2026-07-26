// Validate that every .jsx / .js source file parses (catches syntax errors).
// index.html's own scripts are precompiled now (scripts/build-js.mjs), so a
// syntax error in those fails the build first. But repo-data.jsx still ships to
// browsers as raw source, and the local design/export tooling (social-cards,
// banner, glyphs, design-canvas + their .html hosts) is still compiled
// in-browser by Babel with no build step at all — for those this remains the
// only automated guard against shipping a broken script.
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { transform } from "esbuild";

// dist/ and vendor/ hold generated output, not sources. dist/ is this repo's
// own JSX after the esbuild transform — its input is parsed here already — and
// vendor/ is minified third-party React, which has no business being fed to a
// JSX parser. `npm run verify:build` proves both still match what produced
// them, which is a stronger guarantee than re-parsing them here would be.
const SKIP_DIRS = new Set(["node_modules", ".git", ".github", "dist", "vendor"]);

function collect(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (!SKIP_DIRS.has(entry)) out.push(...collect(full));
    } else if (/\.(jsx|js|mjs)$/.test(entry) && !full.includes("validate-jsx")) {
      out.push(full);
    }
  }
  return out;
}

const files = collect(".");
let failed = 0;

for (const file of files) {
  const source = (await import("node:fs/promises")).readFile;
  const code = await source(file, "utf8");
  try {
    await transform(code, { loader: "jsx", logLevel: "silent" });
    console.log(`OK   ${file}`);
  } catch (err) {
    failed += 1;
    console.error(`FAIL ${file}`);
    for (const e of err.errors ?? [{ text: err.message }]) {
      const loc = e.location ? `:${e.location.line}:${e.location.column}` : "";
      console.error(`     ${file}${loc} ${e.text}`);
    }
  }
}

console.log(`\n${files.length - failed}/${files.length} files parsed cleanly.`);
if (failed) process.exit(1);
