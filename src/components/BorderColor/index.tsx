'use client';

import { Box, BoxProps, forwardRef } from '@chakra-ui/react';

type Props = BoxProps & {
  glassyFille?: boolean;
};

export const BorderColor = forwardRef<Props, 'div'>(({ glassyFille, ...props }, ref) => {
  return (
    <Box
      ref={ref}
      border="1px solid"
      borderColor="borderColor.1"
      bg={glassyFille ? 'glassyFille.1' : undefined}
      style={glassyFille ? { backgroundOrigin: 'border-box' } : undefined}
      {...props}
    />
  );
});
