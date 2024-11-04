'use client';

import { ImageRatio } from '@/components';
import { Box, Flex, FlexProps, forwardRef } from '@chakra-ui/react';

export const FlexEmpty = forwardRef<FlexProps, 'div'>(({ children, ...props }, ref) => {
  return (
    <Flex
    rounded={10}
    py={4}
    px={6}
    w="full"
    gap={1.5}
    alignItems="center"
    textAlign="center"

      bg="rgba(238, 226, 255, 1)"
      
      {...props}
    >
      <Flex flex={1}>{children}</Flex>

    </Flex>
  );
});
