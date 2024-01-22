import aspectRatio from '@tailwindcss/aspect-ratio';
import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import animate from 'tailwindcss-animate';

import { type Config } from 'tailwindcss';

export const orbitKitTailwindPreset: Config = {
  content: ['./src/**/*.{js,jsx,ts,tsx,mdx}'],
  theme: {
    extend: {},
  },
  plugins: [
    animate,
    typography,
    forms,
    aspectRatio,
    {
      config: containerQueries.config ?? {},
      handler: containerQueries.handler,
    },
  ],
};
