import './globals.css';

import type { Preview } from '@storybook/react';

import { withThemeByClassName } from '@storybook/addon-themes';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { ReactRenderer } from '@storybook/react';

const customViewports = {
  '720p': {
    name: '720p',
    styles: {
      width: '1280px',
      height: '720px',
    },
  },
  '1080p': {
    name: '1080p',
    styles: {
      width: '1920px',
      height: '1080px',
    },
  },
  '2k': {
    name: '2K',
    styles: {
      width: '2560px',
      height: '1440px',
    },
  },
  '4k': {
    name: '4K',
    styles: {
      width: '3840px',
      height: '2160px',
    },
  },
  '21/9': {
    name: '21/9',
    styles: {
      width: '2560px',
      height: '1080px',
    },
  },
};

const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        ...customViewports,
        ...INITIAL_VIEWPORTS,
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
