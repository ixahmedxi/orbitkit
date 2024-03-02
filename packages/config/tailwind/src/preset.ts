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

        input: colors.alias('gray.3'),

        primary: {
          DEFAULT: colors.alias('crimson.10'),
          1: colors.alias('crimson.1'),
          2: colors.alias('crimson.2'),
          3: colors.alias('crimson.3'),
          4: colors.alias('crimson.4'),
          5: colors.alias('crimson.5'),
          6: colors.alias('crimson.6'),
          7: colors.alias('crimson.7'),
          8: colors.alias('crimson.8'),
          9: colors.alias('crimson.9'),
          10: colors.alias('crimson.10'),
          11: colors.alias('crimson.11'),
          12: colors.alias('crimson.12'),
        },
        'primary-foreground': colors.alias('crimson.1'),

        secondary: {
          DEFAULT: colors.alias('blue.10'),
          1: colors.alias('blue.1'),
          2: colors.alias('blue.2'),
          3: colors.alias('blue.3'),
          4: colors.alias('blue.4'),
          5: colors.alias('blue.5'),
          6: colors.alias('blue.6'),
          7: colors.alias('blue.7'),
          8: colors.alias('blue.8'),
          9: colors.alias('blue.9'),
          10: colors.alias('blue.10'),
          11: colors.alias('blue.11'),
          12: colors.alias('blue.12'),
        },
        'secondary-foreground': colors.alias('blue.1'),

        accent: colors.alias('gray.4'),
        'accent-foreground': colors.alias('gray.12'),

        destructive: {
          DEFAULT: colors.alias('red.10'),
          1: colors.alias('red.1'),
          2: colors.alias('red.2'),
          3: colors.alias('red.3'),
          4: colors.alias('red.4'),
          5: colors.alias('red.5'),
          6: colors.alias('red.6'),
          7: colors.alias('red.7'),
          8: colors.alias('red.8'),
          9: colors.alias('red.9'),
          10: colors.alias('red.10'),
          11: colors.alias('red.11'),
          12: colors.alias('red.12'),
        },
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
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
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
