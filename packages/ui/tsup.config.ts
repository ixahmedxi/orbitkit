import fs from 'node:fs';

import prettier from 'prettier';
import { defineConfig } from 'tsup';

const entries = [
  {
    source: './src/index.ts',
    export: '.',
  },
  {
    source: './src/primitives/avatar.tsx',
    export: './avatar',
  },
  {
    source: './src/primitives/typography.tsx',
    export: './typography',
  },
  {
    source: './src/primitives/accordion.tsx',
    export: './accordion',
  },
  {
    source: './src/primitives/aspect-ratio.tsx',
    export: './aspect-ratio',
  },
  {
    source: './src/primitives/alert.tsx',
    export: './alert',
  },
  {
    source: './src/primitives/button.tsx',
    export: './button',
  },
  {
    source: './src/primitives/alert-dialog.tsx',
    export: './alert-dialog',
  },
  {
    source: './src/primitives/badge.tsx',
    export: './badge',
  },
  {
    source: './src/primitives/tooltip.tsx',
    export: './tooltip',
  },
  {
    source: './src/primitives/input.tsx',
    export: './input',
  },
  {
    source: './src/primitives/label.tsx',
    export: './label',
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
  format: ['esm', 'cjs'],
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
        require: {
          types: entry.source
            .replace('src', 'dist')
            .replace(/\.tsx?$/, '.d.cts'),
          default: entry.source
            .replace('src', 'dist')
            .replace(/\.tsx?$/, '.cjs'),
        },
      };
      return acc;
    }, {});

    pkg.main = './dist/index.cjs';
    pkg.module = './dist/index.js';
    pkg.types = './dist/index.d.ts';

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
