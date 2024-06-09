import { createEnv } from '@t3-oss/env-core';
import { sharedEnv } from '../shared';

export const env = createEnv({
  extends: [sharedEnv],
  server: {},
  client: {},
  clientPrefix: 'PUBLIC_',
  runtimeEnv: import.meta.env,
  skipValidation: !!import.meta.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
