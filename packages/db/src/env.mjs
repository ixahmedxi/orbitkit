import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
  },
  client: {},
  runtimeEnv: {
    DATABASE_URL: process.env['DATABASE_URL'],
  },
});
