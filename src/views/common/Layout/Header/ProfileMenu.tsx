import { Button, FlexCol, LinkCustom } from '@/components';
import useAuth from '@/hooks/useAuth';
import { useUser } from '@/store/useUserStore';
import { formatAddress } from '@/utils/address';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Box, Flex, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useWalletMultiButton } from '@solana/wallet-adapter-base-ui';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';

export const ProfileMenu = () => {
  const user = useUser();
  const { setVisible } = useWalletModal();
  const { buttonState, publicKey } = useWalletMultiButton({
    onSelectWallet() {
      setVisible(true);
    },
  });

  const { logout } = useAuth();

  if (!publicKey) {
    return (
      <Button
        fontSize={{ base: 14, md: 24 }}
        px={{ base: 3, md: 7 }}
        h={{ base: '60px', md: '50px' }}
        w={{ base: '100px', md: 'fit-content' }}
        rounded={8}
        color="white"
        bg="makeColor"
        onClick={() => setVisible(true)}
        disabled={buttonState === 'connecting' || buttonState === 'connected'}
      >
        Connect Wallet
      </Button>
    );
  }
  return (
    <Menu placement="bottom-end">
      <MenuButton as={Button}>
        <Flex
          px="9px"
          rounded={8}
          border="1px solid black"
          gap={{ base: 2, md: 5 }}
          alignItems="center"
          minH={{ base: 10, md: '50px' }}
        >
          {/* <ImageRatio
        src={'https://placehold.co/40x40/png'}
        ratio={1}
        w={{ base: 10, md: 10 }}
        rounded={999}
        overflow="hidden"
      /> */}
          <FlexCol lineHeight={1}>
            <Box fontSize={14} fontWeight={800} color="purple" fontFamily="sfPro">
              {formatAddress(publicKey.toBase58())}
            </Box>
          </FlexCol>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuItem onClick={logout} fontSize={{ base: 14, md: 16 }} py={1}>
          Disconnect Wallet
        </MenuItem>
        <MenuItem fontSize={{ base: 14, md: 16 }} py={1}>
          <LinkCustom href="/profile">Profile</LinkCustom>
        </MenuItem>
        {!!user?.twitter_username && (
          <MenuItem fontSize={{ base: 14, md: 14 }} py={1}>
            <LinkCustom href={`https://x.com/${user?.twitter_username}`} target="_blank">
              X: {user?.twitter_username}
            </LinkCustom>
          </MenuItem>
        )}
        {!!user?.telegram_username && (
          <MenuItem fontSize={{ base: 14, md: 14 }} py={1}>
            <LinkCustom href={`https://t.me/${user?.telegram_username}`} target="_blank">
              Telegram: {user?.telegram_username}
            </LinkCustom>
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};
