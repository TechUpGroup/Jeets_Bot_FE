'use client';

import { chakra, ChakraProps, forwardRef, Spinner } from '@chakra-ui/react';

export type ButtonProps = ChakraProps & {
  isLoading?: boolean;
};

export const Button = forwardRef<ButtonProps, 'button'>(
  ({ isLoading, disabled, children, ...props }, ref) => {
    return (
      <chakra.button
        ref={ref}
        transition="all .3s linear"
        _hover={{
          opacity: 0.9,
        }}
        _disabled={{
          opacity: 0.8,
          cursor: 'not-allowed',
        }}
        _active={{
          opacity: 0.8,
        }}
        {...props}
        disabled={isLoading || disabled}
      >
        {isLoading ? <Spinner size="sm" /> : children}
      </chakra.button>
    );
  }
);
