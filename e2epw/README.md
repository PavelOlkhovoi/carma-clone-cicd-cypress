# Playwright E2E Tests

This directory contains Playwright end-to-end tests for the monorepo applications, following the same architecture pattern as the existing Cypress tests in the `e2e/` directory.

## Structure

The Playwright tests follow the naming convention `e2epw-*` and mirror the Cypress test structure:

```
e2epw/
├── tsconfig.e2e.json          # Base TypeScript configuration
├── topicmaps/
│   └── kita-finder/           # First Playwright test project
│       ├── playwright.config.ts
│       ├── project.json
│       ├── tsconfig.json
│       ├── .eslintrc.json
│       └── src/
│           ├── e2e/           # Test files (*.spec.ts)
│           ├── fixtures/      # Test data
│           └── support/       # Helper functions and page objects
└── README.md
```

## Running Tests

### Prerequisites

- Playwright dependencies are already installed (`@nx/playwright`, `@playwright/test`)
- Playwright browsers are installed (`npx playwright install`)

### Commands

```bash
# Run all Playwright tests for kita-finder
npx nx e2e e2epw-kita-finder

# Run tests with Playwright UI (interactive mode)
npx nx e2e e2epw-kita-finder --ui

# Run tests in headed mode (see browser)
npx nx e2e e2epw-kita-finder --headed

# Run specific test file
npx playwright test e2epw/topicmaps/kita-finder/src/e2e/smoke.spec.ts

# Run tests and generate HTML report
npx nx e2e e2epw-kita-finder --reporter=html
```

### Local Development

The Playwright configuration automatically starts the development server (`npx nx serve kita-finder`) before running tests. The tests will:

1. Start the kita-finder development server on `http://localhost:4200`
2. Wait for the server to be ready
3. Run tests across multiple browsers (Chromium, Firefox, WebKit)
4. Generate HTML reports in `./report-pw/`

## Test Structure

### Test Files

- `smoke.spec.ts` - Basic smoke tests to verify core functionality
- `one.spec.ts` - Basic navigation and interaction tests
- `two.spec.ts` - Advanced functionality tests

### Support Files

- `test-helpers.ts` - Common test utility functions
- `page-objects.ts` - Page Object Model implementations
- `global-setup.ts` - Global test setup configuration

### Fixtures

- `example.json` - Sample test data

## Configuration

### Playwright Config (`playwright.config.ts`)

- **Test Directory**: `./src/e2e`
- **Base URL**: `http://localhost:4200`
- **Browsers**: Chromium, Firefox, WebKit
- **Reports**: HTML and JSON in `./report-pw/`
- **Web Server**: Auto-starts `npx nx serve kita-finder`

### Nx Integration (`project.json`)

- **Executor**: `@nx/playwright:playwright`
- **Project Name**: `e2epw-kita-finder`
- **Dependencies**: `kita-finder` (implicit dependency)

## Adding New Test Projects

To add Playwright tests for other applications, follow this pattern:

1. Create directory: `e2epw/<domain>/<app-name>/`
2. Copy configuration files from `kita-finder` project
3. Update `project.json` with correct app name and dependencies
4. Update `playwright.config.ts` with correct serve command
5. Create test files in `src/e2e/`

## Troubleshooting

### Common Issues

1. **Tests timeout**: Increase timeout in `playwright.config.ts` or check if dev server starts properly
2. **App not loading**: Verify the serve command in `playwright.config.ts` matches your app's serve target
3. **Element not found**: Check if data-test-id attributes exist in the application

### Debug Mode

```bash
# Run in debug mode
npx playwright test --debug

# Run with trace viewer
npx playwright test --trace on
```

## Comparison with Cypress

| Feature | Cypress | Playwright |
|---------|---------|------------|
| Directory | `e2e/` | `e2epw/` |
| Naming | `e2e-*` | `e2epw-*` |
| Test Files | `*.cy.ts` | `*.spec.ts` |
| Config | `cypress.config.ts` | `playwright.config.ts` |
| Executor | `@nx/cypress:cypress` | `@nx/playwright:playwright` |
| Browsers | Chromium-based | Chromium, Firefox, WebKit |
