'use client';

import { Button, Currency, FlexCol, ImageRatio } from '@/components';
import { Box, Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

export default function PoolView() {
  return (
    <Flex flex={1} pt={{ base: 5, md: 30 }} justifyContent="center" lineHeight={1.145}>
      <FlexCol maxW={1517} w="full" rounded={24} pt={6} px={'44px'} pb={79} bg="white" alignItems="center" gap={30}>
        <Box fontSize={82}>POOL</Box>
        <Flex gap={2.5} rounded={10} bg="rgba(238, 226, 255, 1)" w="full" px="25.43px">
          <ImageRatio src="/images/people-pool.png" ratio={178 / 175} w={178} mt="15px" />
          <FlexCol justifyContent="center" alignItems="center" flex={1} gap={2.5}>
            <Box fontSize={52} textAlign="center" color="purple">
              <Currency value={10_000_000} suffix=" TOKEN" />
            </Box>
            <Box fontSize={20} flexFlow="sfPro" color="rgba(16, 16, 16, 1)">
              Locked
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

        <TableContainer w="full">
          <Table variant="unstyled">
            <Thead>
              <Tr fontFamily="sfPro" fontWeight={800} fontSize={20} color="rgba(172, 172, 172, 1)">
                <Td p={0} lineHeight={1.4}>
                  Amount
                </Td>
                <Td p={0} lineHeight={1.4} textAlign="center">
                  Deposit time
                </Td>
                <Td p={0} lineHeight={1.4} textAlign="center" w={288}>
                  Status
                </Td>
              </Tr>
            </Thead>
            <Tbody fontSize={20}>
              {Array.from({ length: 10 }).map((_, i) => (
                <Tr key={i}>
                  <Td px={0} pb={0} pt={2.5}>
                    <Flex
                      alignItems="center"
                      bg="rgba(237, 247, 255, 1)"
                      h="90px"
                      roundedLeft={10}
                      px={5}
                      fontFamily="sfPro"
                      fontWeight={800}
                    >
                      2,000
                    </Flex>
                  </Td>
                  <Td px={0} pb={0} pt={2.5}>
                    <Flex alignItems="center" bg="rgba(237, 247, 255, 1)" h="90px" fontFamily="sfPro" fontWeight={800}>
                      18/10/2024
                    </Flex>
                  </Td>
                  <Td px={0} pb={0} pt={2.5}>
                    <Flex alignItems="center" bg="rgba(237, 247, 255, 1)" h="90px" roundedRight={10} px={5}>
                      {true ? (
                        <Button h={50} w="full" color="green" border="1px solid" borderColor="green" rounded={8}>
                          DEPOSITED
                        </Button>
                      ) : (
                        <Button h={50} w="full" bg="rgba(192, 192, 192, 1)" color="rgba(239, 239, 239, 1)" rounded={8}>
                          LOCKED
                        </Button>
                      )}
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </FlexCol>
    </Flex>
  );
}
