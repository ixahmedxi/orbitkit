import type { Config } from 'tailwindcss';

import { orbitKitTailwindPreset } from '@orbitkit/tailwind';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx,astro}',
    '../../packages/ui/dist/**/*.js',
  ],
  darkMode: 'class',
  presets: [orbitKitTailwindPreset],
};

export default config;
