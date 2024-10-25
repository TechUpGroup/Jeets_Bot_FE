'use client';

import { Currency, FlexBanner, FlexCenter, FlexCol, Title, Wrapper } from '@/components';
import { useUser } from '@/store/useUserStore';
import { Box, Flex, Table, TableContainer, Tbody, Td, Thead, Tr } from '@chakra-ui/react';

import { useQueryCampaignHistories } from './hooks/useQueryCampaignHistories';

export default function ProfileView() {
  const { data } = useQueryCampaignHistories();
  const user = useUser();
  return (
    <Wrapper>
      <Title>PROFILE</Title>
      <FlexBanner>
        <FlexCol justifyContent="center" alignItems="center" flex={1} gap={2.5}>
          <Box fontSize={30} fontFamily="sfPro" fontWeight={800}>
            Total Jeets Score
          </Box>
          <Box color="purple" fontSize={42}>
            <Currency value={user?.score} />
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
                  <Flex lineHeight={1.4} gap={1} alignContent="center">
                    Hold
                    {his.campaign.details.map((e, i) => (
                      <Box key={i} gap={1}>
                        {i !== 0 && ' & '}
                        <Currency value={e.amount} decimalNumber={e.decimal} /> {e.symbol}
                      </Box>
                    ))}
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
    </Wrapper>
  );
}
