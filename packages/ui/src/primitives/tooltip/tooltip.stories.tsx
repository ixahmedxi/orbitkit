import { type Meta, type StoryObj } from '@storybook/react';

import { Button } from '../button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './';

const meta: Meta<typeof TooltipContent> = {
  component: TooltipContent,
  args: {
    children: 'This is a tooltip.',
  },
  render: (args) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover</Button>
        </TooltipTrigger>
        <TooltipContent {...args} />
      </Tooltip>
    </TooltipProvider>
  ),
};

export default meta;

type Story = StoryObj<typeof TooltipContent>;

export const Default: Story = {};
