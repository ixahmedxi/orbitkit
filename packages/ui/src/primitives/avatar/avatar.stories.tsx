import type { Meta, StoryObj } from '@storybook/react';

import { Avatar, AvatarFallback, AvatarImage } from './';

const meta: Meta<typeof AvatarImage> = {
  component: AvatarImage,
  args: {
    src: 'https://github.com/shadcn.png',
    alt: '@shadcn',
  },
  render: (args) => (
    <Avatar>
      <AvatarImage {...args} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
};

export default meta;
type Story = StoryObj<typeof AvatarImage>;

export const Default: Story = {};

export const Fallback: Story = {
  args: {
    src: '',
  },
};
