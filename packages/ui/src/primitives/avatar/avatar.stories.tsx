import { type FC } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Avatar, AvatarFallback, AvatarImage } from './';

const DemoComponent: FC<{ src: string; alt: string; fallback: string }> = ({
  src,
  alt,
  fallback,
}) => (
  <Avatar>
    <AvatarImage src={src} alt={alt} />
    <AvatarFallback>{fallback}</AvatarFallback>
  </Avatar>
);

const meta: Meta<typeof DemoComponent> = {
  title: 'Primitives / Avatar',
  component: DemoComponent,
  args: {
    src: 'https://github.com/shadcn.png',
    alt: '@shadcn',
    fallback: 'CN',
  },
};

export default meta;
type Story = StoryObj<typeof DemoComponent>;

export const Default: Story = {};

export const Fallback: Story = {
  args: {
    src: '',
  },
};
