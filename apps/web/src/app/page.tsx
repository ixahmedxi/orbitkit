import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { db } from '@orbitkit/db';

export default async function Home() {
  const users = await db.query.userTable.findMany();

  return (
    <main className="container mx-auto">
      <h1>Hello World</h1>
      {JSON.stringify(users)}
      <ThemeSwitcher />
    </main>
  );
}
