import { configs, defineConfig } from '@orbitkit/eslint'

export default defineConfig(
  {
    ignores: ['apps', 'packages'],
  },

  ...configs.base,
)
