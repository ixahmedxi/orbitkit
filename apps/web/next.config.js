import { fileURLToPath } from 'node:url'

import bundleAnalyzerPlugin from '@next/bundle-analyzer'
import createJiti from 'jiti'

const jiti = createJiti(fileURLToPath(import.meta.url))

jiti('@orbitkit/env/web/server')
jiti('@orbitkit/env/web/client')

const withBundleAnalyzer = bundleAnalyzerPlugin({
  enabled: process.env['ANALYZE'] === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@orbitkit/env'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    typedRoutes: true,
  },
}

export default withBundleAnalyzer(nextConfig)
