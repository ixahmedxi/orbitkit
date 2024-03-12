import { type Meta, type StoryObj } from '@storybook/react';

import { Skeleton } from '.';

const meta: Meta<typeof Skeleton> = {
  component: Skeleton,
  render: (args) => (
    <div className="flex items-center space-x-4">
      <Skeleton {...args} className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ),
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {};

export const Card: Story = {
  render: (args) => (
    <div className="flex flex-col space-y-3">
      <Skeleton {...args} className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ),
};
