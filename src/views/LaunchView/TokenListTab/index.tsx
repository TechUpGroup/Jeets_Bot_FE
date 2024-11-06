'use client';

import BigNumber from 'bignumber.js';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import {
  Button,
  Currency,
  FlexCenter,
  FlexCol,
  FlexContent,
  ImageRatio,
  InputForm,
  Pagination,
  SelectForm,
  Title2,
} from '@/components';
import { SearchIcon } from '@/components/Icons';
import { useDebounce } from '@/hooks/useDebounce';
import { AspectRatio, Box, Flex, Image, SimpleGrid, Skeleton } from '@chakra-ui/react';

import { useQueryTokenList } from './hooks/useQueryTokenList';

const options = [
  { value: 'current_price', label: 'Price' },
  { value: 'totalHolders', label: 'Holder' },
  { value: 'Progress', label: 'Progress' },
];

export default function TokenListTab() {
  const router = useRouter();
  const [sortBy, setSortBy] = useState(options[0]);
  const [sortType, setSortType] = useState<string>('desc');
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState(1);

  const searchDeb = useDebounce(search, 300);

  const params = useMemo(
    () => ({ page, limit: 12, sortBy: sortBy.value, sortType, search: searchDeb }),
    [page, sortBy, sortType, searchDeb],
  );
  const { data, isLoading } = useQueryTokenList(params);

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
      <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={4} w="full">
        {isLoading && Array.from({ length: 12 }).map((_, i) => <Skeleton key={i} w="full" h={'419px'} rounded={24} />)}

        {data?.docs.map((token, i) => (
          <FlexCol
            key={i}
            rounded={24}
            bg="rgba(237, 247, 255, 1)"
            p={4}
            w="full"
            cursor="pointer"
            onClick={() => router.push(`/launch/${token.mint}`)}
          >
            <Box w="full" pos="relative">
              <AspectRatio ratio={355 / 240} rounded={20} overflow="hidden" bg="black">
                <Image src={token.image_uri ?? 'https://placehold.co/30x30/png'} w="full" h="full" alt="" />
              </AspectRatio>

              <Box pos="absolute" bottom={-6} left={3} p={1} rounded={16} bg="rgba(237, 247, 255, 1)">
                <ImageRatio
                  src={token.image_uri ?? 'https://placehold.co/30x30/png'}
                  ratio={1}
                  w={20}
                  rounded={16}
                  overflow="hidden"
                />
              </Box>
            </Box>
            <FlexCol pt={10} lineHeight={1.4} fontFamily="sfPro">
              <Flex gap={{ base: 3, xl: 3 }} justifyContent="space-between">
                {[
                  { name: 'Price/Slot', value: <Currency value={token.price_sol_per_token} suffix=" SOL" /> },
                  { name: 'Holder', value: <Currency value={token.totalHolders} /> },
                  {
                    name: 'Sale Progress',
                    value: <Currency value={BigNumber(token.saleProgress).multipliedBy(100)} decimal={2} suffix="%" />,
                  },
                ].map((e, i) => (
                  <FlexCol key={i} gap={1}>
                    <Box fontSize={12} fontWeight={500} color="rgba(142, 142, 147, 1)">
                      {e.name}
                    </Box>
                    <Box fontSize={16} fontWeight={800} color="black">
                      {e.value}
                    </Box>
                  </FlexCol>
                ))}
              </Flex>
              <Box my={3} w="full" borderBottom="1px solid rgba(192, 192, 192, 1)" />
              <Flex justifyContent="space-between" gap={2}>
                <Box fontSize={16} fontWeight={800}>
                  {token.name}
                </Box>
                <Button
                  bg="makeColor"
                  h={10}
                  minW={169}
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
            </FlexCol>
          </FlexCol>
        ))}
      </SimpleGrid>

      {!!data?.totalPages && data?.totalPages > 1 && (
        <Pagination page={page} onChange={setPage} total={data?.totalPages ?? 0} />
      )}
    </FlexContent>
  );
}
