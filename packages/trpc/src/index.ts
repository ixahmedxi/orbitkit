import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server';

import { greetingRouter } from './routers/greeting';
import { router } from './trpc';

export const appRouter = router({
  greeting: greetingRouter,
});

export type AppRouter = typeof appRouter;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;

export { createTRPCContext } from './trpc';
