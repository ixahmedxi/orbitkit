import { greetingRouter } from './routers/greeting';
import { router } from './trpc';

export const appRouter = router({
  greeting: greetingRouter,
});

export type AppRouter = typeof appRouter;

export { createTRPCContext } from './trpc';
