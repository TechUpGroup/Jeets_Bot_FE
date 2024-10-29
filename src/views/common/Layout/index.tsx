'use client';

import { usePathname } from 'next/navigation';

import { FlexCol } from '@/components';
import { Flex } from '@chakra-ui/react';

import Footer from './Footer';
import Header from './Header';

export default function DefaultLayout({ children }: React.PropsWithChildren) {
  const pathname = usePathname();
  return (
    <FlexCol as="main" minH="100vh" alignItems="center" bg="main">
      <Header />
      <Flex
        flexDir="column"
        flex={1}
        bgImage="/images/bg-main.png"
        bgPos="top"
        // bgRepeat={pathname !== '/login' ? 'repeat-y' : 'no-repeat'}
        bgRepeat="no-repeat"
        bgSize="contain"
        maxW={1920}
        w="full"
        px={{ base: 2.5, md: 5 }}
      >
        {children}
      </Flex>
      {pathname === '/login' && <Footer />}
    </FlexCol>
  );
}
