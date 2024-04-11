import { createEnv } from '@t3-oss/env-nextjs';
import { vercel } from '@t3-oss/env-nextjs/presets';
import { z } from 'zod';

export const env = createEnv({
  extends: [vercel],
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']).optional(),
    PORT: z.coerce.number().default(3000),

    DATABASE_URL: z.string().url().startsWith('postgres'),

    UPLOADTHING_SECRET: z.string(),
    UPLOADTHING_APP_ID: z.string(),

    UNKEY_ROOT_KEY: z.string().optional(),
    UNKEY_NAMESPACE: z.string().optional(),

    AUTH_GITHUB_ID: z.string().optional(),
    AUTH_GITHUB_SECRET: z.string().optional(),

    AUTH_GOOGLE_ID: z.string().optional(),
    AUTH_GOOGLE_SECRET: z.string().optional(),
    AUTH_GOOGLE_CODE_VERIFIER: z.string().optional(),
  },
  runtimeEnv: {
    NODE_ENV: process.env['NODE_ENV'],
    PORT: process.env['PORT'],

    DATABASE_URL: process.env['DATABASE_URL'],

    UPLOADTHING_SECRET: process.env['UPLOADTHING_SECRET'],
    UPLOADTHING_APP_ID: process.env['UPLOADTHING_APP_ID'],

    UNKEY_ROOT_KEY: process.env['UNKEY_ROOT_KEY'],
    UNKEY_NAMESPACE: process.env['UNKEY_NAMESPACE'],

    AUTH_GITHUB_ID: process.env['AUTH_GITHUB_ID'],
    AUTH_GITHUB_SECRET: process.env['AUTH_GITHUB_SECRET'],

    AUTH_GOOGLE_ID: process.env['AUTH_GOOGLE_ID'],
    AUTH_GOOGLE_SECRET: process.env['AUTH_GOOGLE_SECRET'],
    AUTH_GOOGLE_CODE_VERIFIER: process.env['AUTH_GOOGLE_CODE_VERIFIER'],
  },
  emptyStringAsUndefined: true,
  skipValidation: !!process.env['SKIP_ENV_VALIDATION'],
});
