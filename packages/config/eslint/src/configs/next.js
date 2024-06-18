import { fixupConfigRules } from '@eslint/compat'

import { compat, defineConfig } from '../utils.js'
import { react } from './react.js'

export const next = defineConfig(
  ...react,
  ...fixupConfigRules(compat.extends('plugin:@next/next/recommended')),
)
