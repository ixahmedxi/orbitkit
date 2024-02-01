import { createEnv } from '@t3-oss/env-core';
import { vercel } from '@t3-oss/env-core/presets';
import { z } from 'zod';

export const env = createEnv({
  extends: [vercel],
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']).optional(),
    AUTH_GITHUB_CLIENT_ID: z.string(),
    AUTH_GITHUB_CLIENT_SECRET: z.string(),
  },
  runtimeEnv: {
    NODE_ENV: process.env['NODE_ENV'],
    AUTH_GITHUB_CLIENT_ID: process.env['AUTH_GITHUB_CLIENT_ID'],
    AUTH_GITHUB_CLIENT_SECRET: process.env['AUTH_GITHUB_CLIENT_SECRET'],
  },
  emptyStringAsUndefined: true,
});
