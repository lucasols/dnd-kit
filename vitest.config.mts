import {fileURLToPath} from 'node:url';
import {defineConfig} from 'vitest/config';

const packagesDir = fileURLToPath(new URL('./packages', import.meta.url));

export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^@lucasols\/dnd-kit-(.*)$/,
        replacement: `${packagesDir}/$1/src`,
      },
    ],
  },
  test: {
    // Root runs cover every package; package-level runs only their own tests.
    include: ['test/**/*.test.{ts,tsx}', 'packages/*/test/**/*.test.{ts,tsx}'],
    passWithNoTests: true,
  },
});
