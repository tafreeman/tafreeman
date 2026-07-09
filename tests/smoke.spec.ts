/**
 * Smoke tests for the tafreeman portfolio static site.
 *
 * PRE-REQUISITES (orchestrator must run these before the first execution):
 *   npm install
 *   npx playwright install chromium
 *     -- OR --
 *   npm exec playwright install chromium
 *
 * The Python static server is started automatically by playwright.config.ts
 * (python -m http.server 8099). Python 3 must be on PATH.
 *
 * External-link checks in "outbound links respond" require network access.
 * That test is tagged @network. To skip it offline:
 *   npx playwright test --grep-invert @network
 * (or run only the DOM tests: npx playwright test --grep "hub renders")
 */

import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { test, expect, request as playwrightRequest } from '@playwright/test';

// Loads repo-data.jsx the same way scripts/validate-repo-data.mjs does — the
// single source of truth for portfolio systems — so the expected system set
// below is always derived from real data, never a hand-maintained literal
// (list or count) that can silently drift from what profile.jsx renders.
async function loadPortfolioRepos(): Promise<Array<{ id: string; title: string; url: string | null }>> {
  const source = await readFile('repo-data.jsx', 'utf8');
  const sandbox = { window: {} as any };
  vm.createContext(sandbox);
  vm.runInContext(source, sandbox, { filename: 'repo-data.jsx' });
  return sandbox.window.PORTFOLIO.REPOS;
}

// ---------------------------------------------------------------------------
// Test 1 — DOM / render smoke test
// ---------------------------------------------------------------------------
test('hub renders', async ({ page }) => {
  // Navigate to the canonical page.  baseURL is http://127.0.0.1:8099
  // so '/' resolves to index.html served by the Python static server.
  await page.goto('/');

  // @babel/standalone compiles the JSX in-browser; give it generous time.
  // We wait until #root has at least one child element rather than using a
  // fixed sleep or networkidle (CDN scripts may still be in-flight).
  const root = page.locator('#root');
  await expect(root).not.toBeEmpty({ timeout: 45_000 });

  // Verify recognisable profile content is visible. "tafreeman" appears in
  // the Console hero eyebrow ("@TAFREEMAN", matched case-insensitively) and
  // "Andy Freeman" in the footer line — both are baked into profile.jsx.
  await expect(
    page.getByText('tafreeman', { exact: false }).first()
  ).toBeVisible({ timeout: 45_000 });

  await expect(
    page.getByText('Andy Freeman', { exact: false }).first()
  ).toBeVisible({ timeout: 45_000 });
});

// ---------------------------------------------------------------------------
// Test 2 — every portfolio system renders, on the correct composition axis
// ---------------------------------------------------------------------------
// Guards the "two-axis front door" (README #25/#26, T2-B): the Systems
// section must render every repo-data.jsx system (whatever the set happens
// to be — no hardcoded count) AND must visibly split them into the runtime
// and verification axes described in README, not just mention the split in
// prose. Both assertions are derived from the live source of truth so this
// test does not need updating (and cannot silently go stale) when a system
// is added, removed, or renamed.
test('hub renders every system and both composition axes', async ({ page }) => {
  const repos = await loadPortfolioRepos();
  expect(repos.length).toBeGreaterThan(0);

  // Owner decision (2026-07-09): architecture-deck-system is dropped from the
  // portfolio entirely (private repo — its links would 404), not shown as a
  // private/unlinked entry the way qa-automation-academy is. This guard
  // fails if it is ever re-added to repo-data.jsx without a new decision.
  const ids = repos.map((r) => r.id);
  expect(ids, 'architecture-deck-system must stay dropped from the portfolio').not.toContain(
    'architecture-deck-system'
  );

  await page.goto('/');
  const root = page.locator('#root');
  await expect(root).not.toBeEmpty({ timeout: 45_000 });

  for (const repo of repos) {
    await expect(
      page.getByText(repo.title, { exact: false }).first(),
      `expected system "${repo.title}" (${repo.id}) from repo-data.jsx to render on the hub`
    ).toBeVisible({ timeout: 45_000 });
  }

  // The runtime/verification split has to be visible in the DOM, not just
  // documented in README — these are the axis labels SystemsIndex renders
  // in profile.jsx.
  await expect(
    page.getByText('Runtime axis', { exact: false }).first()
  ).toBeVisible({ timeout: 45_000 });
  await expect(
    page.getByText('Verification axis', { exact: false }).first()
  ).toBeVisible({ timeout: 45_000 });
});

// ---------------------------------------------------------------------------
// Test 3 — outbound link health checks (requires network access)
// ---------------------------------------------------------------------------
test('outbound links respond', { tag: '@network' }, async () => {
  // Every public repo's primary URL, derived from repo-data.jsx rather than
  // a hand-maintained list — a repo add/remove/URL change is caught here
  // automatically instead of silently going stale. Private repos (currently
  // qa-automation-academy) carry url: null and are filtered out.
  const repos = await loadPortfolioRepos();
  const outboundUrls = repos
    .map((r) => r.url)
    .filter((url): url is string => typeof url === 'string' && url.length > 0);
  expect(outboundUrls.length).toBeGreaterThan(0);

  // Use a fresh APIRequestContext so these checks run independently of the
  // browser page and do not affect the DOM test above.
  const apiContext = await playwrightRequest.newContext({
    // Follow redirects; the default Playwright client does so automatically.
  });

  try {
    const results = await Promise.all(
      outboundUrls.map(async (url) => {
        try {
          let response = await apiContext.head(url, {
            timeout: 15_000,
            failOnStatusCode: false,
          });
          if (response.status() === 405) {
            response = await apiContext.get(url, {
              timeout: 15_000,
              failOnStatusCode: false,
            });
          }
          return { url, status: response.status(), error: null };
        } catch (err: any) {
          return { url, status: null, error: err.message || String(err) };
        }
      })
    );

    for (const res of results) {
      if (res.error) {
        expect(res.error, `Expected ${res.url} to respond, but got error: ${res.error}`).toBeNull();
      } else {
        expect(
          res.status,
          `Expected ${res.url} to return status < 400, got ${res.status}`
        ).toBeLessThan(400);
      }
    }
  } finally {
    await apiContext.dispose();
  }
});
