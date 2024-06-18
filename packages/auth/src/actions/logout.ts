'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { auth } from '../auth'
import { lucia } from '../lucia'

/**
 * This function logs out the user.
 * @returns The response.
 */
export async function logout() {
  const { session } = await auth()
  if (!session) {
    return {
      error: 'Unauthorized',
    }
  }

  await lucia.invalidateSession(session.id)

  const sessionCookie = lucia.createBlankSessionCookie()

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  )

  return redirect('/login')
}
