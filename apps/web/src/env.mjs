import { env as dbEnv } from '@orbitkit/db/env';
import { createEnv } from '@t3-oss/env-nextjs';
import { vercel } from '@t3-oss/env-nextjs/presets';

export const env = createEnv({
  extends: [dbEnv, vercel],
  server: {},
  client: {},
  runtimeEnv: {},
  emptyStringAsUndefined: true,
});
