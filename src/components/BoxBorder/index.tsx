'use client';

import { Box, BoxProps, forwardRef } from '@chakra-ui/react';

export const BoxBorder = forwardRef<BoxProps, 'div'>((props, ref) => {
  return (
    <Box
      ref={ref}
      border="1px solid"
      borderColor="borderColor.1"
      bg="glassyFille.1"
      // boxShadow="inset 0px -28px 84px rgba(226, 232, 255, 0.06)"
      style={{ backgroundOrigin: 'border-box' }}
      rounded={16}
      {...props}
    />
  );
});
