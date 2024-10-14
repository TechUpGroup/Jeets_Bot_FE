'use client';

import { Flex, FlexProps, forwardRef } from '@chakra-ui/react';

export const FlexCol = forwardRef<FlexProps, 'div'>((props, ref) => {
  return <Flex ref={ref} direction="column" {...props} />;
});
