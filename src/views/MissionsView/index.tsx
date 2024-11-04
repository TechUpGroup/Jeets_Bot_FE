'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button, FlexBanner, FlexBetween, FlexCol, ImageRatio, LinkCustom, Title, Wrapper } from '@/components';
import useWalletActive from '@/hooks/useWalletActive';
import { IMission, postMissions, postMissionsStart } from '@/services/missions';
import { sleep } from '@/utils';
import { toastError } from '@/utils/toast';
import { Box, Center, Flex } from '@chakra-ui/react';

import { useQueryMissions } from './hooks/useQueryMissions';

export default function MissionsView() {
  const router = useRouter();
  const pathname = usePathname();

  const { data, refetch } = useQueryMissions();
  const [loading, setLoading] = useState('');
  const { address } = useWalletActive();

  const handleActionJoin = async (mission: IMission) => {
    if (loading) return;
    try {
      setLoading(mission._id);
      if (mission.type === 'X') {
        const url = await postMissionsStart(mission._id);
        window.open(url.redirectUrl, '_self');
      } else {
        window.open(mission.action_link);
        const expired = Date.now() + 60_000;
        let isDone = false;
        await sleep(5_000);
        while (expired > Date.now() && !isDone) {
          const done = await postMissions(mission._id);
          if (done === true) {
            isDone = true;
            refetch();
          } else {
            await sleep(5_000);
          }
        }
      }
    } catch (e) {
      toastError('Mission failed!', e);
    } finally {
      setLoading('');
    }
  };

  const searchParams = useSearchParams();

  useEffect(() => {
    const handleMissionX = async () => {
      const state = searchParams.get('state');
      const code = searchParams.get('code');
      if (state && state.startsWith('mission-x-') && code && !!address) {
        try {
          const missionId = state.slice('mission-x-'.length);
          setLoading(missionId);
          await postMissions(missionId, code);
          refetch();
        } catch (e: any) {
          toastError('Mission x failed', e);
        } finally {
          setLoading('');
        }
      }
    };
    handleMissionX();
  }, [searchParams, address, refetch]);

  return (
    <Wrapper container={false}>
      <Title>MISSIONS</Title>
      {!!data?.ratio && data?.ratio >= 100 && (
        <FlexBanner bg="rgba(29, 246, 157, 0.2)">
          <FlexCol justifyContent="center" alignItems="center" flex={1} gap={2.5}>
            <Box fontSize={{ base: 24, md: 52 }} color="purple2" textTransform="uppercase">
              congratulations
            </Box>
            <Box
              fontFamily="sfPro"
              fontSize={{ base: 16, md: 20 }}
              fontWeight={800}
              color="black"
              textAlign={{ base: 'center', md: 'start' }}
            >
              You have been added to the whitelist. Let’s vote to find the winner
            </Box>

            <Button
              bg="makeColor"
              px="96px"
              h={{ base: 10, md: '50px' }}
              fontSize={{ base: 16, md: 20 }}
              color="white"
              rounded={8}
              onClick={() => router.push(`${pathname}?tab=1`)}
            >
              VOTE
            </Button>
          </FlexCol>
        </FlexBanner>
      )}
      <FlexCol gap={2.5} w="full">
        <FlexBetween fontSize={18} fontWeight={800} fontFamily="sfPro">
          <Box>Your Progress</Box>
          <Box>{data?.ratio ?? 0}%</Box>
        </FlexBetween>
        <Box w="full" bg="rgba(214, 231, 246, 1)" rounded={100} overflow="hidden" h={4}>
          <Box w={`${data?.ratio ?? 0}%`} h="full" rounded={100} bg="makeColor" />
        </Box>
      </FlexCol>
      <FlexCol w="full" gap={{ base: 5, md: '30px' }}>
        {data?.result.map((e, i) => (
          <Flex
            key={i}
            justifyContent="space-between"
            p={{ base: 3, md: 5 }}
            bg="rgba(237, 247, 255, 1)"
            rounded={10}
            alignItems="center"
            gap={2.5}
          >
            <FlexCol gap={{ base: 2, md: 2.5 }} fontFamily="sfPro" lineHeight={1.4} flex={1}>
              <Box fontSize={14} fontWeight={500}>
                Mission #{e.mid}
              </Box>
              <Box fontSize={{ base: 16, md: 20 }} fontWeight={800}>
                {e.name} ({e.ratio}%)
              </Box>
            </FlexCol>
            <Box w={{ base: 120, md: 248 }} h={{ base: 10, md: '50px' }} fontSize={{ base: 16, md: 20 }}>
              {!e.status ? (
                <Button
                  w="full"
                  h="full"
                  rounded={8}
                  bg="makeColor"
                  color="white"
                  disabled={!!loading || !address}
                  isLoading={loading === e._id}
                  onClick={() => handleActionJoin(e)}
                >
                  Join
                </Button>
              ) : (
                <Center w="full" h="full" rounded={8} color="green" border="2px solid" borderColor="green">
                  COMPLETED
                </Center>
              )}
            </Box>
          </Flex>
        ))}
      </FlexCol>
    </Wrapper>
  );
}
