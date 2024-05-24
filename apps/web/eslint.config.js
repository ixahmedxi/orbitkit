import { defineConfig, configs } from '@orbitkit/eslint'

export default defineConfig(
  ...configs.base,
  ...configs.playwright,

  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
)