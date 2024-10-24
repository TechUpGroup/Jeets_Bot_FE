import { Inter, Titan_One } from 'next/font/google';

export const titanOne = Titan_One({
  style: 'normal',
  subsets: ['latin', 'latin-ext'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-titan',
});

export const inter = Inter({
  style: 'normal',
  subsets: ['latin', 'latin-ext'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-inter',
});
