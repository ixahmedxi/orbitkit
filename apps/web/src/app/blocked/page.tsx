/**
 * This page is rendered when the user is rate limited, they are automatically redirected here from the middleware.
 * @returns Next.js RSC page.
 */
export default function page() {
  return (
    <main>
      <h1>Blocked</h1>
    </main>
  )
}
