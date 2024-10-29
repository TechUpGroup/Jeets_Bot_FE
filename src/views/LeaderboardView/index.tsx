'use client';

import { useState } from 'react';

import { Currency, ImageRatio, Title, Wrapper } from '@/components';
import { Box, Flex, Table, TableContainer, Tbody, Td, Thead, Tr } from '@chakra-ui/react';

import { useQueryLeaderboard } from './hooks/useQueryLeaderboard';

export default function LeaderboardView() {
  const [type, setType] = useState<'W' | 'M' | 'Y' | 'D'>('W');
  const { data: leaderboardList } = useQueryLeaderboard(type);

  return (
    <Wrapper>
      <Title textTransform="uppercase">leaderboard</Title>
      <Flex justifyContent="center" gap={{ base: 2.5, md: '30px' }} w="full" fontSize={{ base: 14, md: 16 }}>
        {[
          // { name: 'Day', value: 'D' },
          { name: 'Week', value: 'W' },
          { name: 'Month', value: 'M' },
          { name: 'Year', value: 'Y' },
        ].map((e, i) => (
          <Box
            key={i}
            onClick={() => setType(e.value as any)}
            cursor="pointer"
            color={type === e.value ? '#904EEC' : '#201B03'}
            rounded={10}
            border="1px solid"
            borderColor={type === e.value ? '#904EEC' : '#ACACAC'}
            bg={type === e.value ? '#DBC2FF' : undefined}
            py={{ base: 2, md: 3 }}
            px={{ base: 4, md: 5 }}
          >
            {e.name}
          </Box>
        ))}
      </Flex>
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
                { name: 'Rank', center: false },
                { name: 'Jeets Score Rewards', w: 420 },
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
            {!!leaderboardList?.user && (
              <Tr>
                <Td p={{ base: 2, md: 5 }} bg="#F3EBFF" roundedLeft={10}>
                  <Flex alignItems="center" gap={2.5}>
                    <Box>#{leaderboardList.user.rank}</Box>
                    <ImageRatio
                      originalImage
                      src={leaderboardList.user.twitter_avatar ?? 'https://placehold.co/30x30/png'}
                      ratio={1}
                      w="52px"
                      rounded={999}
                      overflow="hidden"
                    />
                    <Box>#{leaderboardList.user.twitter_username}</Box>
                    <Box bg="#904EEC" fontSize={14} rounded={10} py="5px" px={2.5} color="white">
                      You
                    </Box>
                  </Flex>
                </Td>
                <Td p={{ base: 2, md: 5 }} bg="#F3EBFF" roundedRight={10}>
                  <Flex alignItems="center" justifyContent="center" textAlign="center" w="full">
                    <Currency value={leaderboardList.user.totalScore} />
                  </Flex>
                </Td>
              </Tr>
            )}
            {leaderboardList?.topScores.map(
              (e, i) =>
                e.rank !== leaderboardList?.user?.rank && (
                  <Tr key={i}>
                    <Td p={{ base: 2, md: 5 }} bg="rgba(237, 247, 255, 1)" roundedLeft={10}>
                      <Flex alignItems="center" gap={2.5}>
                        <Box>#{e.rank}</Box>
                        <ImageRatio
                          originalImage
                          src={e.twitter_avatar ?? 'https://placehold.co/30x30/png'}
                          ratio={1}
                          w="52px"
                          rounded={999}
                          overflow="hidden"
                        />
                        <Box>#{e.twitter_username}</Box>
                      </Flex>
                    </Td>
                    <Td p={{ base: 2, md: 5 }} bg="rgba(237, 247, 255, 1)" roundedRight={10}>
                      <Flex alignItems="center" justifyContent="center" textAlign="center" w="full">
                        <Currency value={e.totalScore} />
                      </Flex>
                    </Td>
                  </Tr>
                ),
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Wrapper>
  );
}
