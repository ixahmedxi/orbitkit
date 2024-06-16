'use client';
import { env } from '@orbitkit/env/web/client';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

if (
  typeof window !== 'undefined' &&
  env.NEXT_PUBLIC_POSTHOG_HOST &&
  env.NEXT_PUBLIC_POSTHOG_KEY
) {
  posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: env.NEXT_PUBLIC_POSTHOG_HOST,
    capture_pageview: false, // Disable automatic pageview capture, as we capture manually
  });
}

/**
 * This component is used to initialize the posthog on the client side.
 * @param props The props to the component.
 * @param props.children The children to render.
 * @returns posthog provider wrapper around the children.
 */
export function PostHogReactProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
