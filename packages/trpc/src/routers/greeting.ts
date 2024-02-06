import { z } from 'zod';

import { protectedProcedure, publicProcedure, router } from '../trpc';

export const greetingRouter = router({
  hello: publicProcedure
    .input(z.object({ name: z.string().optional() }).optional())
    .query(({ input }) => {
      return {
        greeting: `Hello, ${input?.name ?? 'World'}!`,
      };
    }),

  protectedHello: protectedProcedure
    .input(z.object({ name: z.string().optional() }).optional())
    .query(({ input, ctx }) => {
      return {
        greeting: `Hello, ${input?.name ?? 'World'}! Your user ID is ${ctx.session.user.id}`,
      };
    }),
});
