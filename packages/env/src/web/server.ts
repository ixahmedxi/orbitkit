import { createEnv } from '@t3-oss/env-nextjs';
import { vercel } from '@t3-oss/env-nextjs/presets';
import { z } from 'zod';

export const env = createEnv({
  extends: [vercel()],
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']).optional(),
    PORT: z.coerce.number().default(3000),

    DATABASE_URL: z.string().url().startsWith('postgres'),

    UPLOADTHING_SECRET: z.string(),
    UPLOADTHING_APP_ID: z.string(),

    UNKEY_ROOT_KEY: z.string().optional(),
    UNKEY_NAMESPACE: z.string().optional(),

    AUTH_SECRET: z.string(),

    AUTH_GITHUB_ID: z.string().optional(),
    AUTH_GITHUB_SECRET: z.string().optional(),
  },
  experimental__runtimeEnv: {},
  emptyStringAsUndefined: true,
  skipValidation: !!process.env['SKIP_ENV_VALIDATION'],
});
