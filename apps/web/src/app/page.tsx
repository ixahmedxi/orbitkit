import { redirect } from 'next/navigation';

import { getSession } from '@orbitkit/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@orbitkit/ui/avatar';

import { trpc } from '@/lib/trpc/server';

export default async function Home() {
  const { user } = await getSession();
  if (!user) {
    return redirect('/login');
  }

  const hello = await trpc.greeting.hello.query({ name: 'John' });

  return (
    <main className="container mx-auto py-6 px-6">
      <h1>Next.js app</h1>
      <h1>{hello.greeting}</h1>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </main>
  );
}
