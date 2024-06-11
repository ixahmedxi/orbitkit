import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';
import { sharedEnv } from '../shared';

export const env = createEnv({
  extends: [sharedEnv],
  server: {},
  client: {
    PUBLIC_POSTHOG_KEY: z.string().optional(),
    PUBLIC_POSTHOG_HOST: z.string().optional(),
  },
  clientPrefix: 'PUBLIC_',
  runtimeEnv: import.meta.env,
  skipValidation: !!import.meta.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
