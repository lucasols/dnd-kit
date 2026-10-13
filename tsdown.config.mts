import {defineConfig} from 'tsdown';

export default defineConfig({
  // Shared by every package: resolve paths from the package being built.
  cwd: process.cwd(),
  entry: ['src/index.ts'],
  format: 'esm',
  platform: 'neutral',
  target: 'es2022',
  tsconfig: 'tsconfig.build.json',
  dts: true,
  sourcemap: true,
});
