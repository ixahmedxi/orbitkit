import { cookies } from 'next/headers';

import { generateState, Google, OAuth2RequestError } from 'arctic';
import { generateId } from 'lucia';
import { z } from 'zod';

import { db } from '@orbitkit/db';
import { oauthAccountTable, userTable } from '@orbitkit/db/schema';
import { env } from '@orbitkit/env/web/server';
import { getBaseUrl } from '@orbitkit/utils';

import { lucia } from '../lucia';

const baseUrl = getBaseUrl();

const google =
  env.AUTH_GOOGLE_ID !== undefined &&
  env.AUTH_GOOGLE_SECRET !== undefined &&
  new Google(
    env.AUTH_GOOGLE_ID,
    env.AUTH_GOOGLE_SECRET,
    `${baseUrl}/login/google/callback`,
  );

export async function createGoogleAuthorizationURL(): Promise<Response> {
  if (!google) {
    return new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });
  }

  const state = generateState();
  const url =
    env.AUTH_GOOGLE_CODE_VERIFIER !== undefined &&
    (await google.createAuthorizationURL(state, env.AUTH_GOOGLE_CODE_VERIFIER, {
      scopes: ['profile', 'email'],
    }));

  if (!url) {
    return new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });
  }

  cookies().set('google_oauth_state', state, {
    path: '/',
    secure: env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: 'lax',
  });

  return Response.redirect(url);
}

const googleUser = z.object({
  sub: z.string(),
  email: z.string(),
  picture: z.string(),
  name: z.string(),
});

export async function validateGoogleCallback(
  request: Request,
): Promise<Response> {
  if (!google) {
    return new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });
  }
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const storedState = cookies().get('google_oauth_state')?.value ?? null;
  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens =
      env.AUTH_GOOGLE_CODE_VERIFIER !== undefined &&
      (await google.validateAuthorizationCode(
        code,
        env.AUTH_GOOGLE_CODE_VERIFIER,
      ));

    if (!tokens) {
      return new Response(null, {
        status: 404,
        statusText: 'Not Found',
      });
    }

    const googleUserResponse = await fetch(
      'https://openidconnect.googleapis.com/v1/userinfo',
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      },
    );
    const parsedRes = googleUser.safeParse(await googleUserResponse.json());

    if (!parsedRes.success) {
      return new Response(null, {
        status: 400,
      });
    }

    const { sub, email, picture, name } = parsedRes.data;

    const existingUser = await db.query.oauthAccountTable.findFirst({
      where: (table, { and, eq }) =>
        and(eq(table.providerId, 'google'), eq(table.providerUserId, sub)),
    });

    if (existingUser) {
      const session = await lucia.createSession(existingUser.userId, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
      return new Response(null, {
        status: 302,
        headers: {
          Location: '/',
        },
      });
    }

    const userId = generateId(15);
    await db.insert(userTable).values({
      id: userId,
      email,
      avatarUrl: picture,
      name,
    });
    await db.insert(oauthAccountTable).values({
      providerId: 'google',
      providerUserId: sub,
      userId,
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return new Response(null, {
      status: 302,
      headers: {
        Location: '/',
      },
    });
  } catch (e) {
    if (e instanceof OAuth2RequestError) {
      return new Response(null, {
        status: 400,
      });
    }

    return new Response(null, {
      status: 500,
    });
  }
}
