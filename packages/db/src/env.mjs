import { createEnv } from '@t3-oss/env-core';
import { vercel } from '@t3-oss/env-core/presets';
import { z } from 'zod';

export const env = createEnv({
  extends: [vercel],
  server: {
    DATABASE_URL: z.string().url().startsWith('postgres'),
  },
  runtimeEnv: {
    DATABASE_URL: process.env['DATABASE_URL'],
  },
  emptyStringAsUndefined: true,
});
