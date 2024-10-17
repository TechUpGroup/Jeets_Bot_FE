'use client';

import { Button, FlexCol, ImageRatio } from '@/components';
import { Box, Flex } from '@chakra-ui/react';

export default function HomeView() {
  return (
    <Flex pt={{ base: '60px', md: 91 }} gap="8.28125%" w="full" justifyContent="center">
      <ImageRatio src="/images/cry.png" ratio={3744 / 3320} w="27.1875%" pt="30px" />
      <FlexCol w="42.03125%" px="44px" pt="84px" pb="87px" bg="white" rounded={24} alignItems="center" gap="30px">
        <Box lineHeight={1.145} fontSize={82}>
          SUBMIT
        </Box>
        <FlexCol gap="30px" fontSize={34} lineHeight={38.98 / 34} w="full" color="white">
          <Button rounded={10} h="76px" bg="rgba(43, 162, 222, 1)">
            CONNECT TELEGRAM
          </Button>
          <Button rounded={10} h="76px" bg="rgba(32, 27, 3, 1)">
            CONNECT X
          </Button>
          <Button rounded={10} h="76px" bg="rgba(192, 192, 192, 1)" color="rgba(239, 239, 239, 1)">
            CONTINUE
          </Button>
        </FlexCol>
      </FlexCol>
    </Flex>
  );
}
