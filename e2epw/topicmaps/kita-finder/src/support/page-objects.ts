import { Page, Locator } from '@playwright/test';

/**
 * Page Object Model for kita-finder application
 */
export class KitaFinderPage {
  readonly page: Page;
  readonly fuzzySearch: Locator;
  readonly menuButton: Locator;
  readonly infoBox: Locator;
  readonly zoomControl: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fuzzySearch = page.locator('[data-test-id=fuzzy-search]');
    this.menuButton = page.locator('#cmdShowModalApplicationMenu');
    this.infoBox = page.locator('[data-test-id=info-box]');
    this.zoomControl = page.locator('[data-test-id=zoom-control]');
  }

  async goto() {
    await this.page.goto('/');
  }

  async waitForLoad() {
    await this.page.waitForLoadState('networkidle');
    await this.fuzzySearch.waitFor({ state: 'visible' });
  }

  async openMenu() {
    await this.menuButton.click();
  }

  async searchFor(query: string) {
    await this.fuzzySearch.fill(query);
    await this.fuzzySearch.press('Enter');
  }
}
