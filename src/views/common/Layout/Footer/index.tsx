'use client';

import { TeleIcon, XIcon } from '@/components/Icons';
import { Flex } from '@chakra-ui/react';

export default function Footer() {
  return (
    <Flex
      bg="rgba(0, 25, 105, 1)"
      w="full"
      h={{ base: '72px', md: 140 }}
      justifyContent="center"
      mx={{ base: -2.5, md: -5 }}
    >
      <Flex maxW={1524} w="full">
        <Flex gap={22} w={{ base: '50%', md: '43.25%' }} mx={{ base: 'auto', md: 'unset' }} justifyContent="center">
          <XIcon />
          <TeleIcon />
        </Flex>
      </Flex>
    </Flex>
  );
}
