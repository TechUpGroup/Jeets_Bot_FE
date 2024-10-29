'use client';

import { useEffect, useMemo, useState } from 'react';

import { Button, FlexCenter, FlexCol, ImageRatio, LinkCustom } from '@/components';
import { TeleIcon, VerifiedIcon, XIcon } from '@/components/Icons';
import { appConfig } from '@/config';
import useCodeSocial from '@/hooks/useCodeSocial';
import useWalletActive from '@/hooks/useWalletActive';
import { postConnectTelegram, postConnectTwitter } from '@/services/api';
import { incrementCount } from '@/store/useGlobalStore';
import { useUser } from '@/store/useUserStore';
import { toastError } from '@/utils/toast';
import { Box, Center, Flex } from '@chakra-ui/react';
import { useWalletMultiButton } from '@solana/wallet-adapter-base-ui';
import { useWalletModal } from '@tiplink/wallet-adapter-react-ui';

export default function HomeView() {
  const { address } = useWalletActive();
  const openConnectTwitter = () => {
    window.open(`${appConfig.publicUrl}/users/twitter/start`, '_self');
  };
  const openConnectTelegram = () => {
    window.open(`${appConfig.publicUrl}/users/telegram/start`, '_self');
  };

  const { code, isTwitter, tgAuthResult } = useCodeSocial();
  const user = useUser();
  const { setVisible } = useWalletModal();
  const { buttonState } = useWalletMultiButton({
    onSelectWallet() {
      setVisible(true);
    },
  });
  const isTwitterConnected = useMemo(() => !!user?.twitter_uid, [user?.twitter_uid]);
  const isTeleConnected = useMemo(() => !!user?.telegram_uid, [user?.telegram_uid]);
  const [loadingTwitter, setLoadingTwitter] = useState(false);
  const [loadingTele, setLoadingTele] = useState(false);

  useEffect(() => {
    const handleConnectTwitter = async () => {
      if (isTwitter && code && !!address && !user?.twitter_uid) {
        try {
          setLoadingTwitter(true);
          const res = await postConnectTwitter(code);
          if (!res) {
            toastError('Connect twitter failed');
          }
          incrementCount();
        } catch (e: any) {
          toastError('Connect twitter failed', e);
        } finally {
          setLoadingTwitter(false);
        }
      }
    };
    handleConnectTwitter();
  }, [isTwitter, code, user?.twitter_uid, address]);

  useEffect(() => {
    const handleConnectTelegram = async () => {
      if (!!tgAuthResult && !!address && !user?.telegram_uid) {
        try {
          setLoadingTele(true);
          const res = await postConnectTelegram(tgAuthResult);
          if (!res) {
            toastError('Connect telegram failed');
          }
          incrementCount();
        } catch (e: any) {
          toastError('Connect telegram failed', e);
        } finally {
          setLoadingTele(false);
        }
      }
    };
    handleConnectTelegram();
  }, [tgAuthResult, user?.telegram_uid, address]);

  return (
    <Flex
      pt={{ base: '80px', md: 91 }}
      flexDir={{ base: 'column', md: 'row' }}
      gap={{ base: 0, md: '10.36%' }}
      w="full"
      justifyContent="center"
      maxW={1524}
      mx="auto"
      alignItems="center"
      zIndex={2}
    >
      <Box pos="relative" w={{ base: '50%', md: '43.25%' }} mx={{ base: 'auto', md: 'unset' }}>
        <ImageRatio
          src="/images/cry.png"
          ratio={3744 / 3320}
          w="full"
          // display={{ base: 'none', md: 'block' }}
        />
      </Box>
      <FlexCol
        w={{ base: ' full', md: '52.95%' }}
        px={{ base: 5, md: '44px' }}
        pt={{ base: 10, md: !address ? '84px' : 6 }}
        pb={{ base: 10, md: !address ? '87px' : 6 }}
        bg="white"
        rounded={24}
        alignItems="center"
        gap="30px"
        h="fit-content"
      >
        <Box lineHeight={1.145} fontSize={{ base: 32, md: 82 }}>
          SUBMIT
        </Box>
        {!address ? (
          <FlexCol w="full">
            <Button
              w="full"
              rounded={10}
              h="76px"
              bg="linear-gradient(90deg, #1EF69E 0%, #904FEC 100%)"
              color="white"
              onClick={() => setVisible(true)}
              disabled={buttonState === 'connecting' || buttonState === 'connected'}
            >
              Connect wallet to continue
            </Button>
          </FlexCol>
        ) : (
          <FlexCol gap="30px" fontSize={{ base: 20, md: 34 }} lineHeight={38.98 / 34} w="full" color="white">
            <Button
              rounded={10}
              h="76px"
              bg="rgba(43, 162, 222, 1)"
              onClick={!isTeleConnected ? openConnectTelegram : undefined}
              isLoading={!isTeleConnected && loadingTele && !!tgAuthResult}
              disabled={!address || (!isTeleConnected && loadingTele)}
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
              onClick={!isTwitterConnected ? openConnectTwitter : undefined}
              isLoading={!isTwitterConnected && loadingTwitter && isTwitter}
              disabled={!address || (!isTwitterConnected && loadingTwitter)}
            >
              <Center gap={{ base: 3, md: 22 }}>
                <XIcon />
                {isTwitterConnected ? user?.twitter_username : 'CONNECT X'}
                {isTwitterConnected && <VerifiedIcon />}
              </Center>
            </Button>
            <LinkCustom href="/" w="full">
              <Button
                w="full"
                rounded={10}
                h="76px"
                disabled={!isTwitterConnected || !isTeleConnected}
                _disabled={{
                  bg: 'rgba(192, 192, 192, 1)',
                  color: 'rgba(239, 239, 239, 1)',
                }}
                bg="linear-gradient(90deg, #1EF69E 0%, #904FEC 100%)"
                color="white"
              >
                CONTINUE
              </Button>
            </LinkCustom>

            <FlexCol
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
                <Box>Conditions for Airdrop</Box>
                <Box>and Jeets Score Index Eligibility</Box>
              </FlexCol>
              <FlexCenter gap="5px">
                <Box>X blue/gold tick</Box>
                <ImageRatio src="/icons/tick-1.png" ratio={1} w={6} />
                <ImageRatio src="/icons/tick-2.png" ratio={1} w={6} />
              </FlexCenter>
              <FlexCenter gap="5px">
                <Box>Has more than 2000 followers</Box>
                <ImageRatio src="/icons/p.png" ratio={1} w={6} />
              </FlexCenter>
              <FlexCenter gap="5px">
                <Box>Hold tokens from our partners</Box>
                <ImageRatio src="/icons/sun.png" ratio={1} w={6} />
                <ImageRatio src="/icons/moon.png" ratio={1} w={6} />
              </FlexCenter>
              <FlexCenter gap="5px">
                <Box>Pass our voting process</Box>
                <ImageRatio src="/icons/like.png" ratio={1} w={6} />
              </FlexCenter>
            </FlexCol>
          </FlexCol>
        )}
      </FlexCol>
    </Flex>
  );
}
