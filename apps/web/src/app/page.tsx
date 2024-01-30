import { redirect } from 'next/navigation';

import { getSession } from '@orbitkit/auth';
import { logout } from '@orbitkit/auth/actions/logout';
import { db } from '@orbitkit/db';
import { Avatar, AvatarFallback, AvatarImage } from '@orbitkit/ui/avatar';

import { ThemeSwitcher } from '@/components/ThemeSwitcher';

export default async function Home() {
  const { user } = await getSession();
  if (!user) {
    return redirect('/login');
  }

  const users = await db.query.userTable.findMany();

  return (
    <main className="container mx-auto">
      <h1>Hi, {user.username}!</h1>
      {JSON.stringify(users)}
      <ThemeSwitcher />
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/shadcnnnnn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <form action={logout}>
        <button>Sign out</button>
      </form>
    </main>
  );
}
