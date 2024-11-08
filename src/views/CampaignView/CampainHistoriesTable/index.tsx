'use client';

import { useMemo, useState } from 'react';

import { Absolute, Currency, FlexCol, Pagination } from '@/components';
import dayjs from '@/utils/dayjs';
import { Box, Center, Flex, Spinner, Table, TableContainer, Tbody, Td, Thead, Tr } from '@chakra-ui/react';

import { useQueryCampaignHistories } from './hooks/useQueryCampaignHistories';

export default function CampainHistoriesTable() {
  const [page, setPage] = useState(1);

  const params = useMemo(() => ({ page, limit: 10 }), [page]);
  const { data, isFetching } = useQueryCampaignHistories(params);

  console.log(data);
  return (
    <FlexCol w="full" gap={5} position="relative">
      {isFetching && (
        <Absolute as={Center} bg="rgba(0, 0, 0, 0.1)" zIndex={999}>
          <Spinner />
        </Absolute>
      )}
      <TableContainer w="full" pb={4}>
        <Table
          variant="unstyled"
          style={{ borderCollapse: 'separate', borderSpacing: '0 10px' }}
          fontFamily="sfPro"
          fontWeight={800}
        >
          <Thead>
            <Tr fontSize={{ base: 16, md: 20 }} color="rgba(172, 172, 172, 1)">
              {[
                { name: 'History', center: false, w: 288 },
                { name: 'Time' },
                { name: 'Jeets Index Score', w: 300 },
              ].map((e, i) => (
                <Td key={i} lineHeight={1.4} textAlign={e.center === false ? undefined : 'center'} p={0} px={5} w={e.w}>
                  {e.name}
                </Td>
              ))}
            </Tr>
          </Thead>
          <Tbody fontSize={{ base: 16, md: 20 }}>
            {data?.docs.map((his, i) => (
              <Tr key={i}>
                <Td p={5} bg="rgba(237, 247, 255, 1)" roundedLeft={10}>
                  {['Sent', 'Received', 'Bought', 'Sold'].includes(his.event) ? (
                    <Flex lineHeight={1.4} gap={1} alignContent="center">
                      {his.event}
                      <Box gap={1}>
                        <Currency value={his.detail?.amount} decimalNumber={his.detail?.decimal} /> {his.detail?.symbol}
                      </Box>
                    </Flex>
                  ) : his.event === 'Voted' ? (
                    <Flex lineHeight={1.4} gap={1} alignContent="center">
                      {his.event}
                    </Flex>
                  ) : his.event === 'StartHold' ? (
                    <Flex lineHeight={1.4} gap={1} alignContent="center">
                      Hold {his.detail?.symbol}
                    </Flex>
                  ) : (
                    <Flex lineHeight={1.4} gap={1} alignContent="center">
                      Hold
                      {his.campaign?.details.map((e, i) => (
                        <Box key={i} gap={1}>
                          {i !== 0 && ' & '}
                          <Currency value={e.amount} decimalNumber={e.decimal} /> {e.symbol}
                        </Box>
                      ))}
                    </Flex>
                  )}
                </Td>
                <Td p={{ base: 2, md: 5 }} bg="rgba(237, 247, 255, 1)">
                  <Flex alignItems="center" justifyContent="center" textAlign="center">
                    {dayjs.utc(his.timestamp).format('MMM DD, YYYY')}
                  </Flex>
                </Td>
                <Td p={5} bg="rgba(237, 247, 255, 1)" roundedRight={10}>
                  <Flex
                    lineHeight={1.4}
                    color={his.score < 0 ? 'rgba(242, 48, 48, 1)' : 'rgba(23, 210, 133, 1)'}
                    justifyContent="center"
                  >
                    <Currency value={his.score} prefix={his.score < 0 ? '' : '+'} />
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {!!data?.totalPages && data?.totalPages > 1 && (
        <Pagination page={page} onChange={setPage} total={data?.totalPages ?? 0} />
      )}
    </FlexCol>
  );
}
