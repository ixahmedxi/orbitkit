import { type FC } from 'react';

import type { ToastArgs } from './use-toast';

import { type Meta, type StoryObj } from '@storybook/react';

import { Button } from '@/primitives/button';

import { ToastAction } from './toast';
import { Toaster } from './toaster';
import { useToast } from './use-toast';

const ToastDemo: FC<ToastArgs> = (props) => {
  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast(props);
      }}
    >
      Show Toast
    </Button>
  );
};

const meta: Meta<typeof ToastDemo> = {
  component: ToastDemo,
  args: {
    variant: 'default',
    title: 'Scheduled: Catch up',
    description: 'Friday, February 10, 2023 at 5:57 PM',
  },
  argTypes: {
    action: { control: { disable: true } },
    variant: {
      options: ['default', 'destructive'],
      control: { type: 'select' },
    },
  },
  render: (args) => (
    <div>
      <ToastDemo {...args} />
      <Toaster />
    </div>
  ),
};

export default meta;

type Story = StoryObj<typeof ToastDemo>;

export const Default: Story = {};

export const Simple: Story = {
  args: {
    title: '',
    description: 'Your message has been sent.',
  },
};

export const WithTitle: Story = {
  args: {
    title: 'Uh oh! Something went wrong.',
    description: 'There was a problem with your request.',
  },
};

export const WithAction: Story = {
  args: {
    title: 'Uh oh! Something went wrong.',
    description: 'There was a problem with your request.',
    action: <ToastAction altText="Try again">Try again</ToastAction>,
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    title: 'Uh oh! Something went wrong.',
    description: 'There was a problem with your request.',
    action: <ToastAction altText="Try again">Try again</ToastAction>,
  },
};
