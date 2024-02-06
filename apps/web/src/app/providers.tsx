'use client';

import { type FC, type PropsWithChildren } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

import { TRPCReactProvider } from '@/lib/trpc/react';

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <NextThemesProvider attribute="class" enableSystem>
      <TRPCReactProvider>{children}</TRPCReactProvider>
    </NextThemesProvider>
  );
};
