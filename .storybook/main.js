// This file has been automatically migrated to valid ESM format by Storybook.

// import { createRequire } from "node:module";
// const require = createRequire(import.meta.url);
// import tailwindcss from "@tailwindcss/vite";
/** @type { import('@storybook/sveltekit').StorybookConfig } */
export default {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|ts|svelte)"
  ],
    "staticDirs": ['../static'],
  "addons": [
      {
          name: "@storybook/addon-svelte-csf",
          options: {
              legacyTemplate: true
          }
      },

    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
    "@storybook/addon-themes"
      // {
      //     name: '@storybook/addon-postcss',
      //     options: {
      //         cssLoaderOptions: {
      //             // When you have splitted your css over multiple files
      //             // and use @import('./other-styles.css')
      //             importLoaders: 1,
      //         },
      //         postcssLoaderOptions: {
      //             // When using postCSS 8
      //             implementation: require('postcss'),
      //         },
      //     }
      // }
  ],
  "framework": {
    "name": "@storybook/sveltekit",
    "options": {
        docgen: false,
    }
  }
};