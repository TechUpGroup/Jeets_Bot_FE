import {
  Currency,
  FlexBanner,
  FlexCenter,
  FlexCol,
  FlexContent,
  ImageRatio,
  LinkCustom,
  Title,
  Title2,
} from '@/components';
import { getTransactionHashUrl } from '@/utils';
import { formatAddress } from '@/utils/address';
import dayjs from '@/utils/dayjs';
import { useQueryHistories, useQueryHistoriesRemain } from '@/views/PoolView/hooks/useQueryHistories';
import { Box, Button, Flex, Table, TableContainer, Tbody, Td, Thead, Tr } from '@chakra-ui/react';

export default function TokenListTab() {
  const { data: histories } = useQueryHistories();
  const { data: remaining } = useQueryHistoriesRemain();
  return (
    <FlexContent>
      <Title2>TOKEN LIST</Title2>
      <FlexBanner>
        <FlexCol justifyContent="center" alignItems="center" flex={1} gap={2.5}>
          <Flex
            flexDir={{ base: 'column', md: 'row' }}
            fontSize={{ base: 24, md: 52 }}
            textAlign="center"
            color="purple"
            gap={2.5}
            alignItems="center"
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
        <Table variant="unstyled">
          <Thead>
            <Tr fontFamily="sfPro" fontWeight={800} fontSize={{ base: 16, md: 20 }} color="rgba(172, 172, 172, 1)">
              <Td p={0} lineHeight={1.4} w={288}>
                Amount
              </Td>
              <Td p={0} lineHeight={1.4} textAlign="center">
                Transactions
              </Td>
              <Td p={0} lineHeight={1.4} textAlign="center">
                Deposit time
              </Td>
              <Td p={0} lineHeight={1.4} textAlign="center" w={288}>
                Status
              </Td>
            </Tr>
          </Thead>
          <Tbody fontSize={{ base: 16, md: 20 }}>
            {histories?.docs?.map((e, i) => (
              <Tr key={i}>
                <Td px={0} pb={0} pt={2.5}>
                  <Flex
                    alignItems="center"
                    bg="rgba(237, 247, 255, 1)"
                    h={{ base: '72px', md: '90px' }}
                    roundedLeft={10}
                    px={5}
                    fontFamily="sfPro"
                    fontWeight={800}
                  >
                    <Currency value={e.transfer_amount} isWei />
                  </Flex>
                </Td>
                <Td px={0} pb={0} pt={2.5}>
                  <LinkCustom target="_blank" href={getTransactionHashUrl(e.transaction_hash)}>
                    <Flex
                      alignItems="center"
                      justifyContent="center"
                      bg="rgba(237, 247, 255, 1)"
                      h={{ base: '72px', md: '90px' }}
                      fontFamily="sfPro"
                      fontWeight={800}
                      textAlign="center"
                    >
                      {formatAddress(e.transaction_hash)}
                    </Flex>
                  </LinkCustom>
                </Td>
                <Td px={0} pb={0} pt={2.5}>
                  <Flex
                    alignItems="center"
                    justifyContent="center"
                    bg="rgba(237, 247, 255, 1)"
                    h={{ base: '72px', md: '90px' }}
                    fontFamily="sfPro"
                    fontWeight={800}
                    textAlign="center"
                  >
                    {dayjs.utc(e.timestamp * 1000).format('DD/MM/YYYY')}
                  </Flex>
                </Td>
                <Td px={0} pb={0} pt={2.5}>
                  <Flex
                    alignItems="center"
                    bg="rgba(237, 247, 255, 1)"
                    h={{ base: '72px', md: '90px' }}
                    roundedRight={10}
                    px={5}
                  >
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
    </FlexContent>
  );
}
