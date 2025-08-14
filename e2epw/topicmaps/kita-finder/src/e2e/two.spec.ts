import { test, expect } from '@playwright/test';

test.describe('kita finder test two', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for the application to load
    await page.waitForLoadState('networkidle');
  });

  test('advanced functionality test', async ({ page }) => {
    // Wait for the main application to be ready
    await page.waitForSelector('[data-test-id=fuzzy-search]', { state: 'visible', timeout: 10000 });

    // Test application menu functionality
    const menuButton = page.locator('#cmdShowModalApplicationMenu');
    await expect(menuButton).toBeVisible();
    
    // Click the menu button if it's clickable
    if (await menuButton.isEnabled()) {
      await menuButton.click();
      // Add assertions for menu content if needed
    }

    // Test info box interaction
    await expect(page.locator('[data-test-id=info-box]')).toBeVisible();

    // Test fuzzy search functionality
    const searchInput = page.locator('[data-test-id=fuzzy-search]');
    await expect(searchInput).toBeVisible();
    await expect(searchInput).toBeEnabled();
  });
});
