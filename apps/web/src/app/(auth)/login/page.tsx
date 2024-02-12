import Link from 'next/link';

export default function Page() {
  return (
    <main className="container mx-auto flex flex-col">
      <Link href="/login/github">Sign in with Github</Link>
      <Link href="/login/google">Sign in with Google</Link>
    </main>
  );
}
