import { cookies } from 'next/headers';

import { generateState, GitHub, OAuth2RequestError } from 'arctic';
import { generateId } from 'lucia';

import { db } from '@orbitkit/db';
import { userTable } from '@orbitkit/db/schema';

import { env } from '../env.js';
import { lucia } from '../lucia';

export const github = new GitHub(
  env.AUTH_GITHUB_CLIENT_ID,
  env.AUTH_GITHUB_CLIENT_SECRET,
);

export async function createGithubAuthorizationURL(): Promise<Response> {
  const state = generateState();
  const url = await github.createAuthorizationURL(state);

  cookies().set('github_oauth_state', state, {
    path: '/',
    secure: env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: 'lax',
  });

  return Response.redirect(url);
}

interface GitHubUser {
  id: string;
  login: string;
}

export async function validateGithubCallback(
  request: Request,
): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const storedState = cookies().get('github_oauth_state')?.value ?? null;
  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await github.validateAuthorizationCode(code);
    const githubUserResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    const githubUser = (await githubUserResponse.json()) as GitHubUser;
    const existingUser = await db.query.userTable.findFirst({
      where: (table, { eq }) => eq(table.github_id, githubUser.id),
    });

    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, {});
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
      github_id: githubUser.id,
      username: githubUser.login,
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
    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
}
