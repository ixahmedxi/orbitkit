'use client';

import { type FC, type PropsWithChildren } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <NextThemesProvider attribute="class" enableSystem>
      {children}
    </NextThemesProvider>
  );
};
