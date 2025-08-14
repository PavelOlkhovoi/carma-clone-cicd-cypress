import { test, expect } from '@playwright/test';

test.describe('kita finder smoke test', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for the application to load
    await page.waitForLoadState('networkidle');
  });

  test('map loads with key controls', async ({ page }) => {
    // Wait for the main application to be ready
    await page.waitForSelector('body', { state: 'visible' });
    
    // Check that fuzzy search is visible (this is a key indicator the app loaded)
    await expect(page.locator('[data-test-id=fuzzy-search]')).toBeVisible({ timeout: 10000 });

    // Check that application menu button is visible
    await expect(page.locator('#cmdShowModalApplicationMenu')).toBeVisible();

    // Check that info box is visible
    await expect(page.locator('[data-test-id=info-box]')).toBeVisible();

    // Check that zoom control is not visible (as per original Cypress test)
    await expect(page.locator('[data-test-id=zoom-control]')).not.toBeVisible();
  });
});
