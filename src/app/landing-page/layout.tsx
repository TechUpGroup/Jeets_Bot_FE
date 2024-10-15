import type { Metadata } from 'next';

import { PropsWithChildren } from 'react';

import LandingPageDefaultLayout from '@/views/LandingPage/Layout';

export const metadata: Metadata = {
  title: 'Home',
  description: '',
};

export default function LandingPageLayout({ children }: PropsWithChildren) {
  return <LandingPageDefaultLayout>{children}</LandingPageDefaultLayout>;
}
