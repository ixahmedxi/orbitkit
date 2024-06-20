import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

import { sharedEnv } from '../shared'
import { env as dbEnv } from './db'

export const env = createEnv({
  extends: [sharedEnv, dbEnv],
  shared: {
    PORT: z.coerce.number().default(3000),
  },
  server: {
    UPLOADTHING_APP_ID: z.string(),
    UPLOADTHING_SECRET: z.string(),

    UNKEY_ROOT_KEY: z.string().optional(),
    UNKEY_NAMESPACE: z.string().optional(),

    AUTH_SECRET: z.string(),

    AUTH_GITHUB_ID: z.string().optional(),
    AUTH_GITHUB_SECRET: z.string().optional(),

    AUTH_GOOGLE_ID: z.string().optional(),
    AUTH_GOOGLE_SECRET: z.string().optional(),

    SENTRY_ORG: z.string(),
    SENTRY_PROJECT: z.string(),
    SENTRY_AUTH_TOKEN: z.string(),
  },
  experimental__runtimeEnv: {
    PORT: process.env['PORT'],
  },
  emptyStringAsUndefined: true,
  skipValidation: !!process.env['SKIP_ENV_VALIDATION'],
})
