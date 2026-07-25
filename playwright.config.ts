import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright smoke-test configuration.
 *
 * Static files are served by Python's built-in HTTP server on port 8099.
 * Python 3 must be on PATH (verify with: python --version).
 *
 * Before first run the orchestrator must execute:
 *   npm install
 *   npm run build:js      # index.html loads dist/ + vendor/, both generated
 *   npx playwright install chromium
 */
export default defineConfig({
  testDir: './tests',

  /* Global timeout for a single test */
  timeout: 60_000,

  /* Allow one retry on CI to absorb transient network blips */
  retries: process.env.CI ? 1 : 0,

  /* Run tests sequentially — no parallelism needed for a smoke suite */
  workers: 1,

  reporter: [['list'], ['html', { open: 'never' }]],

  use: {
    baseURL: 'http://127.0.0.1:8099',
    /* Headless on CI, headed locally when PWDEBUG is set */
    headless: !process.env.PWDEBUG,
    /* Generous action timeout. The page is precompiled and same-origin now, so
       nothing here should be slow — this only absorbs a loaded CI runner. */
    actionTimeout: 30_000,
  },

  /* Launch the Python static file server before the test suite starts.
     `python -m http.server` serves its own working directory, and Playwright's
     reuse check is a liveness probe of the URL only — it cannot tell WHAT a
     server that is already listening is serving. With reuse enabled, a
     leftover server from another worktree, branch or session silently supplies
     a different index.html, dist/ and vendor/, and the suite reports a green
     run against a tree it never loaded. That is not hypothetical: a stray
     server on this port did outlive a concurrent session in this workspace.
     So: never reuse. A port already in use now fails loudly instead. */
  webServer: {
    command: 'python -m http.server 8099',
    url: 'http://127.0.0.1:8099',
    reuseExistingServer: false,
    timeout: 30_000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
