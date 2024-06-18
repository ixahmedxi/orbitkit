import { configs, defineConfig } from '@orbitkit/eslint'

export default defineConfig(
  ...configs.base,

  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
)
