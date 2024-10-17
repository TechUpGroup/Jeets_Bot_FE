'use client';

import { FlexCol } from '@/components';
import { Flex } from '@chakra-ui/react';

import Footer from './Footer';
import Header from './Header';

export default function DefaultLayout({ children }: React.PropsWithChildren) {
  return (
    <FlexCol as="main" minH="100vh" alignItems="center" bg="main" px={{ base: 2.5, md: 5 }}>
      <Header />
      <Flex
        flexDir="column"
        flex={1}
        bgImage="/images/bg-main.png"
        bgPos="top"
        bgRepeat="repeat-y"
        bgSize="contain"
        maxW={1920}
        w="full"
      >
        {children}
      </Flex>
      <Footer />
    </FlexCol>
  );
}
