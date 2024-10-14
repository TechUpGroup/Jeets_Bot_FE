'use client';

import { Box, BoxProps, forwardRef } from '@chakra-ui/react';

export const Line = forwardRef<BoxProps, 'div'>((props, ref) => {
  return <Box ref={ref} bg="bgLine.1" w="full" h="1px" {...props} />;
});
