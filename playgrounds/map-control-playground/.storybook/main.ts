import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/app/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-essentials", "@storybook/addon-interactions"],

  framework: {
    name: "@storybook/react-vite",
    options: {
      builder: {
        viteConfigPath: "playgrounds/map-control-playground/vite.config.mts",
      },
    },
  },

  docs: {},

  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      tsconfigPath:
        "playgrounds/map-control-playground/tsconfig.storybook.json",
    },
  },
};

export default config;

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/recipes/storybook/custom-builder-configs
