'use client';

import { usePathname } from 'next/navigation';

import { Button, FlexCenter, FlexCol, ImageRatio, LinkCustom } from '@/components';
import useAuth from '@/hooks/useAuth';
import { useIsLogin } from '@/hooks/useIsLogin';
import { formatAddress } from '@/utils/address';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Box, Flex, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useWalletMultiButton } from '@solana/wallet-adapter-base-ui';
import { useWalletModal } from '@tiplink/wallet-adapter-react-ui';

export default function Header() {
  const { setVisible } = useWalletModal();
  const { buttonState, publicKey } = useWalletMultiButton({
    onSelectWallet() {
      setVisible(true);
    },
  });

  const { logout } = useAuth();
  const pathname = usePathname();
  const isLinked = useIsLogin(pathname !== '/login');
  return (
    <Box px={{ base: 2.5, md: 5 }} w="full">
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
        <LinkCustom href={!isLinked ? '/login' : '/'}>
          <ImageRatio
            src="/images/logo.png"
            ratio={271 / 108}
            w={{ base: 120, md: 271 }}
            display={{ base: 'none', md: 'block' }}
          />
          <ImageRatio src="/images/cry.png" ratio={3744 / 3320} w={'60px'} display={{ base: 'block', md: 'none' }} />
        </LinkCustom>

        <FlexCenter gap={{ base: 2.5, md: '60px' }}>
          {isLinked &&
            [
              { name: 'Missions', href: '/missions', sub: '/' },
              { name: 'Voting', href: '/voting' },
              { name: 'Pool', href: '/pool' },
            ].map((e) => (
              <LinkCustom
                key={e.name}
                href={e.href}
                color={pathname === e.href || pathname === e.sub ? 'purple' : undefined}
                textDecor={pathname === e.href || pathname === e.sub ? 'underline' : undefined}
              >
                {e.name}
              </LinkCustom>
            ))}

          {!publicKey ? (
            <Button
              fontSize={{ base: 14, md: 24 }}
              px={{ base: 3, md: 7 }}
              h={{ base: '60px', md: '50px' }}
              w={{ base: '100px', md: 'fit-content' }}
              rounded={8}
              color="white"
              bg="linear-gradient(90deg, #1DF69D 0%, #904EEC 100%)"
              onClick={() => setVisible(true)}
              disabled={buttonState === 'connecting' || buttonState === 'connected'}
            >
              Connect Wallet
            </Button>
          ) : (
            <Menu placement="bottom-end">
              <MenuButton as={Button}>
                <Flex px="9px" rounded={8} border="1px solid black" gap={5} alignItems="center" minH="50px">
                  {/* <ImageRatio
                src={'https://placehold.co/40x40/png'}
                ratio={1}
                w={{ base: 10, md: 10 }}
                rounded={999}
                overflow="hidden"
              /> */}
                  <FlexCol lineHeight={1}>
                    <Box fontSize={14} fontWeight={800} color="rgba(143, 81, 236, 1)" fontFamily="sfPro">
                      {formatAddress(publicKey.toBase58())}
                    </Box>
                  </FlexCol>
                  <ChevronDownIcon />
                </Flex>
              </MenuButton>
              <MenuList>
                <MenuItem onClick={logout} fontSize={{ base: 14, md: 18 }}>
                  Disconnect Wallet
                </MenuItem>
              </MenuList>
            </Menu>
            // <Button
            //   fontSize={{ base: 14, md: 24 }}
            //   px={{ base: 4, md: 8 }}
            //   h="50px"
            //   rounded={8}
            //   border="1px solid black"
            //   onClick={logout}
            // >
            //   Disconnect Wallet
            // </Button>
          )}
        </FlexCenter>
      </Flex>
    </Box>
  );
}
