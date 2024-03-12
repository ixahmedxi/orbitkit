import { type Meta, type StoryObj } from '@storybook/react';

import { Progress } from '.';

const meta: Meta<typeof Progress> = {
  component: Progress,
  args: {
    value: 66,
  },
};

export default meta;

type Story = StoryObj<typeof Progress>;

export const Default: Story = {};
