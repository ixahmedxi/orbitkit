import { fileURLToPath } from 'node:url';

import createJiti from 'jiti';

const jiti = createJiti(fileURLToPath(import.meta.url));

jiti('@orbitkit/env/web/server');

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@orbitkit/db', '@orbitkit/auth', '@orbitkit/env'],
};

export default nextConfig;
