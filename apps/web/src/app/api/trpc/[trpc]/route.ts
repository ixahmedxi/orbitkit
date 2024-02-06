import { type NextRequest } from 'next/server';

import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

import { appRouter, createTRPCContext } from '@orbitkit/trpc';

import { env } from '@/env';

const createContext = async (req: NextRequest) => {
  return createTRPCContext({
    headers: req.headers,
  });
};

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => createContext(req),
    onError: ({ path, error }) => {
      env.NODE_ENV === 'development' &&
        console.error(
          `❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`,
        );
    },
  });

export { handler as GET, handler as POST };
