'use client';

import BigNumber from 'bignumber.js';

import {
  Button,
  Currency,
  FlexBanner,
  FlexCenter,
  FlexCol,
  ImageRatio,
  LinkCustom,
  Title,
  Wrapper,
} from '@/components';
import { getTransactionHashUrl } from '@/utils';
import { formatAddress } from '@/utils/address';
import { Flex, Table, TableContainer, Tbody, Td, Thead, Tr } from '@chakra-ui/react';

import ConditionTab from './ConditionTab';
import { useQueryAirdropsPoolInfos } from './hooks/useQueryHistories';

export default function PoolView() {
  const { data: airdropsPoolInfos } = useQueryAirdropsPoolInfos();

  return (
    <Wrapper container={false}>
      <Title>POOL</Title>
      <FlexBanner>
        <FlexCol justifyContent="center" alignItems="center" flex={1} gap={2.5}>
          <Flex
            flexDir={{ base: 'column', md: 'row' }}
            fontSize={{ base: 24, md: 52 }}
            textAlign="center"
            color="purple2"
            gap={2.5}
            alignItems="center"
            justifyContent="center"
            flexWrap="wrap"
          >
            <FlexCenter gap={2.5}>
              <ImageRatio src="/icons/moon.png" ratio={1} w={20} />
            </FlexCenter>
          </Flex>
        </FlexCol>
      </FlexBanner>

      <ConditionTab />

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
                { name: 'Token', center: false, w: 288 },
                { name: 'Total Aidrop' },
                { name: 'Aidropped' },
                { name: 'Remaining' },
                { name: 'Pool Address', w: 288 },
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
          <Tbody fontSize={{ base: 16, md: 20 }}>
            {airdropsPoolInfos?.map((e, i) => (
              <Tr key={i}>
                <Td p={{ base: 2, md: 5 }} bg="rgba(237, 247, 255, 1)" roundedLeft={10}>
                  <Flex alignItems="center">{e.detail.symbol}</Flex>
                </Td>
                <Td p={{ base: 2, md: 5 }} bg="rgba(237, 247, 255, 1)">
                  <Flex alignItems="center" justifyContent="center" textAlign="center">
                    <Currency value={e.total} decimalNumber={e.detail.decimal} />
                  </Flex>
                </Td>
                <Td p={{ base: 2, md: 5 }} bg="rgba(237, 247, 255, 1)">
                  <Flex alignItems="center" justifyContent="center" textAlign="center">
                    <Currency value={e.total_airdropped} decimalNumber={e.detail.decimal} />
                  </Flex>
                </Td>
                <Td p={{ base: 2, md: 5 }} bg="rgba(237, 247, 255, 1)">
                  <Flex alignItems="center" justifyContent="center" textAlign="center">
                    <Currency value={BigNumber(e.total).minus(e.total_airdropped)} decimalNumber={e.detail.decimal} />
                  </Flex>
                </Td>
                <Td p={{ base: 2, md: 5 }} bg="rgba(237, 247, 255, 1)" roundedRight={10}>
                  <LinkCustom target="_blank" href={getTransactionHashUrl(e.pool_address, 'address')}>
                    <Flex alignItems="center" justifyContent="center" textAlign="center">
                      {formatAddress(e.pool_address)}
                    </Flex>
                  </LinkCustom>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Wrapper>
  );
}
