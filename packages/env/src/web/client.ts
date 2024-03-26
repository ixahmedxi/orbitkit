import { createEnv } from '@t3-oss/env-nextjs';

export const env = createEnv({
  client: {
    // define your client environment variables here
  },
  runtimeEnv: {},
  emptyStringAsUndefined: true,
  skipValidation: !!process.env['SKIP_ENV_VALIDATION'],
});
