'use client';

import { Button, Currency, FlexBanner, FlexCol, Title, Wrapper } from '@/components';
import { Box, Collapse, Flex, Table, TableContainer, Tbody, Td, Thead, Tr } from '@chakra-ui/react';

import { CollapseItem } from './CollapseItem';

export default function CampaignView() {
  return (
    <Wrapper>
      <Title>CAMPAIGN</Title>
      <FlexBanner>
        <FlexCol justifyContent="center" alignItems="center" flex={1} gap={2.5}>
          <Box fontSize={30} fontFamily="sfPro" fontWeight={800}>
            Campaign in week
          </Box>
          <Box color="rgba(143, 81, 236, 1)" fontSize={42}>
            Oct 21 - oct 27, 2024
          </Box>
        </FlexCol>
      </FlexBanner>

      <TableContainer w="full" pb={4}>
        <Table variant="unstyled" style={{ borderCollapse: 'separate', borderSpacing: '0 10px' }}>
          <Thead>
            <Tr fontFamily="sfPro" fontWeight={800} fontSize={{ base: 16, md: 20 }} color="rgba(172, 172, 172, 1)">
              <Td p={0} lineHeight={1.4} w={288} pr={5}>
                Campaign
              </Td>
              <Td p={0} lineHeight={1.4} textAlign="center" px={5}>
                Time
              </Td>
              <Td p={0} lineHeight={1.4} textAlign="center" px={5}>
                Jeets Score Rewards
              </Td>
              <Td p={0} lineHeight={1.4} textAlign="center" w={288} px={5}>
                Status
              </Td>
            </Tr>
          </Thead>
          <Tbody fontSize={{ base: 16, md: 20 }} fontFamily="sfPro" fontWeight={800}>
            {Array.from({ length: 10 }).map((_, i) => (
              <Tr key={i}>
                <Td p={5} bg="rgba(237, 247, 255, 1)" roundedLeft={10}>
                  <CollapseItem />
                </Td>
                <Td p={5} bg="rgba(237, 247, 255, 1)">
                  <Flex alignItems="center" justifyContent="center" textAlign="center">
                    Oct 21 - Oct 27, 2024
                  </Flex>
                </Td>
                <Td p={5} bg="rgba(237, 247, 255, 1)">
                  <Flex alignItems="center" justifyContent="center" textAlign="center">
                    <Currency value={2_000} />
                  </Flex>
                </Td>

                <Td p={5} bg="rgba(237, 247, 255, 1)" roundedRight={10}>
                  <Flex alignItems="center">
                    <Button
                      h={{ base: 10 }}
                      w="full"
                      color="rgba(253, 214, 75, 1)"
                      border="1px solid"
                      borderColor="rgba(253, 214, 75, 1)"
                      rounded={8}
                      bg="white"
                      px={5}
                      cursor="default"
                    >
                      On Going
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
