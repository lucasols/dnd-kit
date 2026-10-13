import {fileURLToPath} from 'node:url';
import type {StorybookConfig} from '@storybook/react-vite';
import postcssNested from 'postcss-nested';
import postcssSimpleVars from 'postcss-simple-vars';

const packagesDir = fileURLToPath(new URL('../packages', import.meta.url));

const config: StorybookConfig = {
  framework: {
    name: '@storybook/react-vite',
    options: {strictMode: true},
  },
  staticDirs: ['./assets'],
  stories: ['../stories/**/*.story.tsx'],
  viteFinal: async (viteConfig) => ({
    ...viteConfig,
    resolve: {
      ...viteConfig.resolve,
      alias: [
        // Stories run against the package sources, no build step needed.
        {
          find: /^@lucasols\/dnd-kit-(.*)$/,
          replacement: `${packagesDir}/$1/src`,
        },
      ],
    },
    css: {
      ...viteConfig.css,
      postcss: {plugins: [postcssSimpleVars(), postcssNested()]},
    },
  }),
};

export default config;
