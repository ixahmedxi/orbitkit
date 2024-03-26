import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

import { env } from '@orbitkit/env/web/server';

const sql = postgres(env.DATABASE_URL, { max: 1 });
const db = drizzle(sql);

const main = async () => {
  try {
    await migrate(db, { migrationsFolder: 'drizzle' });
    await sql.end();
    console.log(`🚀 Successfully migrated database!`);
  } catch (err) {
    console.error('😪 Error migrating database:', err);
    process.exit(1);
  }
};

void main();
