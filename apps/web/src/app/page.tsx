import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { db } from '@orbitkit/db';
import { Avatar, AvatarFallback, AvatarImage } from '@orbitkit/ui/avatar';

export default async function Home() {
  const users = await db.query.userTable.findMany();

  return (
    <main className="container mx-auto">
      <h1>Hello World</h1>
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
    </main>
  );
}
