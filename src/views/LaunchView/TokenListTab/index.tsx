'use client';

import BigNumber from 'bignumber.js';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import {
  Button,
  Currency,
  FlexCenter,
  FlexContent,
  ImageRatio,
  InputForm,
  LinkCustom,
  Pagination,
  SelectForm,
  Title2,
} from '@/components';
import { SearchIcon } from '@/components/Icons';
import { useDebounce } from '@/hooks/useDebounce';
import { Box, Flex, Table, TableContainer, Tbody, Td, Thead, Tr } from '@chakra-ui/react';

import { useQueryTokenList } from './hooks/useQueryTokenList';

const options = [
  { value: 'current_price', label: 'Price' },
  { value: 'totalHolders', label: 'Holder' },
  { value: 'saleProgress', label: 'Sale Progress' },
];

export default function TokenListTab() {
  const router = useRouter();
  const [sortBy, setSortBy] = useState(options[0]);
  const [sortType, setSortType] = useState<string>('desc');
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState(1);

  const searchDeb = useDebounce(search, 300);

  const params = useMemo(
    () => ({ page, limit: 10, sortBy: sortBy.value, sortType, search: searchDeb }),
    [page, sortBy, sortType, searchDeb],
  );
  const { data } = useQueryTokenList(params);

  return (
    <FlexContent w="full">
      <Title2>TOKEN LIST</Title2>
      <Flex justifyContent="space-between" alignItems="center" w="full" fontFamily="sfPro" fontWeight={400} gap={2}>
        <Box pos="relative">
          <Flex alignItems="center" pos="absolute" left={0} top={0} h="full" pl={3} zIndex={2}>
            <SearchIcon />
          </Flex>
          <InputForm
            pl="44px"
            placeholder="Search token..."
            borderColor="black"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>

        <FlexCenter gap={2.5}>
          <Box style={{ textWrap: 'nowrap' }}>Sort by</Box>
          <SelectForm options={options} value={sortBy} onChange={(e: any) => setSortBy(e)} />
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
                { name: 'Price/Slot' },
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
              <Tr key={i} onClick={() => router.push(`/launch/${token.mint}`)} cursor="pointer">
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
                  <Currency value={token.price_sol_per_token} suffix=" SOL" />
                </Td>
                <Td px={{ base: 2, md: 5 }} py={{ base: 1.5, md: 2.5 }} bg="rgba(237, 247, 255, 1)" textAlign="center">
                  <Currency value={token.totalHolders} />
                </Td>
                <Td px={{ base: 2, md: 5 }} py={{ base: 1.5, md: 2.5 }} bg="rgba(237, 247, 255, 1)" textAlign="center">
                  <Currency value={BigNumber(token.saleProgress).multipliedBy(100)} decimal={2} suffix="%" />
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
                      w="full"
                      fontFamily="titanOne"
                      fontWeight={400}
                      fontSize={20}
                      color="white"
                      rounded={8}
                      px={5}
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

      {!!data?.totalPages && data?.totalPages > 1 && (
        <Pagination page={page} onChange={setPage} total={data?.totalPages ?? 0} />
      )}
    </FlexContent>
  );
}
