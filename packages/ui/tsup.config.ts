import { readPackageJSON } from 'pkg-types';
import { defineConfig } from 'tsup';

import { formatAndWriteWithPrettier, listDirectories } from '@orbitkit/utils';

const getPrimitives = async () => {
  const listOfPrimitives = (await listDirectories('./src/primitives')).map(
    (d) => d.name,
  );

  return listOfPrimitives.map((primitive) => ({
    source: `./src/primitives/${primitive}/index.tsx`,
    export: `./${primitive}`,
  }));
};

async function getEntries() {
  const primitives = await getPrimitives();

  return [
    ...primitives,
    {
      source: './src/utils/cn.ts',
      export: './cn',
    },
  ];
}

export default defineConfig(async (opts) => ({
  entry: (await getEntries()).map((entry) => entry.source),
  format: ['esm'],
  splitting: true,
  sourcemap: true,
  minify: !opts.watch,
  clean: !opts.watch,
  dts: true,
  outDir: 'dist',
  async onSuccess() {
    const pkg = await readPackageJSON();

    pkg.exports = {};

    const entries = await getEntries();

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

    await formatAndWriteWithPrettier({
      content: JSON.stringify(pkg, null, 2),
      filePath: './package.json',
    });
  },
}));
