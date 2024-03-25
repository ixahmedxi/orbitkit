import { defineConfig } from 'tsup';

export default defineConfig((opts) => ({
  entry: [
    './src/configs/react-vite.ts',
    './src/manager.tsx',
    './src/theme.ts',
    './src/preview.tsx',
    './src/utils/getAbsolutePath.ts',
  ],
  format: ['esm'],
  splitting: true,
  sourcemap: true,
  minify: !opts.watch,
  clean: !opts.watch,
  dts: true,
  outDir: 'dist',
}));
