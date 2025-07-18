import { defineConfig } from 'cypress';
import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__dirname),
    screenshotsFolder: './report-cy/screenshots',
    reporter: 'spec',
    reporterOptions: {
      toConsole: true,
      output: 'minimal'
    },
    video: false,
    videosFolder: './report-cy/videos',
    screenshotOnRunFailure: true,
    pageLoadTimeout: 120000,
    baseUrl: 'http://localhost:4200',
    experimentalStudio: true,
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'chrome' || browser.name === 'electron') {
          launchOptions.args = launchOptions.args || [];
          launchOptions.args.push('--silent');
        }
        return launchOptions;
      });
    }
  },
});
