import { type Meta, type StoryObj } from '@storybook/react';

import { Badge } from './';

const meta: Meta<typeof Badge> = {
  component: Badge,
  args: {
    variant: 'default',
    children: 'Badge',
  },
  argTypes: {
    variant: {
      options: ['default', 'secondary', 'destructive', 'outline'],
      control: { type: 'select' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {};
export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};
export const Destructive: Story = {
  args: {
    variant: 'destructive',
  },
};
export const Outline: Story = {
  args: {
    variant: 'outline',
  },
};
