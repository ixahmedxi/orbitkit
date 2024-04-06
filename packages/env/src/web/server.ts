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

    GITHUB_ID: z.string(),
    GITHUB_SECRET: z.string(),

    GOOGLE_ID: z.string(),
    GOOGLE_SECRET: z.string(),
    GOOGLE_CODE_VERIFIER: z.string(),
  },
  runtimeEnv: {
    NODE_ENV: process.env['NODE_ENV'],
    PORT: process.env['PORT'],

    DATABASE_URL: process.env['DATABASE_URL'],

    UPLOADTHING_SECRET: process.env['UPLOADTHING_SECRET'],
    UPLOADTHING_APP_ID: process.env['UPLOADTHING_APP_ID'],

    UNKEY_ROOT_KEY: process.env['UNKEY_ROOT_KEY'],

    GITHUB_ID: process.env['GITHUB_ID'],
    GITHUB_SECRET: process.env['GITHUB_SECRET'],

    GOOGLE_ID: process.env['GOOGLE_ID'],
    GOOGLE_SECRET: process.env['GOOGLE_SECRET'],
    GOOGLE_CODE_VERIFIER: process.env['GOOGLE_CODE_VERIFIER'],
  },
  emptyStringAsUndefined: true,
  skipValidation: !!process.env['SKIP_ENV_VALIDATION'],
});
