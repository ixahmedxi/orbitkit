import { fixupConfigRules } from '@eslint/compat'

import { compat, defineConfig } from '../utils.js'

export const storybook = defineConfig(
  {
    ignores: ['!.storybook'],
  },
  ...fixupConfigRules(compat.extends('plugin:storybook/recommended')),
  ...fixupConfigRules(compat.extends('plugin:storybook/csf')),
  ...fixupConfigRules(compat.extends('plugin:storybook/csf-strict')),
  {
    files: ['*.stories.@(ts|tsx|js|jsx|mjs|cjs)'],
    rules: {},
  },
)
