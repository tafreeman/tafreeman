/**
 * The hub must render with every third-party host blocked.
 *
 * index.html used to fetch react, react-dom and @babel/standalone from unpkg
 * and compile profile.jsx in the browser on every load. With unpkg unreachable
 * — an outage, a corporate proxy, a blocking extension, a strict CSP — React
 * never arrived, nothing compiled the JSX, and the visitor got a permanently
 * blank #root with no error they would ever see. Both tests below fail against
 * that arrangement by construction, and are the reason the page's scripts are
 * precompiled into dist/ and served from vendor/.
 *
 * PRE-REQUISITES (same as smoke.spec.ts) plus current build output:
 *   npm install
 *   npm run build:js
 *   npx playwright install chromium
 *
 * The Python static server is started automatically by playwright.config.ts.
 */

import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { test, expect, type Page } from '@playwright/test';

// Hosts the local static server answers on. Anything else is a third party by
// definition and gets aborted.
const LOCAL_HOSTS = new Set(['127.0.0.1', 'localhost', '[::1]', '::1']);

// Same single source of truth the rest of the suite reads, so a project added
// to repo-data.jsx is covered here too instead of leaving a hand-typed list.
async function loadProjectTitles(): Promise<string[]> {
  const source = await readFile('repo-data.jsx', 'utf8');
  const sandbox = { window: {} as any };
  vm.createContext(sandbox);
  vm.runInContext(source, sandbox, { filename: 'repo-data.jsx' });
  return sandbox.window.PORTFOLIO.REPOS.map((r: { title: string }) => r.title);
}

// Abort every request that leaves the origin, recording what was attempted so
// a test can assert on it. The resource TYPE is recorded alongside the host,
// because the property that matters is "no off-origin script", not "not this
// one CDN" — naming a host would let a swap to jsdelivr or esm.sh walk past.
// Non-http schemes (data: favicon, blob:) are left alone — they never touch a
// network.
async function blockThirdPartyHosts(page: Page): Promise<Attempt[]> {
  const attempted: Attempt[] = [];
  await page.route('**/*', async (route) => {
    const url = new URL(route.request().url());
    const isNetwork = url.protocol === 'http:' || url.protocol === 'https:';
    if (!isNetwork || LOCAL_HOSTS.has(url.hostname)) {
      await route.continue();
      return;
    }
    attempted.push({ host: url.hostname, type: route.request().resourceType() });
    await route.abort();
  });
  return attempted;
}

interface Attempt {
  host: string;
  type: string;
}

// ---------------------------------------------------------------------------
// Test 1 — the page renders with nothing off-origin available
// ---------------------------------------------------------------------------
test('the hub renders with every third-party host blocked', async ({ page }) => {
  const attempted = await blockThirdPartyHosts(page);
  const titles = await loadProjectTitles();
  expect(titles.length).toBeGreaterThan(0);

  await page.goto('/');

  // No CDN and no in-browser compile step, so this is one round trip to the
  // static server — nothing like the 45s the Babel-era tests had to allow.
  await expect(page.locator('#root')).not.toBeEmpty({ timeout: 15_000 });

  // The same content the smoke test pins down: hero eyebrow, footer line,
  // section heading, and every project from repo-data.jsx.
  await expect(page.getByText('tafreeman', { exact: false }).first()).toBeVisible();
  await expect(page.getByText('Andy Freeman', { exact: false }).first()).toBeVisible();
  await expect(page.getByText('Selected public work', { exact: true })).toBeVisible();
  for (const title of titles) {
    await expect(
      page.getByText(title, { exact: false }).first(),
      `expected "${title}" to render with third-party hosts blocked`
    ).toBeVisible();
  }

  // No off-origin SCRIPT may even be attempted — asserted on resource type, not
  // on a host name, so swapping unpkg for jsdelivr or esm.sh cannot slip past.
  expect(
    attempted.filter(a => a.type === 'script'),
    'index.html must not request any JavaScript from a third-party host'
  ).toEqual([]);

  // The webfont stylesheet still goes off-origin (tokens.css and
  // console-ds/tokens/fonts.css @import Google Fonts). That degrades to a
  // fallback face, which is exactly why the content assertions above hold with
  // it blocked — a script would not degrade. Pinned as an equality so a NEW
  // third-party dependency of any kind has to be acknowledged here rather than
  // arriving unnoticed.
  expect(
    [...new Set(attempted.map(a => a.host))].sort(),
    'the only third-party host on this page should be the webfont stylesheet'
  ).toEqual(['fonts.googleapis.com']);
});

// ---------------------------------------------------------------------------
// Test 2 — the tags themselves, so a regression is caught before a render is
// ---------------------------------------------------------------------------
// Test 1 would also pass if someone re-added the CDN tags behind a working
// local fallback. This pins the arrangement itself: no remote script, no
// in-browser compiler, and the same-origin replacements actually referenced —
// so it cannot be satisfied by deleting the script tags outright either.
test('index.html loads no CDN script and no in-browser compiler', async () => {
  const html = await readFile('index.html', 'utf8');

  expect(html, 'index.html must not reference unpkg at all').not.toContain('unpkg');
  expect(
    html,
    'index.html must not defer compilation to @babel/standalone'
  ).not.toContain('text/babel');

  expect(html).toContain('vendor/react.production.min.js');
  expect(html).toContain('vendor/react-dom.production.min.js');
  expect(html).toContain('dist/tweaks-panel.js');
  expect(html).toContain('dist/profile.js');
});
