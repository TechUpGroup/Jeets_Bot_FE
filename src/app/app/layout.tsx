import { PropsWithChildren } from 'react';

import Layout from '@/views/common/Layout';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Launchpad',
  description: '',
};

export default function LandingPageLayout({ children }: PropsWithChildren) {
  return <Layout>{children}</Layout>;
}
