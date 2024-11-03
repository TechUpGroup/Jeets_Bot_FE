'use client';

import BigNumber from 'bignumber.js';
import { useRouter } from 'next/navigation';

import { Button, Currency, FlexCol, FlexContent, ImageRatio, LinkCustom, Title2, Wrapper } from '@/components';
import { useQuerySolPrice } from '@/hooks/useQuerySolPrice';
import { formatAddress } from '@/utils/address';
import { Box, Flex, SimpleGrid, Spinner, Tab, Tabs } from '@chakra-ui/react';

import { HoldersDistribution } from './HoldersDistribution';
import { useQueryTokenDetail } from './hooks/useQueryTokenDetail';
import { SwapToken } from './SwapToken';
import { TradeComponent } from './TradeComponent';

const tabs = [
  { name: 'Token List', href: '/launch?tab=0' },
  { name: 'Launch A Token', href: '/launch?tab=1' },
  { name: 'My Token', href: '/launch?tab=2' },
];

export default function LaunchDetailView({ mint }: { mint: string }) {
  const router = useRouter();
  const { data: solPrice } = useQuerySolPrice();
  const { data, isLoading } = useQueryTokenDetail(mint);
  return (
    <Wrapper
      as={Tabs}
      variant="unstyled"
      maxW={1680}
      flexDir={{ base: 'column', md: 'row' }}
      gap={6}
      bg="unset"
      alignItems="start"
      px={0}
      pt={{ base: 0, md: 6 }}
      index={0}
      lineHeight={1.4}
    >
      <FlexContent maxW={{ base: 'full', md: 300, lg: 320, xl: 350, '2xl': 402 }} w="full" flex="unset" gap={5}>
        <Title2>Launch</Title2>
        <SimpleGrid columns={{ base: 3, md: 1 }} gap={5} w="full">
          {tabs.map((tab) => (
            <Tab
              as={LinkCustom}
              href={tab.href}
              key={tab.name}
              w="full"
              _selected={{ color: 'white', bg: 'purple' }}
              bg="rgba(237, 247, 255, 1)"
              fontSize={{ base: 14, md: 20 }}
              lineHeight={1.4}
              px={{ base: 2, md: 5 }}
              py={{ base: 3, md: 5 }}
              rounded={10}
              textAlign="center"
            >
              {tab.name}
            </Tab>
          ))}
        </SimpleGrid>
      </FlexContent>
      {isLoading || !data ? (
        <FlexContent w="full" justifyContent="center" alignItems="center" minH={350}>
          {isLoading ? <Spinner /> : <Box>Token not found</Box>}
        </FlexContent>
      ) : (
        <FlexContent w="full" fontFamily="sfPro" fontWeight={600} lineHeight={1.4}>
          <Flex justifyContent="space-between" alignItems="center" w="full">
            <Button fontSize={20} fontWeight={600} onClick={router.back} color="purple" textDecor="underline">
              Back
            </Button>
            <Title2 fontFamily="titanOne" fontWeight={400}>
              TOKEN DETAILS
            </Title2>
            <Button fontSize={20} fontWeight={600} visibility="hidden">
              Back
            </Button>
          </Flex>

          <Flex gap={4} alignItems="center" w="full">
            <ImageRatio
              src={data.mintToken?.image_uri ?? 'https://placehold.co/100x100/png'}
              ratio={1}
              border="0.67px solid rgba(16, 16, 16, 1)"
              w={{ base: 83, md: 83 }}
              rounded="5.33px"
              overflow="hidden"
            />
            <FlexCol>
              <Box fontSize={20}>{data.mintToken?.name}</Box>
              <Flex
                bg="rgba(237, 247, 255, 1)"
                rounded="full"
                p={2.5}
                justifyContent="center"
                alignItems="center"
                gap={2}
              >
                <ImageRatio src="/icons/solana.png" ratio={1} w={6} rounded={999} overflow="hidden" />
                <Box fontSize={14} fontWeight={500}>
                  Solana
                </Box>
              </Flex>
            </FlexCol>
          </Flex>

          <FlexCol fontSize={{ base: 28, md: 36 }} w="full">
            <Box>{data.mintToken?.symbol}</Box>
            <Box>
              <Currency value={data.mintToken?.current_price} prefix="$" />
            </Box>
          </FlexCol>

          <Flex
            border="1px solid black"
            rounded={12}
            px={{ base: 2.5, md: 6 }}
            py={{ base: 2.5, md: 4 }}
            w="full"
            gap={{ base: 3, md: 5, lg: 6, xl: 8, '2xl': 10 }}
            flexDir={{ base: 'column', md: 'row' }}
            alignItems="stretch"
            textAlign="center"
          >
            <FlexCol gap={1.5} flex={1} alignItems="center" justifyContent="center">
              <Box color="rgba(131, 131, 131, 1)" fontSize={14} fontWeight={400}>
                Wallet address
              </Box>
              <Box fontSize={16} fontWeight={600}>
                {formatAddress(data.mintToken?.mint, 6, 4)}
              </Box>
            </FlexCol>
            <LineCustom />
            <FlexCol gap={1.5} flex={1} alignItems="center" justifyContent="center">
              <Box color="rgba(131, 131, 131, 1)" fontSize={14}>
                Raydium Process
              </Box>
              <Box fontSize={16} fontWeight={600}>
                <Currency
                  value={BigNumber(data.mintToken?.virtual_sol_reserves || 0)
                    .dividedBy(data.mintToken?.total_sol_receive || 1)
                    .multipliedBy(100)}
                  decimal={2}
                  suffix="%"
                />
                {/* {data.mintToken?.trade_completed ? 'Closed' : 'Opening'} */}
              </Box>
            </FlexCol>
            <LineCustom />
            <FlexCol gap={1.5} flex={1} alignItems="center" justifyContent="center">
              <Box color="rgba(131, 131, 131, 1)" fontSize={14}>
                Price/Slot
              </Box>
              <Box fontSize={16} fontWeight={600}>
                <Box as="span" style={{ textWrap: 'nowrap' }}>
                  <Currency value={data.mintToken?.price_sol_per_token} />
                </Box>
                SOL/SLOT {data.mintToken?.symbol}
              </Box>
            </FlexCol>
            <LineCustom />
            <FlexCol gap={1.5} flex={1} alignItems="center" justifyContent="center">
              <Box color="rgba(131, 131, 131, 1)" fontSize={14}>
                Sold
              </Box>
              <Box fontSize={16} fontWeight={600}>
                <Currency
                  value={BigNumber(data.mintToken?.virtual_sol_reserves ?? 0)
                    .multipliedBy(solPrice ?? 0)
                    .toString()}
                  isWei
                  prefix="$"
                />
              </Box>
            </FlexCol>
            <LineCustom />
            <FlexCol gap={1.5} flex={1} alignItems="center" justifyContent="center">
              <Box color="rgba(131, 131, 131, 1)" fontSize={14}>
                Target
              </Box>
              <Box fontSize={16} fontWeight={600}>
                <Currency
                  value={BigNumber(data.mintToken?.total_sol_receive ?? 0)
                    .multipliedBy(solPrice ?? 0)
                    .toString()}
                  isWei
                  prefix="$"
                />
              </Box>
            </FlexCol>
          </Flex>

          <Flex w="full" gap={{ base: 4, md: '30px' }} flexDir={{ base: 'column-reverse', md: 'row' }}>
            <Box flex={1}>{data.mintToken && <TradeComponent token={data.mintToken} />}</Box>
            <FlexCol w="full" maxW={356} gap="30px">
              {data.mintToken && <SwapToken token={data.mintToken} />}
              {data.mintToken && <HoldersDistribution token={data.mintToken} />}
            </FlexCol>
          </Flex>
        </FlexContent>
      )}
    </Wrapper>
  );
}

export const LineCustom = () => {
  return (
    <Box py={{ base: 0, md: 0.5 }}>
      <Box
        mt={{ base: 0, md: 1 }}
        w={{ base: 'full', md: 'unset' }}
        borderBottomWidth={{ base: '1px', md: 0 }}
        h={{ base: 'unset', md: 'full' }}
        borderRightWidth={{ base: 0, md: '1px' }}
        borderStyle="solid"
        borderColor="rgba(40, 40, 45, 1)"
      />
    </Box>
  );
};
