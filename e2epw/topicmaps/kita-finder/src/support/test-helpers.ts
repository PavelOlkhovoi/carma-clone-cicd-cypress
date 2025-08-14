import { Page, expect } from '@playwright/test';

/**
 * Common test helper functions for kita-finder Playwright tests
 */

export class TestHelpers {
  constructor(private page: Page) {}

  /**
   * Wait for the application to fully load
   */
  async waitForAppLoad() {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForSelector('[data-test-id=fuzzy-search]', { state: 'visible' });
  }

  /**
   * Check if the main UI components are visible
   */
  async verifyMainUIComponents() {
    await expect(this.page.locator('[data-test-id=fuzzy-search]')).toBeVisible();
    await expect(this.page.locator('#cmdShowModalApplicationMenu')).toBeVisible();
    await expect(this.page.locator('[data-test-id=info-box]')).toBeVisible();
  }

  /**
   * Take a screenshot with a custom name
   */
  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `./report-pw/screenshots/${name}.png` });
  }
}
