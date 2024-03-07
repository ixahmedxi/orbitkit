import { type ComponentProps } from 'react';

import type { FC } from 'react';

import {
  FontBoldIcon,
  FontItalicIcon,
  UnderlineIcon,
} from '@radix-ui/react-icons';
import { type Meta, type StoryObj } from '@storybook/react';

import { ToggleGroup, ToggleGroupItem } from '.';

type Props = ComponentProps<typeof ToggleGroup>;

const Component: FC<Props> = (props) => {
  return (
    <ToggleGroup {...props}>
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <FontBoldIcon className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <FontItalicIcon className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
        <UnderlineIcon className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

const meta: Meta<typeof Component> = {
  title: 'Primitives / Toggle Group',
  component: Component,
  args: {
    type: 'multiple',
    variant: 'default',
    size: 'default',
    disabled: false,
  },
  argTypes: {
    type: {
      options: ['single', 'multiple'],
      control: { type: 'select' },
    },
    variant: {
      options: ['default', 'outline'],
      control: { type: 'select' },
    },
    size: {
      options: ['default', 'sm', 'lg'],
      control: { type: 'select' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Component>;

export const Default: Story = {};
export const Outline: Story = { args: { variant: 'outline' } };
export const Single: Story = { args: { type: 'single' } };
export const Small: Story = { args: { size: 'sm' } };
export const Large: Story = { args: { size: 'lg' } };
export const Disabled: Story = { args: { disabled: true } };
