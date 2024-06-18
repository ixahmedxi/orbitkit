import 'dotenv/config'

import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import sentry from '@sentry/astro'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [
    mdx(),
    sitemap(),
    tailwind({ applyBaseStyles: false }),
    react(),
    sentry({
      dsn: import.meta.env['PUBLIC_SENTRY_DSN'] as string,
      sourceMapsUploadOptions: {
        org: import.meta.env['SENTRY_ORG'] as string,
        project: import.meta.env['SENTRY_PROJECT'] as string,
        authToken: import.meta.env['SENTRY_AUTH_TOKEN'] as string,
      },
    }),
  ],
})
