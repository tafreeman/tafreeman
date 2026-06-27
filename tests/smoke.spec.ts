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
 * (or run only the DOM test: npx playwright test --grep "hub renders")
 */

import { test, expect, request as playwrightRequest } from '@playwright/test';

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

  // Verify recognisable profile content is visible.  "tafreeman" appears in
  // the top-bar search label and "Andy Freeman" in the profile sidebar — both
  // are baked into profile.jsx's static REPOS/component data.
  await expect(
    page.getByText('tafreeman', { exact: false }).first()
  ).toBeVisible({ timeout: 45_000 });

  await expect(
    page.getByText('Andy Freeman', { exact: false }).first()
  ).toBeVisible({ timeout: 45_000 });
});

// ---------------------------------------------------------------------------
// Test 2 — outbound link health checks (requires network access)
// ---------------------------------------------------------------------------
test('outbound links respond', { tag: '@network' }, async () => {
  // Four verified outbound URLs from profile.jsx.
  // qa-automation-academy is private (no public Pages or repo URL), so it is
  // intentionally absent until its public release.
  const outboundUrls: string[] = [
    'https://tafreeman.github.io/agentic-runtime-platform/',
    'https://tafreeman.github.io/executionkit/',
    'https://tafreeman.github.io/financial-scenario-engine/',
    'https://tafreeman.github.io/architecture-deck-system/',
  ];

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
