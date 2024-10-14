'use client';

import { Link, LinkProps } from '@chakra-ui/next-js';
import { forwardRef } from '@chakra-ui/react';

export const LinkCustom = forwardRef<LinkProps, 'a'>(
  ({ _hover, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        _hover={{ textDecoration: 'none', ..._hover }}
        {...props}
      />
    );
  }
);
