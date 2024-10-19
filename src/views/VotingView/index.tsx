'use client';

import { useMemo, useState } from 'react';
import { useInterval } from 'usehooks-ts';

import { Button, FlexCenter, FlexCol, ImageRatio } from '@/components';
import { useUser } from '@/store/useUserStore';
import dayjs, { calculatorTextRemainTime } from '@/utils/dayjs';
import { Box, Flex } from '@chakra-ui/react';

import { useQueryVoting } from './hooks/useQueryVoting';

export default function VotingView() {
  const { data } = useQueryVoting();
  const user = useUser();

  const [current, setCurrent] = useState(Date.now());

  useInterval(() => setCurrent(() => Date.now()), 1000);

  const timeCountDown = useMemo(() => {
    if (!data?.current?.end_time || data.current.start_time < current) return undefined;
    const remainTime = Math.floor((data.current.end_time - current) / 1000);

    return calculatorTextRemainTime(remainTime < 0 ? 0 : remainTime);
  }, [data, current]);

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
        <Box fontSize={{ base: 32, md: 82 }}>VOTING</Box>
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
            <Box fontSize={{ base: 24, md: 52 }} textAlign="center">
              {timeCountDown ?? ''}
            </Box>
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

        <FlexCol w="full" gap={2.5}>
          {data?.result?.map((e, i) => (
            <Flex
              key={i}
              justifyContent="space-between"
              p={{ base: 4, md: 5 }}
              bg="rgba(243, 235, 255, 1)"
              rounded={10}
              alignItems="center"
            >
              <FlexCenter gap={2.5} fontFamily="sfPro" lineHeight={1.4} fontWeight={800}>
                <ImageRatio
                  src={e.avatar ?? 'https://placehold.co/52x52/png'}
                  ratio={1}
                  w={{ base: 10, md: '52px' }}
                  rounded={999}
                  overflow="hidden"
                />
                <Flex alignItems="end" gap={2.5}>
                  <FlexCol>
                    <Box fontSize={14}>#{e.rank}</Box>
                    <Box fontSize={{ base: 16, md: 20 }}>{e.name}</Box>
                  </FlexCol>
                  {e._id === user?._id && (
                    <Box bg="rgba(144, 78, 236, 1)" py="5px" px={2.5} rounded={10} color="white" fontSize={14}>
                      You
                    </Box>
                  )}
                </Flex>
              </FlexCenter>
              <Box w={{ base: 100, md: 248 }} h={{ base: 10, md: '50px' }} fontSize={{ base: 16, md: 20 }}>
                {true ? (
                  <Button w="full" h="full" bg="black" rounded={8} color="rgba(239, 239, 239, 1)">
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
          ))}
        </FlexCol>
      </FlexCol>
    </Flex>
  );
}
