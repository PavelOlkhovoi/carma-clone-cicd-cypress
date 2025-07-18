import { defineConfig } from 'cypress';
import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__dirname),
    screenshotsFolder: './report-cy/screenshots',
    pageLoadTimeout: 120000,
    baseUrl: 'http://localhost:4200',
    experimentalStudio: true,
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
