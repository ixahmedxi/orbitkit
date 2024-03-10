import fs from 'node:fs';

import prettier from 'prettier';
import { defineConfig } from 'tsup';

const genPrimitiveEntries = (primitives: string[]) => {
  return primitives.map((primitive) => ({
    source: `./src/primitives/${primitive}/index.tsx`,
    export: `./${primitive}`,
  }));
};

const entries = [
  ...genPrimitiveEntries([
    'accordion',
    'alert',
    'alert-dialog',
    'aspect-ratio',
    'avatar',
    'badge',
    'breadcrumb',
    'button',
    'card',
    'dropdown-menu',
    'input',
    'label',
    'select',
    'switch',
    'textarea',
    'toggle',
    'toggle-group',
    'tooltip',
    'typography',
    'popover',
    'calendar',
    'checkbox',
    'skeleton',
    'dialog',
    'progress',
  ]),
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
