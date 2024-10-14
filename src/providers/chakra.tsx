'use client';

import { inter } from '@/utils/fonts';
import { ChakraProvider as ChakraBaseProvider, ChakraProviderProps, extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
  fonts: {
    heading: inter.style.fontFamily,
    body: inter.style.fontFamily,
    inter: inter.style.fontFamily,
  },
  colors: {
    main: '#050520',
    glassyFille: {
      1: 'linear-gradient(0deg, rgba(226, 232, 255, 0.004), rgba(226, 232, 255, 0.004)), radial-gradient(120.05% 100% at 50% 0%, rgba(226, 232, 255, 0) 33.78%, rgba(226, 232, 255, 0.04) 100%)',
      2: 'linear-gradient(0deg, rgba(226, 232, 255, 0.01), rgba(226, 232, 255, 0.01)), linear-gradient(180deg, rgba(226, 232, 255, 0) 0%, rgba(226, 232, 255, 0.26) 100%)',
      3: 'linear-gradient(180deg, rgba(226, 232, 255, 0) 0%, rgba(226, 232, 255, 0.26) 100%)',
    },
    textGradient: {
      1: 'linear-gradient(180deg, rgba(240, 238, 250, 0.8) 0%, #E1E8FF 100%)',
    },
    gradient: {
      1: 'linear-gradient(96.16deg, #A578FF 0%, #FF83BD 33.33%, #FFBA6D 66.67%, #FBE9BE 100%)',
    },

    bgGradient: {
      1: 'linear-gradient(96.16deg, rgba(165, 120, 255, 0.15) 0%, rgba(255, 131, 189, 0.15) 33.33%, rgba(255, 186, 109, 0.15) 66.67%, rgba(251, 233, 190, 0.15) 100%)',
      2: 'radial-gradient(96.87% 167.08% at 50% 0%, rgba(5, 5, 30, 0) 0%, rgba(92, 73, 144, 0.06) 33.33%, rgba(254, 139, 187, 0.11) 66.67%, rgba(255, 189, 122, 0.16) 99.99%, rgba(255, 189, 122, 0) 100%)',
      3: 'linear-gradient(180deg, rgba(226, 232, 255, 0) 0%, rgba(226, 232, 255, 0.13) 100%)',
      4: 'radial-gradient(120.05% 100% at 50% 0%, rgba(226, 232, 255, 0) 33.78%, rgba(226, 232, 255, 0.04) 100%)',
    },

    borderColor: {
      1: 'rgba(226, 232, 255, 0.1)',
      15: 'rgba(226, 232, 255, 0.15)',
      3: 'rgba(226, 232, 255, 0.3)',
    },

    primary: {
      1: 'rgba(226, 232, 255, 1)',
      2: 'rgba(226, 232, 255, 0.75)',
      3: 'rgba(226, 232, 255, 0.5)',
      6: 'rgba(226, 232, 255, 0.6)',
      8: 'rgba(226, 232, 255, 0.8)',
    },
    green: {
      1: 'rgba(97, 197, 84, 1)',
    },
    blue: {
      1: 'rgba(98, 132, 245, 1)',
    },
    red: 'rgba(217, 44, 55, 1)',
    bg: {
      1: 'rgba(226, 232, 255, 0.08)',
    },
    bgLine: {
      1: 'linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(226, 232, 255, 0.12) 50%, rgba(0, 0, 0, 0) 100%)',
      2: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(226, 232, 255, 0.12) 50%, rgba(0, 0, 0, 0) 100%)',
      3: 'linear-gradient(90deg, rgba(226, 232, 255, 0) 49.88%, rgba(226, 232, 255, 0) 49.98%, rgba(226, 232, 255, 0.5) 49.98%)',
    },
    bgHover: {
      1: 'linear-gradient(0deg, rgba(226, 232, 255, 0.01), rgba(226, 232, 255, 0.01)), linear-gradient(180deg, rgba(226, 232, 255, 0) 0%, rgba(226, 232, 255, 0.13) 100%)',
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
