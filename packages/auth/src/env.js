import { createEnv } from '@t3-oss/env-core';
import { vercel } from '@t3-oss/env-core/presets';
import { z } from 'zod';

export const env = createEnv({
  extends: [vercel],
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']).optional(),
    AUTH_GITHUB_ID: z.string(),
    AUTH_GITHUB_SECRET: z.string(),
    AUTH_GOOGLE_ID: z.string(),
    AUTH_GOOGLE_SECRET: z.string(),
    AUTH_GOOGLE_CODE_VERIFIER: z.string(),
  },
  runtimeEnv: {
    NODE_ENV: process.env['NODE_ENV'],
    AUTH_GITHUB_ID: process.env['AUTH_GITHUB_ID'],
    AUTH_GITHUB_SECRET: process.env['AUTH_GITHUB_SECRET'],
    AUTH_GOOGLE_ID: process.env['AUTH_GOOGLE_ID'],
    AUTH_GOOGLE_SECRET: process.env['AUTH_GOOGLE_SECRET'],
    AUTH_GOOGLE_CODE_VERIFIER: process.env['AUTH_GOOGLE_CODE_VERIFIER'],
  },
  emptyStringAsUndefined: true,
});
