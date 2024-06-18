import Link from 'next/link'
import { redirect } from 'next/navigation'

import { auth } from '@orbitkit/auth'
import { env } from '@orbitkit/env/web/server'

const googleAuthIsEnabled =
  env.AUTH_GOOGLE_ID !== undefined && env.AUTH_GOOGLE_SECRET !== undefined

const githubAuthIsEnabled =
  env.AUTH_GITHUB_SECRET !== undefined && env.AUTH_GITHUB_ID !== undefined

/**
 * The login page of the application, if the user is already logged in they will be redirected to the home page.
 * @returns Next.js RSC page.
 */
export default async function Page() {
  const { user } = await auth()

  if (user) redirect('/')

  return (
    <main className='container mx-auto flex flex-col'>
      {githubAuthIsEnabled && (
        <Link href='/login/github'>Sign in with Github</Link>
      )}
      {googleAuthIsEnabled && (
        <Link href='/login/google'>Sign in with Google</Link>
      )}

      {!githubAuthIsEnabled && !googleAuthIsEnabled && (
        <p>Authentication environment variables are not configured.</p>
      )}
    </main>
  )
}
