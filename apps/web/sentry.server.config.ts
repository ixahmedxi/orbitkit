import * as Sentry from '@sentry/nextjs'

import { env } from '@orbitkit/env/web/client'

Sentry.init({
  dsn: env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1,
  debug: false,
})
