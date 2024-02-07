import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server';

import { type AppRouter } from '@orbitkit/trpc';

import { env } from '@/env';

function getBaseUrl() {
  if (typeof window !== 'undefined') return '';
  if (env.VERCEL_URL) return `https://${env.VERCEL_URL}`;
  return `http://localhost:${env.PORT}`;
}

export function getUrl() {
  return getBaseUrl() + '/api/trpc';
}

export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
