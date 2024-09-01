import type { LibraryOptions } from 'vite'
import type { PluginOptions as DtsPluginOptions } from 'vite-plugin-dts'
import type { Options as ExternalPluginOptions } from 'vite-plugin-external'

import { globbySync } from 'globby'
import preserveDirectives from 'rollup-plugin-preserve-directives'
import { defineConfig } from 'vite'
import dtsPlugin from 'vite-plugin-dts'
import createExternal from 'vite-plugin-external'

/**
 * A vite config preset for bundling packages in lib mode.
 * @param params The parameters that the function takes.
 * @param params.lib override vite's `build.lib` options.
 * @param params.dts override the `vite-plugin-dts` options.
 * @param params.external override the `vite-plugin-external` options.
 * @returns a vite configuration object
 */
export function buildConfig({
  lib,
  dts = {},
  external = {},
}: {
  lib: LibraryOptions & {
    entry: string[] | string
  }
  dts?: DtsPluginOptions
  external?: ExternalPluginOptions
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
          // @ts-expect-error - version conflicts
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
            return
          }

          defaultHandler(warning)
        },
      },
      lib: {
        formats: ['es', 'cjs'],
        ...lib,
        entry: globbySync(lib.entry),
      },
    },
  })
}
