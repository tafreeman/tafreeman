> Moved here from the workspace-root `CLAUDE.md` §6 on 2026-07-28 so it loads only
> when working in this repo. Cross-repo coupling and `_audit/` conventions stay in the
> workspace-root file.

# tafreeman (the profile hub)

**No repo-local agent config beyond this file** (a local `.claude/` exists but is gitignored and holds only a launch.json). The nearest tracked guidance is `DESIGN-SYSTEM.md`; the build/CI/drift rules below live only in code comments.

The GitHub profile README plus the portfolio landing page: a build-step-free static site GitHub Pages serves exactly as checked in. Its entire "framework" is five classic `<script>` tags loading **committed, precompiled JSX** and self-hosted React globals. The CI gates exist to stop that committed output — and the hand-typed portfolio metadata — from drifting.

```bash
npm ci
npm run build:js          # REQUIRED after editing profile.jsx / tweaks-panel.jsx — commit dist/
npm run validate          # verify:build && validate:jsx && validate:repos && validate:html (CI order)
npx playwright install chromium
npm test -- --grep-invert @network      # the required suite
npm test -- --grep @network             # advisory only
npx playwright test tests/keyboard.spec.ts       # single spec file
npx playwright test --grep "hub renders"         # single test by name
npm run cards             # regenerate social PNGs — needs the gitignored export.html; not in CI
```

**Architecture:** the page composes by **load order over the global object**, not an import graph. `index.html` loads vendor React UMD → `console-ds/_ds_bundle.js` → `dist/tweaks-panel.js` → `repo-data.jsx` (sets `window.PORTFOLIO`) → `dist/profile.js` (sets `window.ProfilePage`) → an inline bootstrap written with `React.createElement` precisely so no JSX compiler is needed on the page. `build-js.mjs` wraps each compiled file in an IIFE because classic scripts share one global lexical scope where a duplicate top-level name is a page-blanking SyntaxError. `repo-data.jsx` is the single source of truth for portfolio content, read by five consumers (profile.jsx, social-cards.jsx, the README table, the validator, all three specs — the specs `vm`-eval it the same way the validator does, so adding a project updates the tests automatically). `scripts/validate-repo-data.mjs` is a live-state consistency engine, not a schema check: exact expected ids, `repo.repo === GH + '/' + id`, derived LANGS percentages, bidirectional parity with social-cards.jsx and with the README table (matched on the repo URL in the Links cell, descriptions compared byte-for-byte), a raw-source scan of profile.jsx for stale repo references, and live api.github.com assertions. `tests/no-cdn.spec.ts` pins the *architecture*: it aborts all off-origin requests and asserts zero aborted requests had `resourceType 'script'`.

**Gotchas:**

- Editing `profile.jsx`/`tweaks-panel.jsx` without `npm run build:js` changes nothing on the live site **and fails CI** — `dist/*.js` is what `index.html` loads and it is committed.
- Line-endings trap: `.gitattributes` pins `dist/*.js` and `vendor/*.js` to `eol=lf`. When `--check` reports "differs only in line endings — check core.autocrlf", fix autocrlf; do **not** rebuild and commit.
- React is frozen at 18.3.1 structurally: `build-js.mjs` copies the UMD builds out of node_modules and React stopped publishing UMD after 18.x. A bump throws "does not ship umd/react.production.min.js"; the script also hard-asserts installed == pinned.
- `LANGS` percentages are derived (`round(count/total*100)`, must sum to 100) — adding or removing a repo forces a LANGS edit in the same commit.
- A repo `status` matching `/^v\d/` is diffed against that repo's **latest GitHub release tag** over the network. Lifecycle labels (ACTIVE, BETA) are exempt. The same check fails if any listed repo goes private or archived.
- `validate:repos` requires network to api.github.com with **no offline mode**; `GITHUB_TOKEN`/`GH_TOKEN` are optional (rate limits).
- Playwright needs Python 3 on PATH and a free port 8099. `reuseExistingServer: false` is deliberate — a stray `python -m http.server` from another worktree once outlived a session and served a different tree, producing a green run against files it never loaded. Kill the stray server; do not enable reuse.
- `.nojekyll` is a tracked zero-byte file nothing else references. Deleting it blanks the published site (Jekyll drops the underscore-prefixed `_ds_bundle.js`; profile.jsx's top-level destructure throws; `#root` stays empty) while local tests and the link check stay green. One test guards it.
- The third-party-host allowlist is an **equality** to `['fonts.googleapis.com']` — self-hosting the fonts will also fail the test until the assertion is updated.
- `repo-data.jsx` must stay JSX-free and export via `window.PORTFOLIO`: it ships to browsers as raw source and shares one global lexical scope with the inline block.
- `index.html` has a machine-edited region `window.TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{…}/*EDITMODE-END*/;` rewritten on disk by the Tweaks panel's postMessage protocol — keep it inline and in that exact shape.
- The Playwright link test is advisory, but the lychee "Check links" step blocks (`fail: true`) over `README.md '*.html' '*.jsx'` — a dead link in a `.jsx` source fails CI.
- The smoke suite asserts no rendered text says "Private repo" (`tests/smoke.spec.ts:93`). The two hardcoded repo-id guards (`architecture-deck-system`, `qa-automation-academy`) were removed in PR #45 as redundant and fragile — visibility and archived state are now enforced for every repo in `PORTFOLIO.REPOS` by `scripts/validate-repo-data.mjs` against the live API, not by the smoke suite.
- `npm run validate:html` globs `*.html` at the repo root, so locally it also validates untracked files (`export.html`, the "GitHub ID Images" surfaces) that CI never sees.
