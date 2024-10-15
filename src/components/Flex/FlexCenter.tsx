'use client';

import { Flex, FlexProps, forwardRef } from '@chakra-ui/react';

export const FlexCenter = forwardRef<FlexProps, 'div'>((props, ref) => {
  return <Flex ref={ref} alignItems="center" {...props} />;
});
