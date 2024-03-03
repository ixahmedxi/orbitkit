import { type Meta, type StoryObj } from '@storybook/react';

import { Label } from './label';

const meta: Meta<typeof Label> = {
  title: 'Primitives / Label',
  component: Label,
  args: {
    children: 'Label',
  },
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {};
