import Link from 'next/link';

import { env } from '@orbitkit/env/web/server';

const googleAuthIsEnabled =
  env.AUTH_GOOGLE_ID !== undefined &&
  env.AUTH_GOOGLE_SECRET !== undefined &&
  env.AUTH_GOOGLE_CODE_VERIFIER !== undefined;

const githubAuthIsEnabled =
  env.AUTH_GITHUB_SECRET !== undefined && env.AUTH_GITHUB_ID !== undefined;

export default function Page() {
  return (
    <main className="container mx-auto flex flex-col">
      {githubAuthIsEnabled && (
        <Link href="/login/github">Sign in with Github</Link>
      )}
      {googleAuthIsEnabled && (
        <Link href="/login/google">Sign in with Google</Link>
      )}

      {!githubAuthIsEnabled && !googleAuthIsEnabled && (
        <p>Authentication environment variables are not configured.</p>
      )}
    </main>
  );
}
