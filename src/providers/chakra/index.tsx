'use client';

import { inter, titanOne } from '@/utils/fonts';
import { ChakraProvider as ChakraBaseProvider, ChakraProviderProps, extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
  fonts: {
    heading: titanOne.style.fontFamily,
    body: titanOne.style.fontFamily,
    nunito: titanOne.style.fontFamily,
    sfPro: 'SF Pro Display',
    titanOne: titanOne.style.fontFamily,
    inter: inter.style.fontFamily,
  },
  colors: {
    main: 'rgba(214, 231, 246, 1)',
    purple: 'rgba(143, 81, 236, 1)',
    purple2: 'rgba(144, 79, 236, 1)',
    green: 'rgba(29, 246, 157, 1)',
    disabled: 'rgba(192, 192, 192, 1)',
    black: 'rgba(16, 16, 16, 1)',
    makeColor: 'linear-gradient(90deg, #1DF69D 0%, #904EEC 100%)',
    tooltip: {
      500: 'rgba(143, 81, 236, 1)',
    },
  },
});

const chakraProps: ChakraProviderProps = {
  theme: customTheme,
  toastOptions: { defaultOptions: { position: 'top-right' } },
};

export default function ChakraProvider({ children }: React.PropsWithChildren) {
  return <ChakraBaseProvider {...chakraProps}>{children}</ChakraBaseProvider>;
}
