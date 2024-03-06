import { type FC } from 'react';

import { type Meta, type StoryObj } from '@storybook/react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './';

type ComponentProps = {
  type: 'single' | 'multiple';
  collapsible: boolean;
  itemTrigger: string;
  itemContent: string;
};

const Component: FC<ComponentProps> = ({
  type,
  collapsible,
  itemTrigger,
  itemContent,
}) => {
  return (
    <Accordion type={type} collapsible={collapsible} className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>{itemTrigger}</AccordionTrigger>
        <AccordionContent>{itemContent}</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other
          components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It&apos;s animated by default, but you can disable it if you
          prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const meta: Meta<typeof Component> = {
  title: 'Primitives / Accordion',
  component: Component,
  args: {
    type: 'single',
    collapsible: true,
    itemTrigger: 'Is it accessible?',
    itemContent: 'Yes. It adheres to the WAI-ARIA design pattern',
  },
  argTypes: {
    type: {
      options: ['single', 'multiple'],
      control: {
        type: 'select',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Component>;

export const Single: Story = {};

export const Multiple: Story = {
  args: {
    type: 'multiple',
  },
};
