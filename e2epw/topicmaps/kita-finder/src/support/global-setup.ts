import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  // Global setup logic can be added here
  // For example: database seeding, authentication setup, etc.
  console.log('Running global setup for Playwright tests...');
}

export default globalSetup;
