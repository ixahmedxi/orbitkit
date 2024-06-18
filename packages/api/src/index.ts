import { helloRouter } from './routers/hello'
import { createCallerFactory, createRouter } from './trpc'

export const appRouter = createRouter({
  hello: helloRouter,
})

export type AppRouter = typeof appRouter

export const createCaller = createCallerFactory(appRouter)

export { createTRPCContext } from './trpc'
