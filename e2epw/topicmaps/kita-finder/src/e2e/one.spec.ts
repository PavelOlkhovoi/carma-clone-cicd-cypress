import { test, expect } from '@playwright/test';

test.describe('kita finder test one', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for the application to load
    await page.waitForLoadState('networkidle');
  });

  test('basic navigation and interaction', async ({ page }) => {
    // Wait for the main application to be ready
    await page.waitForSelector('[data-test-id=fuzzy-search]', { state: 'visible', timeout: 10000 });

    // Check that the fuzzy search is visible and functional
    await expect(page.locator('[data-test-id=fuzzy-search]')).toBeVisible();

    // Check that the main UI components are present
    await expect(page.locator('#cmdShowModalApplicationMenu')).toBeVisible();
    await expect(page.locator('[data-test-id=info-box]')).toBeVisible();
  });
});
