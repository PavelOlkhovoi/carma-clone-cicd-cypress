import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './src/e2e',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env['CI'],
  /* No retries for smoke tests to fail fast */
  retries: 0,
  /* Use more workers in CI for speed */
  workers: process.env['CI'] ? 2 : undefined,
  /* Minimal reporter for speed */
  reporter: process.env['CI'] ? 'dot' : 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:4333',
    /* No trace collection for speed */
    trace: 'off',
    /* No screenshots for speed */
    screenshot: 'off',
    /* Faster navigation */
    navigationTimeout: 15000,
    actionTimeout: 10000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { 
        // Use system Chrome in CI
        channel: process.env.CI ? 'chrome' : undefined,
        // Force headless mode for speed
        headless: true,
      },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npx nx serve stadtplan --port=4333',
    url: 'http://localhost:4333',
    reuseExistingServer: true,
    timeout: 30_000, // Reduced timeout
  },
});