/**
 * Smoke tests for the tafreeman portfolio static site.
 *
 * PRE-REQUISITES (orchestrator must run these before the first execution):
 *   npm install
 *   npm run build:js          # index.html loads dist/ + vendor/, not a CDN
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

  // We wait until #root has at least one child element rather than using a
  // fixed sleep or networkidle. The scripts are precompiled and same-origin
  // now, so this resolves in one round trip — the generous timeout is kept
  // only so a loaded CI runner cannot turn slowness into a false failure.
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
// Test 2 — every selected public project renders and private work stays absent
// ---------------------------------------------------------------------------
// The displayed project set comes from repo-data.jsx, while explicit guards
// prevent previously listed private repositories from returning unnoticed.
test('hub renders every selected public project', async ({ page }) => {
  const repos = await loadPortfolioRepos();
  expect(repos.length).toBeGreaterThan(0);

  const ids = repos.map((r) => r.id);
  expect(ids).not.toContain('architecture-deck-system');
  expect(ids).not.toContain('qa-automation-academy');
  expect(repos.every((repo) => typeof repo.url === 'string' && repo.url.length > 0)).toBe(true);

  await page.goto('/');
  const root = page.locator('#root');
  await expect(root).not.toBeEmpty({ timeout: 45_000 });

  for (const repo of repos) {
    await expect(
      page.getByText(repo.title, { exact: false }).first(),
      `expected public project "${repo.title}" (${repo.id}) from repo-data.jsx to render on the hub`
    ).toBeVisible({ timeout: 45_000 });
  }

  await expect(page.getByText('Selected public work', { exact: true })).toBeVisible();
  await expect(page.getByText('Private repo', { exact: false })).toHaveCount(0);
});

// ---------------------------------------------------------------------------
// Test 3 — outbound link health checks (requires network access)
// ---------------------------------------------------------------------------
test('outbound links respond', { tag: '@network' }, async () => {
  // Every public repo's primary URL, derived from repo-data.jsx rather than
  // a hand-maintained list — a repo add/remove/URL change is caught here
  // automatically instead of silently going stale.
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
