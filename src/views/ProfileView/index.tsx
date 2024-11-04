'use client';

import { Currency, FlexBanner, FlexCol, Title, Wrapper } from '@/components';
import { useUser } from '@/store/useUserStore';
import { Box } from '@chakra-ui/react';

import UserInfoProfile from './UserInfoProfile';

export default function ProfileView() {
  const user = useUser();
  return (
    <Wrapper>
      <Title>PROFILE</Title>
      <FlexBanner>
        <FlexCol justifyContent="center" alignItems="center" flex={1} gap={2.5}>
          <Box fontSize={30} fontFamily="sfPro" fontWeight={800}>
            Jeets Score
          </Box>
          <Box color="purple" fontSize={42}>
            <Currency value={user?.score} />
          </Box>
        </FlexCol>
      </FlexBanner>

      <UserInfoProfile />
    </Wrapper>
  );
}
