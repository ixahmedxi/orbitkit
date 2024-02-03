import './globals.css';

import type { Preview } from '@storybook/react';

import { withThemeByClassName } from '@storybook/addon-themes';
import { ReactRenderer } from '@storybook/react';

const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    withThemeByClassName<ReactRenderer>({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
} satisfies Preview;

export default preview;
