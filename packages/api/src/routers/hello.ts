import { createRouter, protectedProcedure } from '../trpc'

export const helloRouter = createRouter({
  protected: protectedProcedure.query(({ ctx }) => {
    return {
      message: `Hello, ${ctx.user.name ?? 'world'} from tRPC!`,
    }
  }),
})
