/// <reference types="../eslint.d.ts" />

import { FlatCompat } from '@eslint/eslintrc';
import { FlatConfig } from '@typescript-eslint/utils/ts-eslint';

export declare const defineConfig: typeof import('typescript-eslint').config;
export declare const compat: FlatCompat;

export declare const configs: {
  base: FlatConfig.ConfigArray;
  playwright: FlatConfig.ConfigArray;
};
