'use client';

import { Box, BoxProps, forwardRef } from '@chakra-ui/react';

export const Line = forwardRef<BoxProps, 'div'>((props, ref) => {
  return <Box ref={ref} bg="rgba(40, 40, 45, 1)" w="full" h="1px" {...props} />;
});
