'use client';

import { NextUIProvider } from '@nextui-org/system';

import ChakraProvider from './chakra';
import QueryProvider from './react-query';
import SolanaProvider from './solana';

export default function Providers({ children }: React.PropsWithChildren) {
  return (
    <NextUIProvider>
      <SolanaProvider>
        <QueryProvider>
          <ChakraProvider>{children}</ChakraProvider>
        </QueryProvider>
      </SolanaProvider>
    </NextUIProvider>
  );
}
