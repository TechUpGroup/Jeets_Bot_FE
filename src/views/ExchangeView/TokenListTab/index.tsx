'use client';

import { useMemo, useState } from 'react';

import { Button, Currency, FlexCenter, FlexContent, ImageRatio, LinkCustom, Pagination, Title2 } from '@/components';
import { useDebounce } from '@/hooks/useDebounce';
import { Box, Flex, Select, Table, TableContainer, Tbody, Td, Thead, Tr } from '@chakra-ui/react';

import { useQueryTokenList } from './hooks/useQueryTokenList';

export default function TokenListTab() {
  const [sortBy, setSortBy] = useState<string>('current_price');
  const [sortType, setSortType] = useState<string>('desc');
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState(1);

  const searchDeb = useDebounce(search, 300);

  const params = useMemo(
    () => ({ page, limit: 10, sortBy, sortType, search: searchDeb }),
    [page, sortBy, sortType, searchDeb],
  );
  const { data } = useQueryTokenList(params);

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
        <Table
          variant="unstyled"
          style={{ borderCollapse: 'separate', borderSpacing: '0 10px' }}
          fontFamily="sfPro"
          fontWeight={800}
        >
          <Thead>
            <Tr fontSize={{ base: 16, md: 20 }} color="rgba(172, 172, 172, 1)">
              {[
                { name: 'Token', center: false },
                { name: 'Price/Token' },
                { name: 'Holder' },
                { name: 'Sale Progress' },
                { name: '', w: 209 },
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
          <Tbody fontSize={{ base: 16, md: 16 }}>
            {data?.docs.map((token, i) => (
              <Tr key={i}>
                <Td px={{ base: 2, md: 5 }} py={{ base: 1.5, md: 2.5 }} bg="rgba(237, 247, 255, 1)" roundedLeft={10}>
                  <FlexCenter gap={2.5}>
                    <ImageRatio
                      src={token.image_uri ?? 'https://placehold.co/30x30/png'}
                      ratio={1}
                      w="30px"
                      rounded={999}
                      overflow="hidden"
                    />
                    {token.name}
                  </FlexCenter>
                </Td>
                <Td px={{ base: 2, md: 5 }} py={{ base: 1.5, md: 2.5 }} bg="rgba(237, 247, 255, 1)" textAlign="center">
                  <Currency value={token.current_price} prefix="$" />
                </Td>
                <Td px={{ base: 2, md: 5 }} py={{ base: 1.5, md: 2.5 }} bg="rgba(237, 247, 255, 1)" textAlign="center">
                  <Currency value={token.totalHolders} />
                </Td>
                <Td px={{ base: 2, md: 5 }} py={{ base: 1.5, md: 2.5 }} bg="rgba(237, 247, 255, 1)" textAlign="center">
                  {token.saleProgress * 100}%
                </Td>
                <Td
                  px={{ base: 2, md: 5 }}
                  py={{ base: 1.5, md: 2.5 }}
                  bg="rgba(237, 247, 255, 1)"
                  roundedBottomRight={10}
                >
                  <Flex justifyContent="end">
                    <LinkCustom href={`/exchange/${token.mint}`} maxW={169} w="full">
                      <Button
                        bg="makeColor"
                        h={10}
                        w="full"
                        fontFamily="titanOne"
                        fontWeight={400}
                        fontSize={20}
                        color="white"
                        rounded={8}
                      >
                        BUY
                      </Button>
                    </LinkCustom>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Pagination page={page} onChange={setPage} total={data?.totalPages ?? 0} />
    </FlexContent>
  );
}
