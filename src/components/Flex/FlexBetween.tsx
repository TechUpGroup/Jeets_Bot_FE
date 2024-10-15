'use client';

import { Flex, FlexProps, forwardRef } from '@chakra-ui/react';

export const FlexBetween = forwardRef<FlexProps, 'div'>((props, ref) => {
  return <Flex ref={ref} alignItems="center" justifyContent="space-between" {...props} />;
});
