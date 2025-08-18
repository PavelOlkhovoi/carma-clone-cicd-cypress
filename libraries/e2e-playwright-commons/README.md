# E2E Playwright Commons

A shared library for common Playwright E2E test functionality across topic map applications.

## Overview

This library provides reusable components for Playwright E2E testing, including:

- **Smoke Tests**: Pre-built functions to verify essential UI elements are visible
- **Page Objects**: Reusable page object models for common topic map elements
- **Test Helpers**: Utility functions for common E2E operations

## Installation

This library is part of the Nx workspace and can be imported directly:

```typescript
import { runMapSmokeTest } from '@cismet/e2e-playwright-commons';
```

## Usage

### Basic Smoke Test

The main smoke test function checks for essential UI elements:

```typescript
import { test, expect } from '@playwright/test';
import { runMapSmokeTest } from '@cismet/e2e-playwright-commons';

test('smoke test', async ({ page }) => {
  await page.goto('/');
  await runMapSmokeTest(page);
});
```

### Individual Element Checks

You can also check individual elements:

```typescript
import { 
  checkZoomControlVisible,
  checkFuzzySearchVisible,
  checkApplicationMenuVisible,
  checkInfoBoxVisible 
} from '@cismet/e2e-playwright-commons';

test('individual checks', async ({ page }) => {
  await page.goto('/');
  
  await checkZoomControlVisible(page);
  await checkFuzzySearchVisible(page, 15000); // custom timeout
  await checkApplicationMenuVisible(page);
  await checkInfoBoxVisible(page);
});
```

### Using Page Objects

```typescript
import { TopicMapPage } from '@cismet/e2e-playwright-commons';

test('using page objects', async ({ page }) => {
  await page.goto('/');
  
  const topicMapPage = new TopicMapPage(page);
  await topicMapPage.waitForPageReady();
  
  const isReady = await topicMapPage.areEssentialElementsVisible();
  expect(isReady).toBe(true);
});
```

### Test Setup Helpers

```typescript
import { setupSmokeTest } from '@cismet/e2e-playwright-commons';

test('setup helper', async ({ page }) => {
  await setupSmokeTest(page, 'http://localhost:4200', {
    navigationTimeout: 30000,
    waitForNetworkIdle: true
  });
  
  // App is now ready for testing
});
```

## API Reference

### Smoke Tests

- `runMapSmokeTest(page, options?)` - Runs complete smoke test
- `checkZoomControlVisible(page)` - Checks zoom control visibility
- `checkFuzzySearchVisible(page, timeout?)` - Checks fuzzy search visibility
- `checkApplicationMenuVisible(page)` - Checks application menu visibility
- `checkInfoBoxVisible(page)` - Checks info box visibility

### Page Objects

- `TopicMapPage` - Base page object for topic map elements
- `ExtendedTopicMapPage` - Extended page object with additional elements

### Test Helpers

- `waitForAppReady(page, timeout?)` - Waits for app to be ready
- `setupSmokeTest(page, url, options?)` - Sets up page for testing
- `takeDebugScreenshot(page, name)` - Takes debug screenshot
- `waitForElementWithRetry(page, selector, timeout?, retries?)` - Waits with retry logic
- `isTopicMapApp(page)` - Checks if page is a topic map application

## Element Selectors

The library expects the following data-test-id attributes:

- `[data-test-id=zoom-control]` - Zoom control element
- `[data-test-id=fuzzy-search]` - Fuzzy search input
- `[data-test-id=info-box]` - Info box element
- `#cmdShowModalApplicationMenu` - Application menu button

## Configuration Options

### SmokeTestOptions

```typescript
interface SmokeTestOptions {
  fuzzySearchTimeout?: number;     // Default: 10000ms
  checkZoomControl?: boolean;      // Default: true
  checkFuzzySearch?: boolean;      // Default: true
  checkApplicationMenu?: boolean;  // Default: true
  checkInfoBox?: boolean;          // Default: true
}
```

### SmokeTestSetupOptions

```typescript
interface SmokeTestSetupOptions {
  baseUrl?: string;
  navigationTimeout?: number;      // Default: 30000ms
  waitForNetworkIdle?: boolean;    // Default: true
}
```
