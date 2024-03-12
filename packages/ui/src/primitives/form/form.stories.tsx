import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { type Meta, type StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/primitives/button';
import { Input } from '@/primitives/input';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '.';
import { Typography } from '../typography';

const formSchema = z.object({
  username: z.string().min(2).max(50),
});

const meta: Meta<typeof Form> = {
  component: Form,
  render: (args) => {
    const [username, setUsername] = useState('');
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: '',
      },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
      console.log(values);
      setUsername(values.username);
    }

    return (
      <Form {...args} {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
        {username && (
          <Typography variant="muted" className="mt-6">
            You have submitted: {username}
          </Typography>
        )}
      </Form>
    );
  },
};

export default meta;

type Story = StoryObj<typeof Form>;

export const Default: Story = {};
