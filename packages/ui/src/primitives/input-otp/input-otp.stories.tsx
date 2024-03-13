import { type Meta, type StoryObj } from '@storybook/react';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';

import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '.';

const meta: Meta<typeof InputOTP> = {
  component: InputOTP,
  args: {
    maxLength: 6,
    render: ({ slots }) => (
      <>
        <InputOTPGroup>
          {slots.slice(0, 3).map((slot, index) => (
            <InputOTPSlot key={index} {...slot} />
          ))}
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          {slots.slice(3).map((slot, index) => (
            <InputOTPSlot key={index + 3} {...slot} />
          ))}
        </InputOTPGroup>
      </>
    ),
  },
};

export default meta;

type Story = StoryObj<typeof InputOTP>;

export const Default: Story = {};

export const Pattern: Story = {
  args: {
    pattern: REGEXP_ONLY_DIGITS_AND_CHARS,
  },
};
