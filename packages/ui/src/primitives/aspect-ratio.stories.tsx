import { type FC } from 'react';

import { type Meta, type StoryObj } from '@storybook/react';

import { AspectRatio } from './aspect-ratio';

type ComponentProps = {
  ratio: number;
};

const Component: FC<ComponentProps> = ({ ratio }) => {
  return (
    <div className="w-[400px]">
      <AspectRatio ratio={ratio} className="bg-muted">
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="By Drew Beamer"
          className="rounded-md object-cover"
        />
      </AspectRatio>
    </div>
  );
};

const meta: Meta<typeof Component> = {
  title: 'Primitives / Aspect Ratio',
  component: Component,
  args: {
    ratio: 16 / 9,
  },
};

export default meta;

type Story = StoryObj<typeof Component>;

export const Default: Story = {};
