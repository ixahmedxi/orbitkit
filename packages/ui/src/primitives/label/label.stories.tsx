import { type Meta, type StoryObj } from '@storybook/react';

import { Label } from './';

const meta: Meta<typeof Label> = {
  component: Label,
  args: {
    children: 'Label',
  },
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {};
