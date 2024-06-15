import { env } from '@orbitkit/env/web/client';
import { PostHog } from 'posthog-node';

/**
 * This component is used to initialize posthog client.
 * @returns posthog client.
 */
export default function PostHogClient() {
  if (!env.NEXT_PUBLIC_POSTHOG_KEY || !env.NEXT_PUBLIC_POSTHOG_HOST) {
    return;
  }

  return new PostHog(env.NEXT_PUBLIC_POSTHOG_KEY, {
    host: env.NEXT_PUBLIC_POSTHOG_HOST,
    flushAt: 1, // Sets how many capture calls we should flush the queue (in one batch).
    flushInterval: 0, // Sets how many milliseconds we should wait before flushing the queue
  });
}
