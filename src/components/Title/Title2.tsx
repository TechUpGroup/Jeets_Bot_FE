'use client';

import { Box, BoxProps, forwardRef } from '@chakra-ui/react';

export const Title2 = forwardRef<BoxProps, 'div'>((props, ref) => {
  return <Box ref={ref} lineHeight={1.145} fontSize={{ base: 24, md: 32 }} {...props} />;
});
