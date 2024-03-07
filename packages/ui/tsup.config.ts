import fs from 'node:fs';

import prettier from 'prettier';
import { defineConfig } from 'tsup';

const entries = [
  {
    source: './src/primitives/avatar/index.tsx',
    export: './avatar',
  },
  {
    source: './src/primitives/typography/index.tsx',
    export: './typography',
  },
  {
    source: './src/primitives/accordion/index.tsx',
    export: './accordion',
  },
  {
    source: './src/primitives/aspect-ratio/index.tsx',
    export: './aspect-ratio',
  },
  {
    source: './src/primitives/alert/index.tsx',
    export: './alert',
  },
  {
    source: './src/primitives/button/index.tsx',
    export: './button',
  },
  {
    source: './src/primitives/alert-dialog/index.tsx',
    export: './alert-dialog',
  },
  {
    source: './src/primitives/badge/index.tsx',
    export: './badge',
  },
  {
    source: './src/primitives/tooltip/index.tsx',
    export: './tooltip',
  },
  {
    source: './src/primitives/input/index.tsx',
    export: './input',
  },
  {
    source: './src/primitives/label/index.tsx',
    export: './label',
  },
  {
    source: './src/primitives/toggle/index.tsx',
    export: './toggle',
  },
  {
    source: './src/utils/cn.ts',
    export: './cn',
  },
];

interface PackageJson {
  exports: Record<string, unknown>;
  main: string;
  module: string;
  types: string;
}

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
    const packageJson = fs.readFileSync('./package.json', 'utf-8');
    const pkg = JSON.parse(packageJson) as PackageJson;
    pkg.exports = entries.reduce((acc: Record<string, unknown>, entry) => {
      acc[entry.export] = {
        import: {
          types: entry.source
            .replace('src', 'dist')
            .replace(/\.tsx?$/, '.d.ts'),
          default: entry.source
            .replace('src', 'dist')
            .replace(/\.tsx?$/, '.js'),
        },
      };
      return acc;
    }, {});

    fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2));

    const prettierConfig = await prettier.resolveConfig(
      '../../prettier.config.js',
    );

    if (prettierConfig) {
      const formatted = await prettier.format(JSON.stringify(pkg), {
        ...prettierConfig,
        filepath: './package.json',
      });
      fs.writeFileSync('./package.json', formatted);
    }
  },
}));
