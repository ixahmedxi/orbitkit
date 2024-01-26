import './src/env.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@orbitkit/db'],
};

export default nextConfig;
