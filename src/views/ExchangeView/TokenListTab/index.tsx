import { Button, Currency, FlexCenter, FlexContent, ImageRatio, LinkCustom, Pagination, Title2 } from '@/components';
import { getTransactionHashUrl } from '@/utils';
import { formatAddress } from '@/utils/address';
import dayjs from '@/utils/dayjs';
import { Box, Flex, Select, Table, TableContainer, Tbody, Td, Thead, Tr } from '@chakra-ui/react';

const tableHeaders = [
  { name: 'Token', center: false },
  { name: 'Price/Token' },
  { name: 'Holder' },
  { name: 'Sale Progress' },
  { name: '', w: 209 },
];

export default function TokenListTab() {
  return (
    <FlexContent w="full">
      <Title2>TOKEN LIST</Title2>
      <Flex justifyContent="space-between" alignItems="center" w="full" fontFamily="sfPro" fontWeight={400}>
        <Box>Search</Box>
        <FlexCenter gap={2.5}>
          <Box style={{ textWrap: 'nowrap' }}>Sort by</Box>
          <Select fontSize={14} borderColor="black" rounded={12}>
            <option value="1">Price</option>
          </Select>
        </FlexCenter>
      </Flex>
      <TableContainer w="full" pb={4}>
        <Table variant="unstyled" style={{ borderCollapse: 'separate', borderSpacing: '0 10px' }}>
          <Thead>
            <Tr fontFamily="sfPro" fontWeight={800} fontSize={{ base: 16, md: 20 }} color="rgba(172, 172, 172, 1)">
              {tableHeaders.map((e, i) => (
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
          <Tbody fontSize={{ base: 16, md: 16 }} fontFamily="sfPro" fontWeight={800}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Tr key={i}>
                <Td px={{ base: 2, md: 5 }} py={{ base: 1.5, md: 2.5 }} bg="rgba(237, 247, 255, 1)" roundedLeft={10}>
                  <FlexCenter gap={2.5}>
                    <ImageRatio
                      src="https://placehold.co/30x30/png"
                      ratio={1}
                      w="30px"
                      rounded={999}
                      overflow="hidden"
                    />
                    ordi
                  </FlexCenter>
                </Td>
                <Td px={{ base: 2, md: 5 }} py={{ base: 1.5, md: 2.5 }} bg="rgba(237, 247, 255, 1)" textAlign="center">
                  <Currency value={37.281} prefix="$" />
                </Td>
                <Td px={{ base: 2, md: 5 }} py={{ base: 1.5, md: 2.5 }} bg="rgba(237, 247, 255, 1)" textAlign="center">
                  <Currency value={100} />
                </Td>
                <Td px={{ base: 2, md: 5 }} py={{ base: 1.5, md: 2.5 }} bg="rgba(237, 247, 255, 1)" textAlign="center">
                  70%
                </Td>
                <Td
                  px={{ base: 2, md: 5 }}
                  py={{ base: 1.5, md: 2.5 }}
                  bg="rgba(237, 247, 255, 1)"
                  roundedBottomRight={10}
                >
                  <Flex justifyContent="end">
                    <Button
                      bg="makeColor"
                      h={10}
                      maxW={169}
                      w="full"
                      fontFamily="titanOne"
                      fontWeight={400}
                      fontSize={20}
                      color="white"
                      rounded={8}
                    >
                      BUY
                    </Button>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Pagination total={10} initialPage={1} />
    </FlexContent>
  );
}
