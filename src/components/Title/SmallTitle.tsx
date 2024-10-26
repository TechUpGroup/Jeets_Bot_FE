'use client';

import { Box, BoxProps, forwardRef } from '@chakra-ui/react';

export const SmallTitle = forwardRef<BoxProps, 'div'>((props, ref) => {
  return <Box ref={ref} fontSize={{ base: 12, md: 14 }} {...props} />;
});
