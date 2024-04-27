import { redirect } from 'next/navigation';

import { auth, signIn } from '@orbitkit/auth';
import { Button } from '@orbitkit/ui/button';

export default async function page() {
  const session = await auth();

  if (session?.user) {
    redirect('/');
  }

  return (
    <main className="container">
      <form
        action={async () => {
          'use server';
          await signIn('github');
        }}
      >
        <Button type="submit" variant="outline">
          Sign in with Github
        </Button>
      </form>
    </main>
  );
}
