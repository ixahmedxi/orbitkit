import { env } from '@orbitkit/env/marketing';
import posthog from 'posthog-js';

if (env.PUBLIC_POSTHOG_KEY && env.PUBLIC_POSTHOG_HOST) {
  posthog.init(env.PUBLIC_POSTHOG_KEY, {
    api_host: env.PUBLIC_POSTHOG_HOST,
  });
}
