import './src/env.js';

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@orbitkit/db', '@orbitkit/auth', '@orbitkit/trpc'],
};

export default nextConfig;
