'use client';

import { useMemo, useState } from 'react';
import { useInterval } from 'usehooks-ts';

import { Button, FlexBanner, FlexCenter, FlexCol, ImageRatio, LinkCustom, Title, Wrapper } from '@/components';
import { XIconBlack } from '@/components/Icons/XIconBlack';
import useWalletActive from '@/hooks/useWalletActive';
import { IVoting, postVoting } from '@/services/voting';
import { useUser } from '@/store/useUserStore';
import { genrateOrdinalNumber } from '@/utils';
import { calculatorTextRemainTime } from '@/utils/dayjs';
import { toastError, toastSuccess } from '@/utils/toast';
import { Box, Flex, SimpleGrid } from '@chakra-ui/react';

import { useQueryVoting } from './hooks/useQueryVoting';
import { useVoting } from './hooks/useVoting';

const colors = ['rgba(255, 237, 237, 1)', 'rgba(238, 255, 237, 1)', 'rgba(255, 255, 237, 1)'];
const borders = ['rgba(255, 107, 107, 1)', 'rgba(88, 211, 82, 1)', 'rgba(253, 214, 75, 1)'];

export default function VotingView() {
  const { data } = useQueryVoting();
  const { address } = useWalletActive();
  const user = useUser();

  const voting = useVoting();

  const imageXVerified = useMemo(() => {
    switch (user?.twitter_verified_type) {
      case 'blue':
        return '/icons/tick-2.png';
      case 'business':
        return '/icons/tick-1.png';
      case 'government':
        return '/icons/tick-3.png';
    }
  }, [user?.twitter_verified_type]);

  const [current, setCurrent] = useState(Date.now());

  useInterval(() => setCurrent(() => Date.now()), 1000);

  const timeCountDown = useMemo(() => {
    if (!data?.current?.end_time || data.current.start_time > current) return undefined;
    const remainTime = Math.floor((data.current.end_time - current) / 1000);

    return calculatorTextRemainTime(remainTime < 0 ? 0 : remainTime);
  }, [data, current]);
  const [loading, setLoading] = useState('');
  const handleVoting = async (vote: IVoting) => {
    try {
      setLoading(vote.wid);
      const signature = await postVoting(vote.wid);
      await voting(signature);
      toastSuccess('Vote success!');
    } catch (e) {
      toastError('Vote failed!', e);
    } finally {
      setLoading('');
    }
  };

  return (
    <Wrapper container={false}>
      <Title>VOTING</Title>
      <FlexBanner bg="rgba(29, 246, 157, 0.2)">
        <FlexCol justifyContent="center" alignItems="center" flex={1} gap={2.5}>
          <Box fontSize={{ base: 24, md: 52 }} textAlign="center">
            {timeCountDown ?? ''}
          </Box>
        </FlexCol>
      </FlexBanner>
      <FlexCol
        fontSize={20}
        bg="rgba(208, 255, 237, 1)"
        rounded={10}
        py={4}
        px={6}
        w="full"
        gap={1.5}
        alignItems="center"
        textAlign="center"
      >
        <Box>Voting Eligibility</Box>
        <FlexCenter gap="5px">
          <XIconBlack w={6} />
          <Box>{user?.twitter_username ?? ''}</Box>
          <ImageRatio src={imageXVerified ?? `/icons/error.png`} ratio={1} w={7} />
        </FlexCenter>
        {user?.is_hold_token ? (
          <FlexCenter gap="5px">
            <Box>Hold tokens from our partners</Box>
            <ImageRatio src={`/icons/success.png`} ratio={1} w={6} />
          </FlexCenter>
        ) : (
          <FlexCenter gap="5px">
            <Box>
              Hold tokens from{' '}
              <Box as="span" color="#2BA2DE" textDecor="underline" cursor="pointer">
                our partners{' '}
              </Box>
              {user?.partner && <Box as="span">{user?.partner.symbol}</Box>}
            </Box>
            {!user?.partner && <ImageRatio src={`/icons/error.png`} ratio={1} w={6} />}
          </FlexCenter>
        )}
      </FlexCol>
      <FlexCol w="full" gap={2.5}>
        {data?.result?.map((e, i) => (
          <SimpleGrid
            columns={3}
            key={i}
            p={{ base: '14px', md: '18px' }}
            bg={colors[e.rank - 1] ?? 'rgba(243, 235, 255, 1)'}
            border="2px solid"
            borderColor={borders[e.rank - 1] ?? 'rgba(243, 235, 255, 1)'}
            rounded={10}
            alignItems="center"
          >
            <FlexCenter gap={2.5} fontFamily="sfPro" lineHeight={1.4} fontWeight={800}>
              <ImageRatio
                originalImage
                src={e.avatar ?? 'https://placehold.co/52x52/png'}
                ratio={1}
                w={{ base: 10, md: '52px' }}
                rounded={999}
                overflow="hidden"
              />
              <Flex alignItems="end" gap={2.5}>
                <FlexCol>
                  <Box fontSize={14}>{genrateOrdinalNumber(e.rank)}</Box>

                  <Box fontSize={{ base: 16, md: 20 }}>
                    <LinkCustom href={`https://x.com/${e.name}`} target="_blank">
                      {e.name}
                    </LinkCustom>
                  </Box>
                </FlexCol>
                {/* {e.wid === user?._id && (
                    <Box bg="rgba(144, 78, 236, 1)" py="5px" px={2.5} rounded={10} color="white" fontSize={14}>
                      You
                    </Box>
                  )} */}
              </Flex>
            </FlexCenter>
            <Box fontSize={{ base: 18, md: 25 }} fontFamily="sfPro" fontWeight={800} textAlign="center">
              {e.countVote} Votes
            </Box>
            <Flex justifyContent="end">
              <Box w={{ base: 100, md: 248 }} h={{ base: 10, md: '50px' }} fontSize={{ base: 16, md: 20 }}>
                {!e.status ? (
                  <Button
                    w="full"
                    h="full"
                    bg="black"
                    rounded={8}
                    color="rgba(239, 239, 239, 1)"
                    isLoading={loading === e.wid}
                    disabled={!!loading || !address}
                    onClick={() => handleVoting(e)}
                  >
                    <Box bg="linear-gradient(180deg, #1DF69D 0%, #904EEC 100%)" bgClip="text">
                      VOTE
                    </Box>
                  </Button>
                ) : (
                  <Button w="full" h="full" bg="disabled" rounded={8} color="rgba(239, 239, 239, 1)">
                    VOTED
                  </Button>
                )}
              </Box>
            </Flex>
          </SimpleGrid>
        ))}
      </FlexCol>
    </Wrapper>
  );
}
