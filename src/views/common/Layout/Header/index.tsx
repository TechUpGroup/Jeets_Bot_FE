'use client';

import { usePathname } from 'next/navigation';

import { Button, FlexCenter, ImageRatio, LinkCustom } from '@/components';
import { Box, Flex } from '@chakra-ui/react';

export default function Header() {
  const pathname = usePathname();
  return (
    <Flex
      maxW={1680}
      w="full"
      justifyContent="space-between"
      alignItems="center"
      fontSize={{ base: 16, md: 24 }}
      pt={{ base: 4, md: '25px' }}
      gap={2.5}
      color="rgba(32, 27, 3, 1)"
      mx="auto"
    >
      <ImageRatio src="/images/logo.png" ratio={271 / 108} w={{ base: 120, md: 271 }} />

      <FlexCenter gap={{ base: 2.5, md: '60px' }}>
        {[
          { name: 'Missions', href: '/missions' },
          { name: 'Voting', href: '/voting' },
          { name: 'Pool', href: '/' },
        ].map((e) => (
          <LinkCustom
            key={e.name}
            href={e.href}
            color={pathname === e.href ? 'purple' : undefined}
            textDecor={pathname === e.href ? 'underline' : undefined}
          >
            {e.name}
          </LinkCustom>
        ))}

        {true ? (
          <Button
            px={{ base: 4, md: 7 }}
            h="50px"
            rounded={8}
            color="white"
            bg="linear-gradient(90deg, #1DF69D 0%, #904EEC 100%)"
          >
            Connect Wallet
          </Button>
        ) : (
          <Button px={{ base: 4, md: 8 }} h="50px" rounded={8} border="1px solid black">
            Disconnect Wallet
          </Button>
        )}
      </FlexCenter>
    </Flex>
  );
}
