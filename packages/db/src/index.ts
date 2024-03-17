import type { NeonQueryFunction } from '@neondatabase/serverless';

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import { env } from './env.js';
import * as schema from './schema';

const sql: NeonQueryFunction<boolean, boolean> = neon(env.DATABASE_URL);

export const db = drizzle(sql, {
  schema,
  logger: env.NODE_ENV === 'development',
});
