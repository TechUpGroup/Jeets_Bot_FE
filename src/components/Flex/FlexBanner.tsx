'use client';

import { ImageRatio } from '@/components';
import { Flex, FlexProps, forwardRef } from '@chakra-ui/react';

export const FlexBanner = forwardRef<FlexProps, 'div'>(({ children, ...props }, ref) => {
  return (
    <Flex
      ref={ref}
      gap={2.5}
      rounded={10}
      bg="rgba(238, 226, 255, 1)"
      w="full"
      px={{ base: 2, md: '25.43px' }}
      py={{ base: 4, md: 0 }}
      {...props}
    >
      <ImageRatio
        src="/images/people-pool.png"
        ratio={178 / 175}
        w={{ base: 10, md: 178 }}
        mt={{ base: 0, md: '15px' }}
        alignSelf={{ base: 'center', md: 'start' }}
      />
      {children}
      <ImageRatio
        src="/images/people-pool.png"
        ratio={178 / 175}
        w={{ base: 10, md: 178 }}
        mt={{ base: 0, md: '15px' }}
        alignSelf={{ base: 'center', md: 'start' }}
        transform="matrix(-1, 0, 0, 1, 0, 0)"
      />
    </Flex>
  );
});
