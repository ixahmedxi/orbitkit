import type { UserConfig } from 'vite'

import { mergeConfig as viteMergeConfig } from 'vite'

export const mergeConfig = (
  baseConfig: UserConfig,
  overrideConfig: UserConfig,
) => viteMergeConfig(baseConfig, overrideConfig)
