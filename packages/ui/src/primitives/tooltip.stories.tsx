import { type FC } from 'react';

import { type Meta, type StoryObj } from '@storybook/react';

import { Button } from './button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';

type ComponentProps = {
  content: string;
};

const Component: FC<ComponentProps> = ({ content }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const meta: Meta<typeof Component> = {
  title: 'Primitives / Tooltip',
  component: Component,
  args: {
    content: 'This is a tooltip.',
  },
};

export default meta;

type Story = StoryObj<typeof Component>;

export const Default: Story = {};
