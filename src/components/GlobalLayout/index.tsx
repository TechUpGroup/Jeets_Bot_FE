'use client';

import { PropsWithChildren, Suspense } from 'react';

import Providers from '@/providers';
import Global from '@/views/common/Global';

export function GlobalLayout({ children }: PropsWithChildren) {
  return (
    <Suspense>
      <Providers>
        <Global />
        {children}
      </Providers>
    </Suspense>
  );
}
