import { type Meta, type StoryObj } from '@storybook/react';
import { expect } from '@storybook/test';
import { within } from '@storybook/testing-library';

import { Typography } from './';

const meta: Meta<typeof Typography> = {
  component: Typography,
  args: {
    variant: 'p',
    children: 'The big brown fox jumps over the lazy dog.',
  },
  argTypes: {
    className: {
      control: { disable: true },
    },
    as: {
      control: { disable: true },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText('The big brown fox jumps over the lazy dog.'),
    ).toBeInTheDocument();
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const H1: Story = {
  name: 'Heading1',
  args: {
    variant: 'h1',
  },
};

export const H2: Story = {
  name: 'Heading2',
  args: {
    variant: 'h2',
  },
};

export const H3: Story = {
  name: 'Heading3',
  args: {
    variant: 'h3',
  },
};

export const H4: Story = {
  name: 'Heading4',
  args: {
    variant: 'h4',
  },
};

export const P: Story = {
  args: {
    variant: 'p',
  },
};

export const Blockquote: Story = {
  args: {
    variant: 'blockquote',
  },
};

export const Ul: Story = {
  args: {
    variant: 'ul',
    children: (
      <>
        <li>One</li>
        <li>Two</li>
        <li>Three</li>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('One')).toBeInTheDocument();
  },
};

export const Ol: Story = {
  args: {
    variant: 'ol',
    children: (
      <>
        <li>One</li>
        <li>Two</li>
        <li>Three</li>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('One')).toBeInTheDocument();
  },
};

export const Code: Story = {
  args: {
    variant: 'code',
    children: 'console.log("Hello, World!");',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText('console.log("Hello, World!");'),
    ).toBeInTheDocument();
  },
};

export const Lead: Story = {
  args: {
    variant: 'lead',
  },
};

export const Large: Story = {
  args: {
    variant: 'large',
  },
};

export const Small: Story = {
  args: {
    variant: 'small',
  },
};

export const Muted: Story = {
  args: {
    variant: 'muted',
  },
};
