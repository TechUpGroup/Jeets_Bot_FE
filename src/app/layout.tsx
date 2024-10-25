import 'resize-observer-polyfill';
import '@/providers/chakra/fonts/SF-Pro-Display/stylesheet.css';
import './globals.scss';

import { GlobalLayout } from '@/components/GlobalLayout';
import { titanOne } from '@/utils/fonts';

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
      <body className={titanOne.className}>
        <GlobalLayout>{children}</GlobalLayout>
      </body>
    </html>
  );
}
