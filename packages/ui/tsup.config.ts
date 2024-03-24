import fs from 'node:fs';

import { findFarthestFile, readPackageJSON } from 'pkg-types';
import prettier from 'prettier';
import { defineConfig } from 'tsup';

const primitives = () => {
  const listOfPrimitives = fs
    .readdirSync('./src/primitives', { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  return listOfPrimitives.map((primitive) => ({
    source: `./src/primitives/${primitive}/index.tsx`,
    export: `./${primitive}`,
  }));
};

const entries = [
  ...primitives(),
  {
    source: './src/utils/cn.ts',
    export: './cn',
  },
];

export default defineConfig((opts) => ({
  entry: entries.map((entry) => entry.source),
  format: ['esm'],
  splitting: true,
  sourcemap: true,
  minify: true,
  clean: !opts.watch,
  dts: true,
  outDir: 'dist',
  async onSuccess() {
    const pkg = await readPackageJSON();

    pkg.exports = {};

    entries.forEach((entry) => {
      if (typeof pkg.exports === 'object') {
        pkg.exports = {
          ...pkg.exports,
          [entry.export]: {
            import: {
              types: entry.source
                .replace('src', 'dist')
                .replace(/\.tsx?$/, '.d.ts'),
              default: entry.source
                .replace('src', 'dist')
                .replace(/\.tsx?$/, '.js'),
            },
          },
        } as Record<string, string | Record<string, string>>;
      }
    });

    const prettierConfig = await prettier.resolveConfig(
      await findFarthestFile('prettier.config.js'),
    );

    if (prettierConfig) {
      const formatted = await prettier.format(JSON.stringify(pkg), {
        ...prettierConfig,
        filepath: './package.json',
      });
      fs.writeFileSync('./package.json', formatted);
    } else {
      throw new Error('Prettier config not found');
    }
  },
}));
