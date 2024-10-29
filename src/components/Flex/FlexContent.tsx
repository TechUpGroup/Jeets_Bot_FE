'use client';

import { Flex, FlexProps, forwardRef } from '@chakra-ui/react';

export const FlexContent = forwardRef<FlexProps, 'div'>((props, ref) => {
  return (
    <Flex
      ref={ref}
      direction="column"
      flex={1}
      w="full"
      rounded={24}
      py={6}
      px={{ base: 4, md: 6, lg: 8, xl: 9, '2xl': '44px' }}
      bg="white"
      alignItems="center"
      gap={30}
      lineHeight={1.145}
      {...props}
    />
  );
});
