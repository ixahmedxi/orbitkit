import NextAuth from 'next-auth';
import github from 'next-auth/providers/github';

import { DrizzleAdapter } from '@auth/drizzle-adapter';

import { db } from '@orbitkit/db';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [github],
});
