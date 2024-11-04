'use client';

import { useMemo, useState } from 'react';

import { Absolute, Button, Currency, FlexCol, LinkCustom, Pagination } from '@/components';
import { useCurrentTime } from '@/hooks/useCurrentTime';
import dayjs from '@/utils/dayjs';
import { InfoIcon } from '@chakra-ui/icons';
import {
  Box,
  Center,
  Flex,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Thead,
  Tr,
} from '@chakra-ui/react';

import { CollapseItem } from './CollapseItem';
import { useQueryCampaign } from './hooks/useQueryCampaign';

export default function CampainTable() {
  const currentTime = useCurrentTime();
  const [page, setPage] = useState(1);

  const params = useMemo(() => ({ page, limit: 10 }), [page]);
  const { data, isFetching } = useQueryCampaign(params);

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
                { name: 'Campaign', center: false, w: 288 },
                { name: 'Time' },
                {
                  name: (
                    <Flex gap={1}>
                      <Popover placement="top" trigger={'hover'}>
                        <PopoverTrigger>
                          <Button display="flex" h="fit-content" gap={1}>
                            SPW
                            <InfoIcon />
                          </Button>
                        </PopoverTrigger>
                        <Portal>
                          <PopoverContent w="fit-content" bg="black" rootProps={{ zIndex: 999 }}>
                            <PopoverBody>
                              <Box fontFamily="sfPro" fontWeight={800} color="white">
                                Score Per Week
                              </Box>
                            </PopoverBody>
                          </PopoverContent>
                        </Portal>
                      </Popover>
                    </Flex>
                  ),
                },
                { name: 'Eligible' },
                { name: 'Status', w: 288 },
              ].map((e, i) => (
                <Td
                  key={i}
                  p={0}
                  lineHeight={1.4}
                  textAlign={e.center === false ? undefined : 'center'}
                  pr={i === 0 ? { base: 2, md: 5 } : undefined}
                  px={i !== 0 ? { base: 2, md: 5 } : undefined}
                  w={e.w}
                >
                  {e.name}
                </Td>
              ))}
            </Tr>
          </Thead>
          <Tbody fontSize={{ base: 16, md: 20 }}>
            {data?.docs.map((campaign, i) => {
              const startTime = dayjs.utc(campaign.start_time);
              const endTime = dayjs.utc(campaign.end_time);
              return (
                <Tr key={i}>
                  <Td p={{ base: 2, md: 5 }} bg="rgba(237, 247, 255, 1)" roundedLeft={10}>
                    <CollapseItem campaign={campaign} />
                  </Td>
                  <Td p={{ base: 2, md: 5 }} bg="rgba(237, 247, 255, 1)">
                    <Flex alignItems="center" justifyContent="center" textAlign="center">
                      1 Week
                      {/* {startTime.isSame(endTime, 'year')
                        ? startTime.format('MMM DD')
                        : startTime.format('MMM DD, YYYY')}{' '}
                      - {endTime.format('MMM DD, YYYY')} */}
                    </Flex>
                  </Td>
                  <Td p={{ base: 2, md: 5 }} bg="rgba(237, 247, 255, 1)">
                    <Flex alignItems="center" justifyContent="center" textAlign="center" gap={2}>
                      <Currency value={campaign.score} />
                    </Flex>
                  </Td>
                  {/* <Td p={{ base: 2, md: 5 }} bg="rgba(237, 247, 255, 1)">
                    <Flex alignItems="center" justifyContent="center" textAlign="center" gap={2}>
                      <LinkCustom href="/profile">
                        <Button
                          h={{ base: 9, md: 10 }}
                          w="fit-content"
                          color="rgba(23, 210, 133, 1)"
                          border="1px solid"
                          borderColor="rgba(23, 210, 133, 1)"
                          rounded={8}
                          bg="white"
                          px={{ base: 4, md: 4 }}
                          cursor="default"
                        >
                          View
                        </Button>
                      </LinkCustom>
                    </Flex>
                  </Td> */}
                  <Td p={{ base: 2, md: 5 }} bg="rgba(237, 247, 255, 1)">
                    <Flex alignItems="center" justifyContent="center" textAlign="center" gap={2}>
                      {campaign.statusHold ? 'Yes' : 'No'}
                    </Flex>
                  </Td>
                  <Td p={{ base: 2, md: 5 }} bg="rgba(237, 247, 255, 1)" roundedRight={10}>
                    <Flex alignItems="center">
                      {currentTime > campaign.end_time ? (
                        <Button
                          h={{ base: 9, md: 10 }}
                          w="full"
                          color="rgba(23, 210, 133, 1)"
                          border="1px solid"
                          borderColor="rgba(23, 210, 133, 1)"
                          rounded={8}
                          bg="white"
                          px={{ base: 3, md: 5 }}
                          cursor="default"
                        >
                          Finished
                        </Button>
                      ) : currentTime < campaign.start_time ? (
                        <Button
                          h={{ base: 9, md: 10 }}
                          w="full"
                          color="rgba(253, 214, 75, 1)"
                          border="1px solid"
                          borderColor="rgba(253, 214, 75, 1)"
                          rounded={8}
                          bg="white"
                          px={{ base: 3, md: 5 }}
                          cursor="default"
                        >
                          Comming Soon
                        </Button>
                      ) : (
                        <Button
                          h={{ base: 9, md: 10 }}
                          w="full"
                          color="rgba(253, 214, 75, 1)"
                          border="1px solid"
                          borderColor="rgba(253, 214, 75, 1)"
                          rounded={8}
                          bg="white"
                          px={{ base: 3, md: 5 }}
                          cursor="default"
                        >
                          On Going
                        </Button>
                      )}
                    </Flex>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>

      {!!data?.totalPages && data?.totalPages > 1 && (
        <Pagination page={page} onChange={setPage} total={data?.totalPages ?? 0} />
      )}
    </FlexCol>
  );
}
