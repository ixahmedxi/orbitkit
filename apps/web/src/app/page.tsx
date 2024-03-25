import { $path } from 'next-typesafe-url';
import { redirect } from 'next/navigation';

import { getSession } from '@orbitkit/auth';
import { logout } from '@orbitkit/auth/actions/logout';
import { Avatar, AvatarFallback, AvatarImage } from '@orbitkit/ui/avatar';

import { ThemeSwitcher } from '@/components/ThemeSwitcher';

import { ShowToast } from './show-toast';

export default async function Home() {
  const { user } = await getSession();
  if (!user) {
    return redirect($path({ route: '/login' }));
  }

  return (
    <main className="container mx-auto py-6 px-6">
      <h1>Next.js app, your user id is {user.id}</h1>
      <ThemeSwitcher />
      <Avatar>
        <AvatarImage src={user.avatarUrl} alt={user.name} />
        <AvatarFallback>
          {user.name
            ?.split(' ')
            .map((w) => w[0])
            .join('')}
        </AvatarFallback>
      </Avatar>
      <form action={logout}>
        <button type="submit">Logout</button>
      </form>
      <ShowToast />
    </main>
  );
}
