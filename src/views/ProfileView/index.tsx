'use client';

import { Currency, FlexBanner, FlexCol, Title, Wrapper } from '@/components';
import { useUser } from '@/store/useUserStore';
import { Box, Flex } from '@chakra-ui/react';

import UserInfoProfile from './UserInfoProfile';
import { isMobile } from 'react-device-detect';

export default function ProfileView() {
  const user = useUser();
  return (
    <Wrapper>
      <Title>PROFILE</Title>
      <FlexBanner>
        <FlexCol justifyContent="center" alignItems="center" flex={1} gap={2.5}>
          <Flex alignItems="center" fontSize={{ base: 18, md: 24 }} color="#88888" gap={2.5}>
          Jeets Index Score
        </Flex>
          <Box color="purple" fontSize={42}>
            <Currency value={user?.score} />
          </Box>
        </FlexCol>
      </FlexBanner>

      <UserInfoProfile />
    </Wrapper>
  );
}
