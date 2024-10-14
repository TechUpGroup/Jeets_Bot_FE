import 'resize-observer-polyfill';
import './globals.scss';

import { GlobalLayout } from '@/components/GlobalLayout';
import { inter } from '@/utils/fonts';

import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Home',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalLayout>{children}</GlobalLayout>
      </body>
    </html>
  );
}
