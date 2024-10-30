'use client';

import { useMemo } from 'react';

import { Currency, FlexBanner, FlexCenter, FlexCol, ImageRatio, Title, Wrapper } from '@/components';
import { useUser } from '@/store/useUserStore';
import { Box, Flex, Table, TableContainer, Tbody, Td, Thead, Tr } from '@chakra-ui/react';

import { useQueryCampaignHistories } from './hooks/useQueryCampaignHistories';

export default function ProfileView() {
  const { data } = useQueryCampaignHistories();
  const user = useUser();

  const imageXVerified = useMemo(() => {
    switch (user?.twitter_verified_type) {
      case 'blue':
        return '/icons/tick-2.png';
      case 'business':
        return '/icons/tick-1.png';
      case 'government':
        return '/icons/tick-3.png';
    }
  }, [user?.twitter_verified_type]);

  return (
    <Wrapper>
      <Title>PROFILE</Title>
      <Flex
        gap={10}
        rounded={10}
        bg="rgba(238, 226, 255, 1)"
        w="full"
        px={{ base: 3, md: 6, lg: 8, xl: '46px', '2xl': '56px' }}
        py={{ base: 4, md: '54px' }}
      >
        <FlexCol justifyContent="center" alignItems="center" flex={1} gap={'5px'}>
          <Box fontSize={{ base: 18, md: 22 }} fontFamily="sfPro" fontWeight={800}>
            X Account
          </Box>
          <Box color="purple" fontSize={{ base: 28, md: 40 }}>
            <FlexCenter gap={2.5}>
              {user?.twitter_username}
              {!!imageXVerified && <ImageRatio src={imageXVerified} ratio={1} w={6} />}
            </FlexCenter>
          </Box>
        </FlexCol>
        <FlexCol justifyContent="center" alignItems="center" flex={1} gap={'5px'}>
          <Box fontSize={{ base: 18, md: 22 }} fontFamily="sfPro" fontWeight={800}>
            Followers
          </Box>
          <Box color="purple" fontSize={{ base: 28, md: 40 }}>
            <Currency value={user?.twitter_followers_count} />
          </Box>
        </FlexCol>
        {user?.partner && (
          <FlexCol justifyContent="center" alignItems="center" flex={1} gap={'5px'}>
            <Box fontSize={{ base: 18, md: 22 }} fontFamily="sfPro" fontWeight={800}>
              Token Hold
            </Box>
            <Box color="purple" fontSize={{ base: 28, md: 40 }}>
              <Currency value={user?.partner.amount} decimalNumber={user?.partner.decimal} /> {user?.partner.symbol}
            </Box>
          </FlexCol>
        )}
        <FlexCol justifyContent="center" alignItems="center" flex={1} gap={'5px'}>
          <Box fontSize={{ base: 18, md: 22 }} fontFamily="sfPro" fontWeight={800}>
            Total Jeets Score
          </Box>
          <Box color="purple" fontSize={{ base: 28, md: 40 }}>
            <Currency value={user?.score} />
          </Box>
        </FlexCol>
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
                { name: 'History', center: false, w: 288 },
                { name: 'Jeets Score', w: 300 },
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
    </Wrapper>
  );
}
