'use client';

import { Flex } from '@chakra-ui/react';

import Footer from './Footer';
import Header from './Header';

export default function DefaultLayout({ children }: React.PropsWithChildren) {
  return (
    <Flex as="main" flexDir="column" minH="100vh" bg="main" px={{ base: 2.5, md: 5 }}>
      <Header />
      <Flex flexDir="column" flex={1}>
        {children}
      </Flex>
      <Footer />
    </Flex>
  );
}
