'use client';

import { PropsWithChildren } from 'react';

import { Flex } from '@chakra-ui/react';

import Footer from './Footer';
import Header from './Header';

export default function LandingPageDefaultLayout({ children }: PropsWithChildren) {
  return (
    <Flex as="main" flexDir="column" minH="100vh" bg="rgba(214, 231, 246, 1)">
      <Header />
      <Flex flexDir="column" flex={1} alignItems="center">
        {children}
      </Flex>
      <Footer />
    </Flex>
  );
}
