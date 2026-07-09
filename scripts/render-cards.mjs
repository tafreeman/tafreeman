// Regenerate the GitHub social-preview cards in social-previews/ from the live
// card design (social-cards.jsx + cards.css) via the repo's own export.html
// render path — the single source of truth for these hand-rendered PNGs.
//
//   npm run cards                 # regenerate every card in window.REPOS
//   npm run cards -- executionkit tafreeman   # only these ids
//
// WHY THIS EXISTS: the cards are screenshots, so they silently drift from the
// design whenever cards.css / social-cards.jsx change. They sat stale as
// ember-era renders after the Console migration (#23) until 2026-07-09; this
// script keeps them reproducible so that can't recur unnoticed.
//
// PIPELINE (matches how agentic-evalkit.png was made):
//   1. serve the repo statically (python http.server — same as the Playwright
//      smoke tests), so @babel/standalone can XHR the .jsx sources,
//   2. load export.html, inject the same IBM Plex Mono webfont the live site
//      uses, and call window.renderCard(idx, 1) — scale 1 => native 1280x640,
//   3. screenshot the 1280x640 .sc-card element at deviceScaleFactor 1,
//   4. optionally flatten+optimize with Pillow (Image.convert('RGB').save(
//      optimize=True)) for smaller files; the raw Chromium PNG is ALREADY
//      1280x640 8-bit color_type-2 (RGB), so Pillow is optional — without it
//      the raw screenshot is kept and is still format-correct.
//
// REQUIREMENTS: Python 3 on PATH (static server). Pillow optional (optimize +
// pixel self-check). Playwright chromium (already a devDependency).

import { createRequire } from "node:module";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { mkdtemp, rm, copyFile, writeFile, stat } from "node:fs/promises";
import { openSync, readSync, closeSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(SCRIPT_DIR, "..");
const OUT_DIR = path.join(REPO_ROOT, "social-previews");
const PORT = Number(process.env.CARDS_PORT || 8137);
const FONT_URL =
  "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&display=swap";
// Console horizon-cyan (present) vs retired ember-clay (must be gone).
const CYAN = [51, 177, 255];
const CLAY = [217, 119, 87];

const requestedIds = process.argv.slice(2).filter((a) => !a.startsWith("-"));

function pngHeader(file) {
  const fd = openSync(file, "r");
  try {
    const buf = Buffer.alloc(33);
    readSync(fd, buf, 0, 33, 0);
    const isPng = buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
    if (!isPng || buf.subarray(12, 16).toString("latin1") !== "IHDR") return null;
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20), bitDepth: buf[24], colorType: buf[25] };
  } finally {
    closeSync(fd);
  }
}

function run(cmd, args, opts = {}) {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, { ...opts });
    let stdout = "";
    let stderr = "";
    child.stdout?.on("data", (d) => (stdout += d));
    child.stderr?.on("data", (d) => (stderr += d));
    child.on("error", (err) => resolve({ code: -1, stdout, stderr: String(err) }));
    child.on("close", (code) => resolve({ code, stdout, stderr }));
  });
}

async function waitForServer(url, timeoutMs = 15000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url);
      if (res.ok) return true;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  return false;
}

// Pillow helper: flatten raw -> optimized RGB PNG at OUT, then report size and
// accent-pixel counts as JSON. Written to a temp file so we avoid python -c
// quoting pitfalls across shells.
const PY_HELPER = `
import sys, json
from PIL import Image
raw, out = sys.argv[1], sys.argv[2]
im = Image.open(raw).convert("RGB")
im.save(out, format="PNG", optimize=True)
px = list(im.getdata())[::37]
def near(t, tol=45):
    return sum(1 for p in px if abs(p[0]-t[0])<tol and abs(p[1]-t[1])<tol and abs(p[2]-t[2])<tol)
print(json.dumps({"w": im.size[0], "h": im.size[1],
                  "cyan": near((51,177,255)), "clay": near((217,119,87))}))
`;

async function main() {
  const server = spawn("python", ["-m", "http.server", String(PORT)], {
    cwd: REPO_ROOT,
    stdio: "ignore",
  });
  const cleanup = () => { try { server.kill(); } catch { /* already gone */ } };
  process.on("exit", cleanup);

  const tmp = await mkdtemp(path.join(tmpdir(), "tafreeman-cards-"));
  const pyHelper = path.join(tmp, "optimize_card.py");
  await writeFile(pyHelper, PY_HELPER, "utf8");

  let browser;
  const results = [];
  try {
    if (!(await waitForServer(`http://127.0.0.1:${PORT}/export.html`))) {
      throw new Error(`static server never came up on :${PORT} (is Python 3 on PATH?)`);
    }

    browser = await chromium.launch();
    const page = await browser.newPage({
      viewport: { width: 1280, height: 640 },
      deviceScaleFactor: 1, // 1:1 pixels — no retina 2x
    });
    const pageErrors = [];
    page.on("pageerror", (e) => pageErrors.push(String(e.message)));
    page.on("console", (m) => { if (m.type() === "error") pageErrors.push(m.text()); });

    await page.goto(`http://127.0.0.1:${PORT}/export.html`, { waitUntil: "load", timeout: 30000 });
    await page.waitForFunction(
      () => typeof window.renderCard === "function" && Array.isArray(window.REPOS) && window.REPOS.length > 0,
      { timeout: 30000 },
    );
    await page.addStyleTag({ url: FONT_URL }).catch(() => {});
    await page.evaluate(async () => { if (document.fonts?.ready) await document.fonts.ready; });

    const allIds = await page.evaluate(() => window.REPOS.map((r) => r.id));
    const ids = requestedIds.length ? requestedIds : allIds;
    const unknown = ids.filter((id) => !allIds.includes(id));
    if (unknown.length) throw new Error(`unknown card id(s): ${unknown.join(", ")} (known: ${allIds.join(", ")})`);

    let pillowMissingWarned = false;
    for (const id of ids) {
      const idx = allIds.indexOf(id);
      await page.evaluate((i) => window.renderCard(i, 1), idx);
      // Wait for THIS card to be the one on screen (SocialCard sets
      // data-screen-label = r.name = the id), then let the webfont paint.
      await page.waitForFunction(
        (want) => document.querySelector(".sc-card")?.getAttribute("data-screen-label") === want,
        id,
        { timeout: 15000 },
      );
      await page.waitForTimeout(350);

      const raw = path.join(tmp, `${id}.raw.png`);
      await page.locator(".sc-card").first().screenshot({ path: raw });

      const out = path.join(OUT_DIR, `${id}.png`);
      let cyan = null;
      let clay = null;
      const pil = await run("python", [pyHelper, raw, out]);
      if (pil.code === 0 && pil.stdout.trim()) {
        try {
          const m = JSON.parse(pil.stdout.trim());
          cyan = m.cyan;
          clay = m.clay;
        } catch { /* fall through to header-only verify */ }
      } else {
        if (!pillowMissingWarned) {
          console.warn("  NOTE: Pillow optimize unavailable — keeping raw Chromium PNG (already color_type 2). ", (pil.stderr || "").split("\n")[0]);
          pillowMissingWarned = true;
        }
        await copyFile(raw, out);
      }

      const hdr = pngHeader(out);
      const bytes = (await stat(out)).size;
      const okDims = hdr && hdr.width === 1280 && hdr.height === 640 && hdr.colorType === 2;
      const okCyan = cyan === null ? null : cyan > 0;
      const okClay = clay === null ? null : clay < cyan; // accent should now be cyan, not clay
      results.push({ id, hdr, bytes, cyan, clay, okDims, okCyan, okClay });
      const badge = okDims && okCyan !== false ? "OK " : "FAIL";
      console.log(
        `  ${badge} ${id.padEnd(28)} ${hdr ? hdr.width + "x" + hdr.height : "??"} ` +
          `ctype=${hdr?.colorType} ${String(bytes).padStart(7)}B ` +
          (cyan === null ? "(no pixel check — Pillow absent)" : `cyan=${cyan} clay=${clay}`),
      );
    }

    if (pageErrors.length) console.warn("  page errors:", pageErrors.slice(0, 5));
  } finally {
    if (browser) await browser.close();
    cleanup();
    await rm(tmp, { recursive: true, force: true }).catch(() => {});
  }

  const failed = results.filter((r) => !r.okDims || r.okCyan === false);
  console.log(`\nRendered ${results.length} card(s); ${failed.length} failed.`);
  if (failed.length) {
    for (const f of failed) console.error(`  FAILED: ${f.id} (${JSON.stringify({ okDims: f.okDims, cyan: f.cyan, clay: f.clay })})`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("render-cards failed:", err.message);
  process.exit(1);
});
