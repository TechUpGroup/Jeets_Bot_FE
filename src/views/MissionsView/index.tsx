'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button, FlexBetween, FlexCol, ImageRatio, LinkCustom } from '@/components';
import useWalletActive from '@/hooks/useWalletActive';
import { IMission, postMissions, postMissionsStart } from '@/services/missions';
import { sleep } from '@/utils';
import { toastError } from '@/utils/toast';
import { Box, Center, Flex } from '@chakra-ui/react';

import { useQueryMissions } from './hooks/useQueryMissions';

export default function MissionsView() {
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
  }, [searchParams, address]);

  return (
    <Flex flex={1} pt={{ base: 5, md: 30 }} justifyContent="center" lineHeight={1.145} pb={10}>
      <FlexCol
        maxW={1517}
        w="full"
        rounded={24}
        pt={6}
        px={{ base: 4, md: '44px' }}
        pb={79}
        bg="white"
        alignItems="center"
        gap={30}
      >
        <Box fontSize={{ base: 32, md: 82 }}>MISSIONS</Box>
        {!!data?.ratio && data?.ratio >= 100 && (
          <Flex
            gap={2.5}
            rounded={10}
            bg="rgba(29, 246, 157, 0.2)"
            w="full"
            px={{ base: 2, md: '25.43px' }}
            py={{ base: 4, md: 0 }}
          >
            <ImageRatio
              src="/images/people-pool.png"
              ratio={178 / 175}
              w={{ base: 10, md: 178 }}
              mt={{ base: 0, md: '15px' }}
              alignSelf={{ base: 'center', md: 'start' }}
            />
            <FlexCol justifyContent="center" alignItems="center" flex={1} gap={2.5}>
              <Box fontSize={{ base: 24, md: 52 }} color="purple" textTransform="uppercase">
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
              <LinkCustom href="/voting">
                <Button
                  bg="linear-gradient(90deg, #1DF69D 0%, #904EEC 100%)"
                  px="96px"
                  h={{ base: 10, md: '50px' }}
                  fontSize={{ base: 16, md: 20 }}
                  color="white"
                  rounded={8}
                >
                  VOTE
                </Button>
              </LinkCustom>
            </FlexCol>
            <ImageRatio
              src="/images/people-pool.png"
              ratio={178 / 175}
              w={{ base: 10, md: 178 }}
              mt={{ base: 0, md: '15px' }}
              alignSelf={{ base: 'center', md: 'start' }}
              transform="matrix(-1, 0, 0, 1, 0, 0)"
            />
          </Flex>
        )}
        <FlexCol gap={2.5} w="full">
          <FlexBetween fontSize={18} fontWeight={800} fontFamily="sfPro">
            <Box>Your Progress</Box>
            <Box>{data?.ratio ?? 0}%</Box>
          </FlexBetween>
          <Box w="full" bg="rgba(214, 231, 246, 1)" rounded={100} overflow="hidden" h={4}>
            <Box
              w={`${data?.ratio ?? 0}%`}
              h="full"
              rounded={100}
              bg="linear-gradient(90deg, #1DF69D 0%, #904EEC 100%)"
            />
          </Box>
        </FlexCol>
        <FlexCol w="full" gap="30px">
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
              <FlexCol gap={{ base: 2, md: 2.5 }} fontFamily="sfPro" lineHeight={1.4}>
                <Box fontSize={14} fontWeight={500}>
                  Mission #{e.mid}
                </Box>
                <Box fontSize={{ base: 16, md: 20 }} fontWeight={800}>
                  {e.name} ({e.ratio}%)
                </Box>
              </FlexCol>
              <Box w={248} h={{ base: 10, md: '50px' }} fontSize={{ base: 16, md: 20 }}>
                {!e.status ? (
                  <Button
                    w="full"
                    h="full"
                    rounded={8}
                    bg="linear-gradient(90deg, #1DF69D 0%, #904EEC 100%)"
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
      </FlexCol>
    </Flex>
  );
}
