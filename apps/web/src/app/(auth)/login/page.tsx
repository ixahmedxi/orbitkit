import Link from 'next/link';

export default function Page() {
  return (
    <>
      <h1>Sign in</h1>
      <Link href="/login/github">Sign in with Github</Link>
    </>
  );
}
