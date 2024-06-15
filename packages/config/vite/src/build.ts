import { LibraryOptions, defineConfig } from 'vite';
import createExternal, {
  type Options as ExternalPluginOptions,
} from 'vite-plugin-external';
import dtsPlugin, {
  type PluginOptions as DtsPluginOptions,
} from 'vite-plugin-dts';
import { globbySync } from 'globby';
import preserveDirectives from 'rollup-plugin-preserve-directives';

export function buildConfig({
  lib,
  dts = {},
  external = {},
}: {
  lib: LibraryOptions & {
    entry: string[] | string;
  };
  dts?: DtsPluginOptions;
  external?: ExternalPluginOptions;
}) {
  return defineConfig({
    plugins: [
      createExternal({
        nodeBuiltins: true,
        ...external,
      }),
      dtsPlugin({
        compilerOptions: {
          tsBuildInfoFile: 'tsconfig.build.tsbuildinfo',
          outDir: 'dist',
          rootDir: 'src',
          noEmit: false,
          ...dts.compilerOptions,
        },
        include: ['src/**/*.ts', 'src/**/*.tsx'],
        ...dts,
      }),
    ],
    build: {
      sourcemap: true,
      rollupOptions: {
        plugins: [
          preserveDirectives({
            suppressPreserveModulesWarning: true,
          }),
        ],
        output: {
          preserveModules: true,
        },
        treeshake: true,
        onwarn(warning, defaultHandler) {
          if (warning.code === 'SOURCEMAP_ERROR') {
            return;
          }

          defaultHandler(warning);
        },
      },
      lib: {
        formats: ['es', 'cjs'],
        ...lib,
        entry: globbySync(lib.entry),
      },
    },
  });
}
