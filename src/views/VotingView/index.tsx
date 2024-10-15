'use client';

import { Button, Currency, FlexCol, ImageRatio } from '@/components';
import { Box, Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

export default function VotingView() {
  return (
    <Flex flex={1} pt={{ base: 5, md: 30 }} justifyContent="center" lineHeight={1.145}>
      <FlexCol maxW={1517} w="full" rounded={24} pt={6} px={'44px'} pb={79} bg="white" alignItems="center" gap={30}>
        <Box fontSize={82}>VOTING</Box>
        <Flex gap={2.5} rounded={10} bg="rgba(29, 246, 157, 0.2)" w="full" px="25.43px">
          <ImageRatio src="/images/people-pool.png" ratio={178 / 175} w={178} mt="15px" />
          <FlexCol justifyContent="center" alignItems="center" flex={1} gap={2.5}>
            <Box fontSize={52} textAlign="center">
              00:10:20
            </Box>
          </FlexCol>
          <ImageRatio
            src="/images/people-pool.png"
            ratio={178 / 175}
            w={178}
            mt="15px"
            transform="matrix(-1, 0, 0, 1, 0, 0)"
          />
        </Flex>

        <FlexCol w="full" gap={2.5}>
          {Array.from({ length: 10 }).map((_, i) => (
            <Flex key={i} justifyContent="space-between" p={5}>
              <ImageRatio src="https://placehold.co/52x52" ratio={1} w={52} />
            </Flex>
          ))}
        </FlexCol>
      </FlexCol>
    </Flex>
  );
}
