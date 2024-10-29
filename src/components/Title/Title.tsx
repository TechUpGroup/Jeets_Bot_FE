'use client';

import { Box, BoxProps, forwardRef } from '@chakra-ui/react';

export const Title = forwardRef<BoxProps, 'div'>((props, ref) => {
  return <Box ref={ref} lineHeight={1.145} fontSize={{ base: 32, md: 82 }} {...props} />;
});
