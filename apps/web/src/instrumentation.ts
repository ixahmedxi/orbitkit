/**
 * This file is used to register the Sentry SDK.
 */
export async function register() {
  if (process.env['NEXT_RUNTIME'] === 'nodejs') {
    await import('../sentry.server.config')
  }

  if (process.env['NEXT_RUNTIME'] === 'edge') {
    await import('../sentry.edge.config')
  }
}
