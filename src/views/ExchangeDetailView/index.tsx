'use client';

import { useRouter } from 'next/navigation';

import { Button, FlexCol, FlexContent, ImageRatio, Title2, Wrapper } from '@/components';
import { Box, Flex, SimpleGrid, Tab, Tabs } from '@chakra-ui/react';

import { HoldersDistribution } from './HoldersDistribution';
import { TradeComponent } from './TradeComponent';

const tabs = ['Token List', 'Token Development', 'My Token'];

export default function ExchangeDetailView({ mint }: { mint: string }) {
  const router = useRouter();
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
    >
      <FlexContent maxW={{ base: 'full', md: 300, lg: 320, xl: 350, '2xl': 402 }} w="full" flex="unset" gap={5}>
        <Title2>OTC Exchange</Title2>
        <SimpleGrid columns={{ base: 3, md: 1 }} gap={5} w="full">
          {tabs.map((name) => (
            <Tab
              key={name}
              w="full"
              _selected={{ color: 'white', bg: 'purple' }}
              bg="rgba(237, 247, 255, 1)"
              fontSize={{ base: 14, md: 20 }}
              lineHeight={1.4}
              px={{ base: 2, md: 5 }}
              py={{ base: 3, md: 5 }}
              rounded={10}
            >
              {name}
            </Tab>
          ))}
        </SimpleGrid>
      </FlexContent>
      <FlexContent w="full" fontFamily="sfPro" fontWeight={600}>
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
            src={'https://placehold.co/100x100/png'}
            ratio={1}
            border="0.67px solid rgba(16, 16, 16, 1)"
            w={{ base: 83, md: 83 }}
            rounded="5.33px"
            overflow="hidden"
          />
          <FlexCol>
            <Box fontSize={20}>MEME</Box>
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
          <Box>MEME</Box>
          <Box>$0.0000553</Box>
        </FlexCol>

        <Flex
          border="1px solid black"
          rounded={12}
          px={{ base: 2.5, md: 6 }}
          py={{ base: 2.5, md: 4 }}
          w="full"
          gap={{ base: 4, md: 10 }}
          flexDir={{ base: 'column', md: 'row' }}
        >
          <FlexCol gap={1.5} flex={1} alignItems="center" justifyContent="center">
            <Box color="rgba(131, 131, 131, 1)" fontSize={14} fontWeight={400}>
              Wallet address
            </Box>
            <Box fontSize={16} fontWeight={500}>
              0xac27...fd0f
            </Box>
          </FlexCol>
          <LineCustom />
          <FlexCol gap={1.5} flex={1} alignItems="center" justifyContent="center">
            <Box color="rgba(131, 131, 131, 1)" fontSize={14}>
              Status
            </Box>
            <Box fontSize={16} fontWeight={500}>
              Opening
            </Box>
          </FlexCol>
          <LineCustom />
          <FlexCol gap={1.5} flex={1} alignItems="center" justifyContent="center">
            <Box color="rgba(131, 131, 131, 1)" fontSize={14}>
              Price/Token
            </Box>
            <Box fontSize={16} fontWeight={500}>
              1SOL/MEME
            </Box>
          </FlexCol>
          <LineCustom />
          <FlexCol gap={1.5} flex={1} alignItems="center" justifyContent="center">
            <Box color="rgba(131, 131, 131, 1)" fontSize={14}>
              Sold
            </Box>
            <Box fontSize={16} fontWeight={500}>
              $133
            </Box>
          </FlexCol>
          <LineCustom />
          <FlexCol gap={1.5} flex={1} alignItems="center" justifyContent="center">
            <Box color="rgba(131, 131, 131, 1)" fontSize={14}>
              Target
            </Box>
            <Box fontSize={16} fontWeight={500}>
              $9431
            </Box>
          </FlexCol>
        </Flex>

        <Flex w="full" gap={{ base: 4, md: '30px' }} flexDir={{ base: 'column', md: 'row' }}>
          <Box flex={1}>
            <TradeComponent />
          </Box>
          <FlexCol w="full" maxW={356}>
            <HoldersDistribution />
          </FlexCol>
        </Flex>
      </FlexContent>
    </Wrapper>
  );
}

export const LineCustom = () => {
  return (
    <Box
      mt={{ base: 0, md: 1 }}
      w={{ base: 'full', md: 'unset' }}
      borderBottomWidth={{ base: '1px', md: 0 }}
      h={{ base: 'unset', md: 10 }}
      borderRightWidth={{ base: 0, md: '1px' }}
      borderStyle="solid"
      borderColor="rgba(40, 40, 45, 1)"
    />
  );
};
