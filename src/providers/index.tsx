'use client';

import ChakraProvider from './chakra';
import QueryProvider from './react-query';
import SolanaProvider from './solana';

export default function Providers({ children }: React.PropsWithChildren) {
  return (
    <SolanaProvider>
      <QueryProvider>
        <ChakraProvider>{children}</ChakraProvider>
      </QueryProvider>
    </SolanaProvider>
  );
}
