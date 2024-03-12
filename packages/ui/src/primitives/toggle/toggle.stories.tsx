import { FontBoldIcon, FontItalicIcon } from '@radix-ui/react-icons';
import { type Meta, type StoryObj } from '@storybook/react';

import { Toggle } from '.';

const meta: Meta<typeof Toggle> = {
  component: Toggle,
  args: {
    'aria-label': 'Toggle bold',
    children: <FontBoldIcon className="h-4 w-4" />,
    size: 'default',
    variant: 'default',
  },
  argTypes: {
    children: { control: { disable: true } },
    asChild: { control: { disable: true } },
    size: {
      options: ['default', 'sm', 'lg'],
      control: { type: 'select' },
    },
    variant: {
      options: ['default', 'outline'],
      control: { type: 'select' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Toggle>;

export const Default: Story = {};
export const Outline: Story = { args: { variant: 'outline' } };
export const WithText: Story = {
  args: {
    children: (
      <>
        <FontItalicIcon className="h-4 w-4 mr-2" />
        Italic
      </>
    ),
  },
};
export const Small: Story = { args: { size: 'sm' } };
export const Large: Story = { args: { size: 'lg' } };
export const Disabled: Story = { args: { disabled: true } };
