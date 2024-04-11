import { $path } from 'next-typesafe-url';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

import { Ratelimit } from '@unkey/ratelimit';

import { env } from '@orbitkit/env/web/server';

const unkey =
  env.UNKEY_ROOT_KEY && env.UNKEY_NAMESPACE
    ? new Ratelimit({
        rootKey: env.UNKEY_ROOT_KEY,
        namespace: env.UNKEY_NAMESPACE,
        limit: 10,
        duration: '20s',
        async: true,
      })
    : undefined;

if (!unkey) {
  console.warn(
    '⚠️  UNKEY_ROOT_KEY or UNKEY_NAMESPACE is not set. Rate limiting will be disabled.',
  );
}

export default async function middleware(
  request: NextRequest,
): Promise<Response | undefined> {
  const ip = request.ip ?? '127.0.0.1';

  if (unkey) {
    const ratelimit = await unkey.limit(ip);

    if (!ratelimit.success) {
      return NextResponse.redirect(
        new URL($path({ route: '/blocked' }), request.url),
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico|blocked).*)',
};
