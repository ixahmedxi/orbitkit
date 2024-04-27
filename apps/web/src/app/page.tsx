import { $path } from 'next-typesafe-url';
import { redirect } from 'next/navigation';

import { auth, signOut } from '@orbitkit/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@orbitkit/ui/avatar';

import { ThemeSwitcher } from '@/components/ThemeSwitcher';

import { ShowToast } from './show-toast';
import { UploadExample } from './upload';

export default async function Home() {
  const session = await auth();
  if (!session?.user) {
    return redirect($path({ route: '/sign-in' }));
  }

  return (
    <main className="container mx-auto py-6 px-6">
      <div className="flex items-center justify-between min-h-[37.8px]">
        <h1>Next.js app, your user id is {session.user.id}</h1>
        <ThemeSwitcher />
      </div>
      {session.user.name && (
        <Avatar>
          <AvatarImage src={session.user.image ?? ''} alt={session.user.name} />
          <AvatarFallback>
            {session.user.name
              .split(' ')
              .map((w) => w[0])
              .join('')}
          </AvatarFallback>
        </Avatar>
      )}
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <button type="submit">Logout</button>
      </form>
      <ShowToast />
      <UploadExample />
    </main>
  );
}
