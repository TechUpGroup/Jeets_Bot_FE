'use client';

import { usePathname } from 'next/navigation';

import { Button, FlexCenter, ImageRatio, LinkCustom } from '@/components';
import { Flex } from '@chakra-ui/react';
import { useWalletMultiButton } from '@solana/wallet-adapter-base-ui';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';

export default function Header() {
  const { setVisible } = useWalletModal();
  const { buttonState, publicKey } = useWalletMultiButton({
    onSelectWallet() {
      setVisible(true);
    },
  });
  const pathname = usePathname();
  return (
    <Flex
      maxW={1680}
      w="full"
      justifyContent="space-between"
      alignItems="center"
      fontSize={{ base: 16, md: 24 }}
      pt={{ base: 4, md: '25px' }}
      gap={2.5}
      color="rgba(32, 27, 3, 1)"
      mx="auto"
    >
      <LinkCustom href="/">
        <ImageRatio
          src="/images/logo.png"
          ratio={271 / 108}
          w={{ base: 120, md: 271 }}
          display={{ base: 'none', md: 'block' }}
        />
        <ImageRatio src="/images/cry.png" ratio={3744 / 3320} w={'60px'} display={{ base: 'block', md: 'none' }} />
      </LinkCustom>

      <FlexCenter gap={{ base: 2.5, md: '60px' }}>
        {[
          { name: 'Missions', href: '/missions' },
          { name: 'Voting', href: '/voting' },
          { name: 'Pool', href: '/pool' },
        ].map((e) => (
          <LinkCustom
            key={e.name}
            href={e.href}
            color={pathname === e.href ? 'purple' : undefined}
            textDecor={pathname === e.href ? 'underline' : undefined}
          >
            {e.name}
          </LinkCustom>
        ))}

        {!publicKey ? (
          <Button
            px={{ base: 4, md: 7 }}
            h="50px"
            rounded={8}
            color="white"
            bg="linear-gradient(90deg, #1DF69D 0%, #904EEC 100%)"
            onClick={() => setVisible(true)}
            disabled={buttonState === 'connecting' || buttonState === 'connected'}
          >
            Connect Wallet
          </Button>
        ) : (
          <Button px={{ base: 4, md: 8 }} h="50px" rounded={8} border="1px solid black">
            Disconnect Wallet
          </Button>
        )}
      </FlexCenter>
    </Flex>
  );
}
