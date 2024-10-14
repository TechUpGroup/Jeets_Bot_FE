'use client';

import { Flex } from '@chakra-ui/react';

import Footer from './Footer';
import Header from './Header';

export default function DefaultLayout({ children }: React.PropsWithChildren) {
  return (
    <Flex as="main" flexDir="column" minH="100vh" bg="main" fontWeight={500} lineHeight={1.375}>
      <Header />
      <Flex flexDir="column" flex={1} pb={{ base: 20, md: '100px' }}>
        {children}
      </Flex>
      <Footer />
    </Flex>
  );
}
