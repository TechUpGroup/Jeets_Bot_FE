'use client';

import { Currency, FlexBanner, FlexCol, Title, Wrapper } from '@/components';
import { Box, Flex, Table, TableContainer, Tbody, Td, Thead, Tr } from '@chakra-ui/react';

export default function ProfileView() {
  return (
    <Wrapper>
      <Title>PROFILE</Title>
      <FlexBanner>
        <FlexCol justifyContent="center" alignItems="center" flex={1} gap={2.5}>
          <Box fontSize={30} fontFamily="sfPro" fontWeight={800}>
            Total Jeets Score
          </Box>
          <Box color="rgba(143, 81, 236, 1)" fontSize={42}>
            <Currency value={4_000_000} />
          </Box>
        </FlexCol>
      </FlexBanner>

      <TableContainer w="full" pb={4}>
        <Table variant="unstyled">
          <Thead>
            <Tr fontFamily="sfPro" fontWeight={800} fontSize={{ base: 16, md: 20 }} color="rgba(172, 172, 172, 1)">
              <Td p={0} lineHeight={1.4} px={5}>
                History
              </Td>
              <Td p={0} lineHeight={1.4} textAlign="center" w={300} px={5}>
                Jeets Score
              </Td>
            </Tr>
          </Thead>
          <Tbody fontSize={{ base: 16, md: 20 }} fontFamily="sfPro" fontWeight={800}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Tr key={i}>
                <Td px={0} pb={0} pt={2.5}>
                  <Flex roundedLeft={10} p={5} bg="rgba(237, 247, 255, 1)" lineHeight={1.4}>
                    Hold 10,000 $MOON
                  </Flex>
                </Td>
                <Td px={0} pb={0} pt={2.5}>
                  <Flex
                    roundedLeft={10}
                    p={5}
                    bg="rgba(237, 247, 255, 1)"
                    lineHeight={1.4}
                    color="rgba(23, 210, 133, 1)"
                    justifyContent="center"
                  >
                    <Currency value={2_000} prefix="+" />
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
