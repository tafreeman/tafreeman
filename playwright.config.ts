import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright smoke-test configuration.
 *
 * Static files are served by Python's built-in HTTP server on port 8099.
 * Python 3 must be on PATH (verify with: python --version).
 *
 * Before first run the orchestrator must execute:
 *   npm install
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
    /* Extra timeout for actions — generous to allow @babel/standalone compile */
    actionTimeout: 30_000,
  },

  /* Launch the Python static file server before the test suite starts */
  webServer: {
    command: 'python -m http.server 8099',
    url: 'http://127.0.0.1:8099',
    reuseExistingServer: true,
    timeout: 30_000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
