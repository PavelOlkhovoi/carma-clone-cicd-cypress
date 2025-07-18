import { defineConfig } from 'cypress';
import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__dirname),
    screenshotsFolder: './report-cy/screenshots',
    reporter: 'spec',  // Built-in reporter
    reporterOptions: {
      toConsole: true
    },
    video: false,
    videosFolder: './report-cy/videos',
    screenshotOnRunFailure: true
  },
});
