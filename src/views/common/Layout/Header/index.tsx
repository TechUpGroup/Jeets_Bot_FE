'use client';

import { usePathname } from 'next/navigation';

import { FlexCenter, FlexCol, ImageRatio, LinkCustom } from '@/components';
import { useIsLogin } from '@/hooks/useIsLogin';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, Drawer, DrawerCloseButton, DrawerContent, IconButton, SimpleGrid, useDisclosure } from '@chakra-ui/react';

import { ProfileMenu } from './ProfileMenu';

const menus = [
  { name: 'Missions', href: '/missions', sub: '/' },
  { name: 'Voting', href: '/voting' },
  { name: 'Pool', href: '/pool' },
  { name: 'Campaign', href: '/campaign' },
  { name: 'Leaderboard', href: '/leaderboard' },
  { name: 'Launch', href: '/launch' },
];

const Header = () => {
  const pathname = usePathname();
  const isLinked = useIsLogin();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box px={{ base: 2.5, md: 5 }} w="full">
      <SimpleGrid
        columns={3}
        display={{ base: 'grid', md: 'flex' }}
        maxW={1680}
        w="full"
        justifyContent="space-between"
        alignItems="center"
        fontSize={{ base: 16, md: 18, lg: 20, xl: 24 }}
        pt={{ base: 3, md: '25px' }}
        gap={2.5}
        color="rgba(32, 27, 3, 1)"
        mx="auto"
      >
        <Box display={{ base: 'block', md: 'none' }}>
          {isLinked && <IconButton aria-label="Menu" icon={<HamburgerIcon />} onClick={onOpen} />}
          <Drawer
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            returnFocusOnClose={false}
            onOverlayClick={onClose}
            size="full"
          >
            <DrawerContent>
              <DrawerCloseButton />
              <FlexCol gap={5} pt={10} px={5} fontSize={24}>
                {isLinked &&
                  menus.map((e) => (
                    <LinkCustom
                      key={e.name}
                      href={e.href}
                      color={pathname === e.href || pathname === e.sub ? 'purple2' : undefined}
                      textDecor={pathname === e.href || pathname === e.sub ? 'underline' : undefined}
                      onClick={onClose}
                    >
                      {e.name}
                    </LinkCustom>
                  ))}
              </FlexCol>
            </DrawerContent>
          </Drawer>
        </Box>
        <LinkCustom href={!isLinked ? '/login' : '/'}>
          <ImageRatio
            src="/images/logo.png"
            ratio={552 / 220}
            w={{ base: 120, md: 275 }}
            display={{ base: 'none', md: 'block' }}
          />
          <ImageRatio
            src="/images/logo-mobile.png"
            ratio={1}
            w={'60px'}
            display={{ base: 'block', md: 'none' }}
            mx="auto"
          />
        </LinkCustom>

        <FlexCenter gap={{ base: 2.5, md: 3, lg: 5, xl: '40px' }} justifyContent="end">
          <FlexCenter gap={{ base: 2.5, md: 3, lg: 5, xl: '40px' }} display={{ base: 'none', md: 'flex' }}>
            {isLinked &&
              menus.map((e) => (
                <LinkCustom
                  key={e.name}
                  href={e.href}
                  color={pathname === e.href || pathname === e.sub ? 'purple2' : undefined}
                  textDecor={pathname === e.href || pathname === e.sub ? 'underline' : undefined}
                >
                  {e.name}
                </LinkCustom>
              ))}
          </FlexCenter>
          <ProfileMenu />
        </FlexCenter>
      </SimpleGrid>
    </Box>
  );
};

export default Header;
