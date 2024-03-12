import { type Meta, type StoryObj } from '@storybook/react';

import { Textarea } from '.';
import { Button } from '../button';
import { Label } from '../label';
import { Typography } from '../typography';

const meta: Meta<typeof Textarea> = {
  component: Textarea,
  args: {
    placeholder: 'Type your message here.',
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
export const WithLabel: Story = {
  args: {
    id: 'message',
  },
  render: (args) => (
    <div className="grid w-full gap-1.5">
      <Label htmlFor={args.id}>Your Message</Label>
      <Textarea {...args} />
    </div>
  ),
};

export const WithText: Story = {
  args: {
    id: 'message',
  },
  render: (args) => (
    <div className="grid w-full gap-1.5">
      <Label htmlFor={args.id}>Your Message</Label>
      <Textarea {...args} />
      <Typography variant="muted">
        Your message will be copied to the support team.
      </Typography>
    </div>
  ),
};

export const WithButton: Story = {
  render: (args) => (
    <div className="grid w-full gap-2">
      <Textarea {...args} />
      <Button>Send message</Button>
    </div>
  ),
};
