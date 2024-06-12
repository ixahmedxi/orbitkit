import { defineConfig } from 'tsup';

import { listDirectories } from '@orbitkit/utils/filesystem';

/**
 * This function generates a list of entries for the build.
 * @returns List of entries for tsup.
 */
function getEntries() {
  const primitives = listDirectories('./src/primitives').map(
    (d) => `./src/primitives/${d.name}/index.tsx`,
  );

  return [...primitives, './src/utils/cn.ts'];
}

export default defineConfig((opts) => ({
  entry: getEntries(),
  format: ['esm', 'cjs'],
  splitting: true,
  sourcemap: true,
  minify: !opts.watch,
  experimentalDts: true,
  // We need to use a different tsconfig for the build because we need to exclude the story files from being compiled into the .d.ts bundle file.
  tsconfig: './tsconfig.build.json',
  outDir: 'dist',
}));
