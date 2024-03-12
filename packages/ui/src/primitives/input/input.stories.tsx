import { type Meta, type StoryObj } from '@storybook/react';

import { Button } from '../button';
import { Label } from '../label';
import { Input } from './';

const meta: Meta<typeof Input> = {
  component: Input,
  args: {
    type: 'email',
    placeholder: 'Email',
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {};
export const File: Story = {
  args: {
    id: 'picture',
    type: 'file',
  },
  render: (args) => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Picture</Label>
      <Input {...args} />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithLabel: Story = {
  args: {
    id: 'email',
    placeholder: 'johndoe@example.com',
  },
  render: (args) => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email address</Label>
      <Input {...args} />
    </div>
  ),
};

export const WithButton: Story = {
  render: (args) => (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input {...args} />
      <Button type="submit">Subscribe</Button>
    </div>
  ),
};
