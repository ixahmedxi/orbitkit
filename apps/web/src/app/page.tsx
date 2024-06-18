import { redirect } from 'next/navigation'

import { auth } from '@orbitkit/auth'
import { logout } from '@orbitkit/auth/actions/logout'
import { Avatar, AvatarFallback, AvatarImage } from '@orbitkit/ui/avatar'

import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { api } from '@/lib/trpc/server'

import { ShowToast } from './show-toast'
import { UploadExample } from './upload'

/**
 * Home page which is protected by authentication
 * @returns Next.js RSC page.
 */
export default async function Home() {
  const { user } = await auth()

  if (!user) redirect('/login')

  const hello = await api.hello.protected()

  return (
    <main className='container mx-auto p-6'>
      <div className='flex min-h-[37.8px] items-center justify-between'>
        <h1>Next.js app, your user id is {user.id}</h1>
        <ThemeSwitcher />
      </div>
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
        <button type='submit'>Logout</button>
      </form>
      <ShowToast />
      <UploadExample />
      <p>{hello.message}</p>
    </main>
  )
}
