import './src/env.js';

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@orbitkit/db', '@orbitkit/auth'],
};

export default nextConfig;
