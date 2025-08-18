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
# Run all Playwright tests
npx nx run-many --target=e2e --projects="e2epw-*"npx nx run-many --target=e2e --projects="e2epw-*" --skip-nx-cache  
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

