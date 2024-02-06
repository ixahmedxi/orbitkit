import { createEnv } from '@t3-oss/env-nextjs';
import { vercel } from '@t3-oss/env-nextjs/presets';
import { z } from 'zod';

import { env as authEnv } from '@orbitkit/auth/env';
import { env as dbEnv } from '@orbitkit/db/env';

export const env = createEnv({
  extends: [dbEnv, authEnv, vercel],
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']).optional(),
    PORT: z.coerce.number().default(3000),
  },
  client: {},
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env['PORT'],
  },
  emptyStringAsUndefined: true,
});
