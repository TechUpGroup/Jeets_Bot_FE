'use client';

import {
  Button,
  Currency,
  FlexBanner,
  FlexCenter,
  FlexCol,
  ImageRatio,
  LinkCustom,
  Title,
  Wrapper,
} from '@/components';
import { getTransactionHashUrl } from '@/utils';
import { formatAddress } from '@/utils/address';
import dayjs from '@/utils/dayjs';
import { Box, Flex, Table, TableContainer, Tbody, Td, Thead, Tr } from '@chakra-ui/react';

import { useQueryHistories, useQueryHistoriesRemain } from './hooks/useQueryHistories';

export default function PoolView() {
  const { data: histories } = useQueryHistories();
  const { data: remaining } = useQueryHistoriesRemain();
  return (
    <Wrapper>
      <Title>POOL</Title>
      <FlexBanner>
        <FlexCol justifyContent="center" alignItems="center" flex={1} gap={2.5}>
          <Flex
            flexDir={{ base: 'column', md: 'row' }}
            fontSize={{ base: 24, md: 52 }}
            textAlign="center"
            color="purple2"
            gap={2.5}
            alignItems="center"
            justifyContent="center"
            flexWrap="wrap"
          >
            <Currency value={remaining} isWei />{' '}
            <FlexCenter gap={2.5}>
              <Box as="span" color="rgba(32, 27, 3, 1)">
                $MOON
              </Box>
              <ImageRatio src="/icons/moon.png" ratio={1} w={10} />
            </FlexCenter>
          </Flex>
          <Box fontSize={20} flexFlow="sfPro" color="rgba(16, 16, 16, 1)">
            Locked
          </Box>
        </FlexCol>
      </FlexBanner>

      <TableContainer w="full" pb={4}>
        <Table
          variant="unstyled"
          style={{ borderCollapse: 'separate', borderSpacing: '0 10px' }}
          fontFamily="sfPro"
          fontWeight={800}
        >
          <Thead>
            <Tr fontSize={{ base: 16, md: 20 }} color="rgba(172, 172, 172, 1)">
              <Td p={0} lineHeight={1.4} w={288} pr={{ base: 2, md: 5 }}>
                Amount
              </Td>
              <Td p={0} lineHeight={1.4} textAlign="center" px={{ base: 2, md: 5 }}>
                Transactions
              </Td>
              <Td p={0} lineHeight={1.4} textAlign="center" px={{ base: 2, md: 5 }}>
                Deposit time
              </Td>
              <Td p={0} lineHeight={1.4} textAlign="center" px={{ base: 2, md: 5 }} w={288}>
                Status
              </Td>
            </Tr>
          </Thead>
          <Tbody fontSize={{ base: 16, md: 20 }}>
            {histories?.docs?.map((e, i) => (
              <Tr key={i}>
                <Td p={{ base: 2, md: 5 }} bg="rgba(237, 247, 255, 1)" roundedLeft={10}>
                  <Flex alignItems="center" roundedLeft={10}>
                    <Currency value={e.transfer_amount} isWei />
                  </Flex>
                </Td>
                <Td p={{ base: 2, md: 5 }} bg="rgba(237, 247, 255, 1)">
                  <LinkCustom target="_blank" href={getTransactionHashUrl(e.transaction_hash)}>
                    <Flex alignItems="center" justifyContent="center" textAlign="center">
                      {formatAddress(e.transaction_hash)}
                    </Flex>
                  </LinkCustom>
                </Td>
                <Td p={{ base: 2, md: 5 }} bg="rgba(237, 247, 255, 1)">
                  <Flex alignItems="center" justifyContent="center" textAlign="center">
                    {dayjs.utc(e.timestamp * 1000).format('DD/MM/YYYY')}
                  </Flex>
                </Td>
                <Td p={{ base: 2, md: 5 }} bg="rgba(237, 247, 255, 1)" roundedRight={10}>
                  <Flex alignItems="center">
                    <Button
                      h={{ base: 10, md: '50px' }}
                      w="full"
                      color="green"
                      border="1px solid"
                      borderColor="green"
                      rounded={8}
                      px={5}
                      cursor="default"
                    >
                      AIRDROPPED
                    </Button>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Wrapper>
  );
}
