// Validate that every .jsx / .js source file parses (catches syntax errors).
// These files are loaded in-browser via Babel (no build step), so this is the
// only automated guard against shipping a broken script.
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { transform } from "esbuild";

const SKIP_DIRS = new Set(["node_modules", ".git", ".github"]);

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
