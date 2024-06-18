import {
  ChevronRightIcon,
  EnvelopeOpenIcon,
  ReloadIcon,
} from '@radix-ui/react-icons'
import { type Meta, type StoryObj } from '@storybook/react'

import { Button } from './'

const meta: Meta<typeof Button> = {
  component: Button,
  args: {
    children: 'Button',
    variant: 'default',
  },
  argTypes: {
    variant: {
      options: [
        'default',
        'secondary',
        'destructive',
        'outline',
        'ghost',
        'link',
      ],
      control: { type: 'select' },
    },
    asChild: {
      control: {
        disable: true,
      },
    },
    size: {
      options: ['default', 'sm', 'lg', 'icon'],
      control: { type: 'select' },
    },
  },
}

export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {}
export const Secondary: Story = { args: { variant: 'secondary' } }
export const Destructive: Story = { args: { variant: 'destructive' } }
export const Outline: Story = { args: { variant: 'outline' } }
export const Ghost: Story = { args: { variant: 'ghost' } }
export const Link: Story = { args: { variant: 'link' } }

export const Icon: Story = {
  args: {
    variant: 'outline',
    size: 'icon',
    children: (
      <>
        <ChevronRightIcon className='size-4' />
      </>
    ),
  },
  argTypes: {
    children: { control: { disable: true } },
  },
}

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <EnvelopeOpenIcon className='mr-2 size-4' /> Login with Email
      </>
    ),
  },
  argTypes: {
    children: { control: { disable: true } },
  },
}

export const Loading: Story = {
  args: {
    variant: 'secondary',
    disabled: true,
    children: (
      <>
        <ReloadIcon className='mr-2 size-4 animate-spin' />
        Please wait
      </>
    ),
  },
  argTypes: {
    children: { control: { disable: true } },
  },
}
