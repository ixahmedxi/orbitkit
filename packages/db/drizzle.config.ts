import type { Config } from 'drizzle-kit';

import { env } from './src/env.mjs';

export default {
  schema: './src/schema/index.ts',
  out: './drizzle',
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
  driver: 'pg',
} satisfies Config;
