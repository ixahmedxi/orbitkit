import {
  FontBoldIcon,
  FontItalicIcon,
  UnderlineIcon,
} from '@radix-ui/react-icons';
import { type Meta, type StoryObj } from '@storybook/react';

import { ToggleGroup, ToggleGroupItem } from '.';

const items = [
  {
    value: 'bold',
    'aria-label': 'Toggle bold',
    children: <FontBoldIcon className="h-4 w-4" />,
  },
  {
    value: 'italic',
    'aria-label': 'Toggle italic',
    children: <FontItalicIcon className="h-4 w-4" />,
  },
  {
    value: 'strikethrough',
    'aria-label': 'Toggle strikethrough',
    children: <UnderlineIcon className="h-4 w-4" />,
  },
];

const meta: Meta<typeof ToggleGroup> = {
  component: ToggleGroup,
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
  render: (args) => (
    <ToggleGroup {...args}>
      {items.map((item) => (
        <ToggleGroupItem key={item.value} {...item} />
      ))}
    </ToggleGroup>
  ),
};

export default meta;

type Story = StoryObj<typeof ToggleGroup>;

export const Default: Story = {};
export const Outline: Story = { args: { variant: 'outline' } };
export const Single: Story = { args: { type: 'single' } };
export const Small: Story = { args: { size: 'sm' } };
export const Large: Story = { args: { size: 'lg' } };
export const Disabled: Story = { args: { disabled: true } };
