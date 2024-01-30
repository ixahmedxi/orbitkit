import { createEnv } from '@t3-oss/env-nextjs';
import { vercel } from '@t3-oss/env-nextjs/presets';

import { env as authEnv } from '@orbitkit/auth/env';
import { env as dbEnv } from '@orbitkit/db/env';

export const env = createEnv({
  extends: [dbEnv, authEnv, vercel],
  server: {},
  client: {},
  runtimeEnv: {},
  emptyStringAsUndefined: true,
});
