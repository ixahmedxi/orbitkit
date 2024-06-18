/**
 * This function gets the base URL of the current environment.
 * @returns The base URL.
 */
export function getBaseUrl() {
  if (typeof window !== 'undefined') {
    return window.location.origin
  }

  if (process.env['VERCEL_URL']) {
    return `https://${process.env['VERCEL_URL']}`
  }
  return `http://localhost:${String(process.env['PORT'] ?? 3000)}`
}
