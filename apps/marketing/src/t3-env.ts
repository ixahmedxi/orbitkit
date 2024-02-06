import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'production', 'test']).optional(),
  },
  clientPrefix: 'PUBLIC_',
  client: {},
  runtimeEnv: import.meta.env,
  skipValidation: import.meta.env['SKIP_ENV_VALIDATION'] === 'development',
  emptyStringAsUndefined: true,
});
