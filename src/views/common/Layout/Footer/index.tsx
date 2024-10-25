'use client';

import { LinkCustom } from '@/components';
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
        <Flex
          gap={10}
          w={{ base: '50%', md: '43.25%' }}
          mx={{ base: 'auto', md: 'unset' }}
          justifyContent="center"
          alignItems="center"
        >
          <LinkCustom href="https://x.com/soljeets" target="_blank">
            <XIcon />
          </LinkCustom>
          <LinkCustom href="https://t.me/soljeetscom" target="_blank">
            <TeleIcon />
          </LinkCustom>
        </Flex>
      </Flex>
    </Flex>
  );
}
