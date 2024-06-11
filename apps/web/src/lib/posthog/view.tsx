'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { type PostHog, usePostHog } from 'posthog-js/react';

/**
 * This component is used to capture page views in PostHog.
 * @returns null
 */
export default function PostHogPageView(): null {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog() as PostHog | undefined;

  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname;
      if (searchParams.toString()) {
        url = url + `?${searchParams.toString()}`;
      }
      posthog.capture('$pageview', {
        $current_url: url,
      });
    }
  }, [pathname, searchParams, posthog]);

  return null;
}
