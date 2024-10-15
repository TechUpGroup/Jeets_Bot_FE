'use client';

import { titanOne } from '@/utils/fonts';
import { ChakraProvider as ChakraBaseProvider, ChakraProviderProps, extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
  fonts: {
    heading: titanOne,
    body: titanOne,
    nunito: titanOne,
    sfPro: 'SF Pro Display',
  },
  colors: {
    main: 'rgba(214, 231, 246, 1)',
    purple: 'rgba(144, 79, 236, 1)',
    green: 'rgba(29, 246, 157, 1)',
  },
});

const chakraProps: ChakraProviderProps = {
  theme: customTheme,
  toastOptions: { defaultOptions: { position: 'top-right' } },
};

export default function ChakraProvider({ children }: React.PropsWithChildren) {
  return <ChakraBaseProvider {...chakraProps}>{children}</ChakraBaseProvider>;
}
