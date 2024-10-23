'use client';

import { FlexCol } from '@/components';
import { Flex, FlexProps, forwardRef } from '@chakra-ui/react';

export const Wrapper = forwardRef<FlexProps, 'div'>(({ children, gap, ...props }, ref) => {
  return (
    <Flex ref={ref} flex={1} pt={{ base: 5, md: 30 }} justifyContent="center" pb={10}>
      <FlexCol
        maxW={1517}
        w="full"
        rounded={24}
        pt={6}
        px={{ base: 4, md: 6, lg: 8, xl: '44px' }}
        pb={79}
        bg="white"
        alignItems="center"
        gap={30}
        lineHeight={1.145}
        {...props}
      >
        {children}
      </FlexCol>
    </Flex>
  );
});
