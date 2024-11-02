'use client';

import { cloneDeep } from 'lodash';
import { useState } from 'react';

import { Button, LinkCustom, Title, Wrapper } from '@/components';
import { queryClient } from '@/providers/react-query';
import { ICampaignResponse, postClaimAirdrop } from '@/services/campaign';
import { getTransactionHashUrl } from '@/utils';
import { formatAddress } from '@/utils/address';
import dayjs from '@/utils/dayjs';
import { toastError, toastSuccess } from '@/utils/toast';
import { Flex, Table, TableContainer, Tbody, Td, Thead, Tr } from '@chakra-ui/react';

import { CollapseAirdrop } from './CollapseAirdrop';
import { useClaimVault } from './hooks/useClaimVault';
import { useQueryAirdrops } from './hooks/useQueryAirdrops';

export default function ClaimTab() {
  const { data } = useQueryAirdrops();

  const claimVault = useClaimVault();
  const [loading, setLoading] = useState('');

  const handleClaimVault = async (id: string) => {
    try {
      setLoading(id);
      const signature = await postClaimAirdrop(id);
      await claimVault(signature);
      toastSuccess('Claim success!');
      queryClient.setQueryData(['getListCampaign'], (oldData: ICampaignResponse) => {
        const cloned = cloneDeep(oldData);
        const airdrop = cloned.airdrops?.find((e) => e._id === id);
        if (airdrop) {
          airdrop.status = true;
        }
        return cloned;
      });
    } catch (e) {
      toastError('Claim failed!', e);
    } finally {
      setLoading('');
    }
  };

  return (
    <Wrapper container={false}>
      <Flex justifyContent="center" w="full" gap={1}>
        <Title>Claim</Title>
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
                { name: 'Token', center: false, w: 288 },
                { name: 'Transactions' },
                { name: 'Claim time' },
                { name: 'Action', w: 288 },
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
            {data?.docs.map((airdrop, i) => {
              return (
                <Tr key={i}>
                  <Td p={{ base: 2, md: 5 }} bg="rgba(237, 247, 255, 1)" roundedLeft={10}>
                    <CollapseAirdrop item={airdrop} />
                  </Td>
                  <Td p={{ base: 2, md: 5 }} bg="rgba(237, 247, 255, 1)">
                    <Flex alignItems="center" justifyContent="center" textAlign="center" gap={2}>
                      {!!airdrop.tx && (
                        <LinkCustom href={getTransactionHashUrl(airdrop.tx)} target="_blank">
                          {formatAddress(airdrop.tx)}
                        </LinkCustom>
                      )}
                    </Flex>
                  </Td>
                  <Td p={{ base: 2, md: 5 }} bg="rgba(237, 247, 255, 1)">
                    <Flex alignItems="center" justifyContent="center" textAlign="center">
                      {dayjs.utc(airdrop.timestamp).format('DD/MM/YYYY')}
                    </Flex>
                  </Td>

                  <Td p={{ base: 2, md: 5 }} bg="rgba(237, 247, 255, 1)" roundedRight={10}>
                    <Flex alignItems="center">
                      {airdrop.status ? (
                        <Button
                          h={{ base: 9, md: '50px' }}
                          w="full"
                          color="rgba(23, 210, 133, 1)"
                          border="1px solid"
                          borderColor="rgba(23, 210, 133, 1)"
                          rounded={8}
                          bg="white"
                          px={{ base: 3, md: 5 }}
                          cursor="default"
                        >
                          CLAIMED
                        </Button>
                      ) : (
                        <Button
                          h={{ base: 9, md: '50px' }}
                          w="full"
                          rounded={8}
                          bg="makeColor"
                          px={{ base: 3, md: 5 }}
                          color="white"
                          disabled={!!loading}
                          isLoading={loading === airdrop._id}
                          onClick={() => handleClaimVault(airdrop._id)}
                        >
                          CLAIM
                        </Button>
                      )}
                    </Flex>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Wrapper>
  );
}
