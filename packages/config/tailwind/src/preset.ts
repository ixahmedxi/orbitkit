import aspectRatio from '@tailwindcss/aspect-ratio';
import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import animate from 'tailwindcss-animate';
import { createPlugin } from 'windy-radix-palette';
import windyTypography from 'windy-radix-typography';

import { type Config } from 'tailwindcss';

const colors = createPlugin();

export const orbitKitTailwindPreset: Config = {
  content: ['./src/**/*.{js,jsx,ts,tsx,mdx}'],
  presets: [windyTypography],
  theme: {
    extend: {
      colors: {
        background: colors.alias('gray.1'),
        foreground: colors.alias('gray.12'),

        muted: colors.alias('gray.4'),
        'muted-foreground': colors.alias('gray.11'),

        card: colors.alias('gray.1'),
        'card-foreground': colors.alias('gray.12'),

        popover: colors.alias('gray.1'),
        'popover-foreground': colors.alias('gray.12'),

        input: colors.alias('gray.2'),

        primary: colors.alias('crimson.9'),
        'primary-foreground': colors.alias('crimson.1'),

        secondary: colors.alias('blue.9'),
        'secondary-foreground': colors.alias('blue.1'),

        accent: colors.alias('gray.5'),
        'accent-foreground': colors.alias('gray.12'),

        destructive: colors.alias('red.9'),
        'destructive-foreground': colors.alias('red.1'),

        border: colors.alias('gray.6'),
        ring: colors.alias('gray.6'),
      },
      borderRadius: {
        radius: '0.5rem',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
    },
  },
  plugins: [
    animate,
    typography,
    forms,
    aspectRatio,
    {
      config: colors.plugin.config ?? {},
      handler: colors.plugin.handler,
    },
    {
      config: containerQueries.config ?? {},
      handler: containerQueries.handler,
    },
  ],
};
