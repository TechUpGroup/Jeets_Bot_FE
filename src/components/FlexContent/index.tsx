'use client';

import { FlexProps, forwardRef } from '@chakra-ui/react';

import { FlexCol } from '../FlexCol';

export const FlexContent = forwardRef<FlexProps, 'div'>((props, ref) => {
  return (
    <FlexCol
      ref={ref}
      maxW={{ base: 'full', md: 1076 }}
      w="full"
      mx="auto"
      px={{ base: 5, md: 10 }}
      {...props}
    />
  );
});
