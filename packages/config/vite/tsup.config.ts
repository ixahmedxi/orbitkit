import { defineConfig } from 'tsup';

export default defineConfig((opts) => ({
  entry: ['./src/react.ts'],
  format: ['esm'],
  splitting: true,
  sourcemap: true,
  minify: true,
  clean: !opts.watch,
  dts: true,
  outDir: 'dist',
}));
