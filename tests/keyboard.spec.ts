/**
 * Keyboard-operability tests for the "Selected public work" card grid.
 *
 * The cards used to be plain <div>s carrying only onClick, so the grid was
 * mouse-only. Each card now renders a native <button type="button"> stretched
 * over the tile, which is what these tests pin down: the card is reachable with
 * Tab, shows a visible focus ring, and is activated by both Enter and Space.
 *
 * PRE-REQUISITES (same as smoke.spec.ts):
 *   npm install
 *   npx playwright install chromium
 *
 * The Python static server is started automatically by playwright.config.ts.
 * Run just this file with:
 *   npx playwright test tests/keyboard.spec.ts
 */

import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { test, expect, type Page } from '@playwright/test';

// EM DASH used by profile.jsx's data-screen-label, escaped so the expectation
// cannot drift on a file-encoding change.
const EM_DASH = '—';

// The card titles come from repo-data.jsx — the single source of truth the rest
// of the suite reads — so adding or renaming a project updates these tests
// automatically instead of leaving a hand-maintained list to go stale.
async function loadProjectTitles(): Promise<string[]> {
  const source = await readFile('repo-data.jsx', 'utf8');
  const sandbox = { window: {} as any };
  vm.createContext(sandbox);
  vm.runInContext(source, sandbox, { filename: 'repo-data.jsx' });
  return sandbox.window.PORTFOLIO.REPOS.map((r: { title: string }) => r.title);
}

// @babel/standalone compiles the JSX in-browser, so wait for real content
// rather than a fixed sleep — same approach as smoke.spec.ts.
async function gotoHub(page: Page): Promise<void> {
  await page.goto('/');
  await expect(page.locator('#root')).not.toBeEmpty({ timeout: 45_000 });
  await expect(
    page.getByText('Selected public work', { exact: true })
  ).toBeVisible({ timeout: 45_000 });
}

// ---------------------------------------------------------------------------
// Test 1 — the card is a real interactive element, not a div with a role
// ---------------------------------------------------------------------------
test('every project card is a native button named after its project', async ({ page }) => {
  const titles = await loadProjectTitles();
  expect(titles.length).toBeGreaterThan(0);

  await gotoHub(page);

  for (const title of titles) {
    const card = page.getByRole('button', { name: title, exact: true });
    await expect(card, `expected one card button named "${title}"`).toHaveCount(1);
    // A native <button> — not a <div role="button">, which would need the whole
    // tabIndex/onKeyDown retrofit to behave.
    await expect(card).toHaveJSProperty('tagName', 'BUTTON');
    // type=button keeps it inert if the grid is ever placed inside a form.
    await expect(card).toHaveAttribute('type', 'button');
  }
});

// ---------------------------------------------------------------------------
// Test 2 — Tab reaches every card, and each shows a visible focus ring
// ---------------------------------------------------------------------------
test('Tab reaches every project card and shows a visible focus ring', async ({ page }) => {
  const titles = await loadProjectTitles();
  await gotoHub(page);

  type FocusInfo = {
    label: string;
    focusVisible: boolean;
    outlineStyle: string;
    outlineWidth: number;
    outlineColor: string;
    width: number;
    height: number;
  };

  const expected = new Set(titles);
  const reached = new Map<string, FocusInfo>();

  // Focus starts on the document body after a fresh load, so this walks the
  // real tab order from the top of the page. The bound is generous — the hub
  // has well under 60 focusable elements — and only guards against an
  // infinite loop if a card never receives focus.
  const MAX_TABS = 60;
  for (let i = 0; i < MAX_TABS && reached.size < expected.size; i += 1) {
    await page.keyboard.press('Tab');

    const info = await page.evaluate<FocusInfo | null>(() => {
      const el = document.activeElement as HTMLElement | null;
      if (!el || el.tagName !== 'BUTTON') return null;
      const label = el.getAttribute('aria-label');
      if (!label) return null;
      const style = getComputedStyle(el);
      const box = el.getBoundingClientRect();
      return {
        label,
        focusVisible: el.matches(':focus-visible'),
        outlineStyle: style.outlineStyle,
        outlineWidth: parseFloat(style.outlineWidth),
        outlineColor: style.outlineColor,
        width: box.width,
        height: box.height,
      };
    });

    if (info && expected.has(info.label)) reached.set(info.label, info);
  }

  expect(
    [...reached.keys()].sort(),
    'every project card should be reachable with Tab'
  ).toEqual([...expected].sort());

  for (const [label, info] of reached) {
    expect(info.focusVisible, `"${label}" should match :focus-visible after Tab`).toBe(true);
    expect(info.outlineStyle, `"${label}" focus ring style`).not.toBe('none');
    expect(info.outlineWidth, `"${label}" focus ring width`).toBeGreaterThanOrEqual(2);
    expect(info.outlineColor, `"${label}" focus ring colour`).not.toBe('rgba(0, 0, 0, 0)');
    // The ring has to trace the card itself. A collapsed 0x0 hit area would
    // still "have an outline" while being invisible to a sighted keyboard user.
    expect(info.width, `"${label}" focus ring width in px`).toBeGreaterThan(100);
    expect(info.height, `"${label}" focus ring height in px`).toBeGreaterThan(50);
  }
});

// ---------------------------------------------------------------------------
// Test 3 — the mouse path the keyboard fix sits on top of still works
// ---------------------------------------------------------------------------
// The button is stretched over the tile, so a click anywhere on the card body
// lands on it. This guards the pre-existing behaviour: clicking the card — not
// just its title — must still open the project.
test('clicking the card body still opens the project', async ({ page }) => {
  const titles = await loadProjectTitles();
  await gotoHub(page);

  const title = titles[0];
  // The card container is the button's parent; clicking its centre exercises
  // the card surface rather than targeting the control directly.
  const cardBody = page.getByRole('button', { name: title, exact: true }).locator('..');
  await cardBody.click();

  await expect(page.locator('#root > [data-screen-label]')).toHaveAttribute(
    'data-screen-label',
    `Project detail ${EM_DASH} ${title}`,
    { timeout: 15_000 }
  );
});

// ---------------------------------------------------------------------------
// Test 4 — Enter and Space both open the card's project detail view
// ---------------------------------------------------------------------------
// locator.press() focuses the element and dispatches real key events, so a
// non-interactive <div onClick> would fail these outright.
for (const key of ['Enter', 'Space'] as const) {
  test(`${key} opens every project card`, async ({ page }) => {
    const titles = await loadProjectTitles();
    await gotoHub(page);

    for (const title of titles) {
      await page.getByRole('button', { name: title, exact: true }).press(key);

      await expect(
        page.locator('#root > [data-screen-label]'),
        `${key} on "${title}" should open its project detail view`
      ).toHaveAttribute('data-screen-label', `Project detail ${EM_DASH} ${title}`, {
        timeout: 15_000,
      });

      // Return to the hub so the next card starts from the same state.
      await page.getByRole('button', { name: 'all projects' }).click();
      await expect(page.getByText('Selected public work', { exact: true })).toBeVisible();
    }
  });
}
