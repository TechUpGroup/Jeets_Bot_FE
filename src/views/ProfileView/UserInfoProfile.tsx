'use client';

import { isNil } from 'lodash';
import { useMemo } from 'react';

import { Button, FlexCenter, FlexCol, ImageRatio } from '@/components';
import { TeleIcon, VerifiedIcon, XIcon } from '@/components/Icons';
import { appConfig } from '@/config';
import useCodeSocial from '@/hooks/useCodeSocial';
import useWalletActive from '@/hooks/useWalletActive';
import { useUser } from '@/store/useUserStore';
import { Box, Center, Flex } from '@chakra-ui/react';

import { useQueryMissions } from '../MissionsView/hooks/useQueryMissions';

export default function UserInfoProfile() {
  const { address } = useWalletActive();
  const { data: missionInfo } = useQueryMissions();

  const openConnectTwitter = () => {
    window.open(`${appConfig.publicUrl}/users/twitter/start`, '_self');
  };
  const openConnectTelegram = () => {
    window.open(`${appConfig.publicUrl}/users/telegram/start`, '_self');
  };

  const { isTwitter, tgAuthResult } = useCodeSocial();
  const user = useUser();

  const isTwitterConnected = useMemo(() => !!user?.twitter_uid, [user?.twitter_uid]);
  const isTeleConnected = useMemo(() => !!user?.telegram_uid, [user?.telegram_uid]);

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

  const isPassed = useMemo(() => {
    if (!user) return false;
    return (
      user?.is_hold_token &&
      user.twitter_verified_type !== 'none' &&
      user.twitter_followers_count >= 1000 &&
      !!missionInfo?.ratio &&
      missionInfo?.ratio >= 100
    );
  }, [missionInfo?.ratio, user]);

  if (!address) return undefined;

  return (
    <Flex justifyContent="center" w="full" border="1px dashed #8F51EC" rounded={8} py={5}>
      <FlexCol
        w={{ base: ' full', md: 'fit-content' }}
        px={{ base: 5, md: '44px' }}
        bg="white"
        rounded={24}
        alignItems="center"
        gap="20px"
        h="fit-content"
      >
        <FlexCol gap="20px" fontSize={{ base: 20, md: 34 }} lineHeight={38.98 / 34} w="full" color="white">
          <Button
            rounded={10}
            h="76px"
            bg="rgba(43, 162, 222, 1)"
            px={2}
            onClick={
              !isTeleConnected
                ? openConnectTelegram
                : () => window.open(`https://t.me/${user?.telegram_username}`, '_blank')
            }
            isLoading={!isTeleConnected && !!tgAuthResult}
            disabled={!address || !isTeleConnected}
          >
            <Center gap={{ base: 3, md: 22 }}>
              <TeleIcon />
              {isTeleConnected ? user?.telegram_username : 'CONNECT TELEGRAM'}
              {isTeleConnected && <VerifiedIcon />}
            </Center>
          </Button>

          <Button
            rounded={10}
            h="76px"
            bg="rgba(32, 27, 3, 1)"
            px={2}
            onClick={
              !isTwitterConnected
                ? openConnectTwitter
                : () => window.open(`https://x.com/${user?.twitter_username}`, '_blank')
            }
            isLoading={!isTwitterConnected && isTwitter}
            disabled={!address || !isTwitterConnected}
          >
            <Center gap={{ base: 3, md: 22 }}>
              <XIcon />
              {isTwitterConnected ? user?.twitter_username : 'CONNECT X'}
              {isTwitterConnected && <VerifiedIcon />}
            </Center>
          </Button>

          <FlexCol
            w="full"
            border="3px dashed"
            borderColor="#8F51EC"
            rounded={8}
            p={5}
            alignItems="center"
            gap={{ base: 1.5, md: 2.5 }}
            lineHeight={1.145}
            fontSize={{ base: 14, md: 20 }}
            color="#201B03"
            textAlign="center"
          >
            <FlexCol alignItems="center" fontSize={{ base: 18, md: 24 }} color="#8F51EC">
              Airdrop Eligibility
            </FlexCol>
            <FlexCenter gap="5px">
              <Box>Have X blue/gold tick</Box>
              <ImageRatio src={imageXVerified ?? `/icons/error.png`} ratio={1} w={6} />
            </FlexCenter>
            <FlexCenter gap="5px">
              <Box>Have more than 1000 followers</Box>
              <ImageRatio
                src={(user?.twitter_followers_count ?? 0) >= 1000 ? `/icons/success.png` : `/icons/error.png`}
                ratio={1}
                w={6}
              />
            </FlexCenter>
            {user?.is_hold_token ? (
              <FlexCenter gap="5px">
                <Box>Hold tokens from our partners</Box>
                <ImageRatio src={`/icons/success.png`} ratio={1} w={6} />
              </FlexCenter>
            ) : (
              <FlexCenter gap="5px">
                <Box>
                  Hold tokens from our partners
                  {user?.partner && <Box as="span">{user?.partner.symbol}</Box>}
                </Box>
                {!user?.partner && <ImageRatio src={`/icons/error.png`} ratio={1} w={6} />}
              </FlexCenter>
            )}

            <FlexCenter gap="5px">
              <Box>Completed missions</Box>
              {!isNil(missionInfo?.ratio) && (
                <ImageRatio
                  src={missionInfo?.ratio >= 100 ? `/icons/success.png` : `/icons/error.png`}
                  ratio={1}
                  w={6}
                />
              )}
            </FlexCenter>
            <FlexCenter gap="5px">
              <Box>Pass our voting process</Box>
              <ImageRatio src={isPassed ? `/icons/success.png` : `/icons/error.png`} ratio={1} w={6} />
            </FlexCenter>
          </FlexCol>

          <FlexCol
            w="full"
            border="3px dashed"
            borderColor="#8F51EC"
            rounded={8}
            p={5}
            alignItems="center"
            gap={{ base: 1.5, md: 2.5 }}
            lineHeight={1.145}
            fontSize={{ base: 14, md: 20 }}
            color="#201B03"
            textAlign="center"
          >
            <FlexCol alignItems="center" fontSize={{ base: 18, md: 24 }} color="#8F51EC">
              Conditions to start earning Jeets Index Score
            </FlexCol>
            <FlexCenter gap="5px">
              <Box>Have X blue/gold tick</Box>
              <ImageRatio src={imageXVerified ?? `/icons/error.png`} ratio={1} w={6} />
            </FlexCenter>

            <FlexCenter gap="5px">
              <Box>Pass Jeets Score process</Box>
              <ImageRatio src={!!imageXVerified ? `/icons/success.png` : `/icons/error.png`} ratio={1} w={6} />
            </FlexCenter>
          </FlexCol>
          <FlexCol
          w="full"
          border="3px dashed"
          borderColor="#8F51EC"
          rounded={8}
          p={5}
          alignItems="center"
          gap={{ base: 1.5, md: 2.5 }}
          lineHeight={1.145}
          fontSize={{ base: 14, md: 20 }}
          color="#201B03"
          textAlign="center"
        >
          <FlexCol alignItems="center" fontSize={{ base: 18, md: 24 }} color="#8F51EC">
            Voting Eligibility
          </FlexCol>
          <FlexCenter gap="5px">
            <Box>Have X blue/gold tick</Box>
            <ImageRatio src={imageXVerified ?? `/icons/error.png`} ratio={1} w={6} />
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
                <Box as="span" color="#2BA2DE" textDecor="underline" cursor="pointer" >
                  our partners{' '}
                </Box>
                {user?.partner && <Box as="span">{user?.partner.symbol}</Box>}
              </Box>
              {!user?.partner && <ImageRatio src={`/icons/error.png`} ratio={1} w={6} />}
            </FlexCenter>
          )}
          {/* <FlexCenter gap="5px">
            <Box>Eligible for voting</Box>
            <ImageRatio src={!!imageXVerified ? `/icons/success.png` : `/icons/error.png`} ratio={1} w={6} />
          </FlexCenter> */}
        </FlexCol>
        </FlexCol>
      </FlexCol>
    </Flex>
  );
}
