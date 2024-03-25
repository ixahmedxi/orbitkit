import type { Config } from 'tailwindcss';

import { withUt } from 'uploadthing/tw';

import { orbitKitTailwindPreset } from '@orbitkit/tailwind';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', '../../packages/ui/dist/**/*.js'],
  darkMode: 'class',
  presets: [orbitKitTailwindPreset],
};

export default withUt(config);
