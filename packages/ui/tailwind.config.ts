import type { Config } from 'tailwindcss';

import { orbitKitTailwindPreset } from '@orbitkit/tailwind';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  presets: [orbitKitTailwindPreset],
};

export default config;
