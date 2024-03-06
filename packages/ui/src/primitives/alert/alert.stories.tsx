import { type FC } from 'react';

import { type Meta, type StoryObj } from '@storybook/react';
import { Terminal } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from './';

type ComponentProps = {
  variant: 'default' | 'destructive';
  title: string;
  description: string;
};

const Component: FC<ComponentProps> = ({ title, description, variant }) => {
  return (
    <Alert variant={variant}>
      <Terminal className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

const meta: Meta<typeof Component> = {
  title: 'Primitives / Alert',
  component: Component,
  args: {
    title: 'Heads up!',
    description:
      'You can add components and dependencies to your app using the cli.',
    variant: 'default',
  },
};

export default meta;

type Story = StoryObj<typeof Component>;

export const Default: Story = {};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
  },
};
