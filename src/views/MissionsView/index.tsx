'use client';

import { Button, FlexBetween, FlexCol, ImageRatio } from '@/components';
import { Box, Center, Flex } from '@chakra-ui/react';

export default function MissionsView() {
  return (
    <Flex flex={1} pt={{ base: 5, md: 30 }} justifyContent="center" lineHeight={1.145} pb={10}>
      <FlexCol maxW={1517} w="full" rounded={24} pt={6} px={'44px'} pb={79} bg="white" alignItems="center" gap={30}>
        <Box fontSize={82}>MISSIONS</Box>
        <Flex gap={2.5} rounded={10} bg="rgba(29, 246, 157, 0.2)" w="full" px="25.43px">
          <ImageRatio src="/images/people-pool.png" ratio={178 / 175} w={178} mt="15px" />
          <FlexCol justifyContent="center" alignItems="center" flex={1} gap={2.5}>
            <Box fontSize={52} color="purple" textTransform="uppercase">
              congratulations
            </Box>
            <Box fontFamily="sfPro" fontSize={20} fontWeight={800} color="black">
              You have been added to the whitelist. Let’s vote to find the winner
            </Box>
            <Button
              bg="linear-gradient(90deg, #1DF69D 0%, #904EEC 100%)"
              px="96px"
              h="50px"
              fontSize={20}
              color="white"
              rounded={8}
            >
              VOTE
            </Button>
          </FlexCol>
          <ImageRatio
            src="/images/people-pool.png"
            ratio={178 / 175}
            w={178}
            mt="15px"
            transform="matrix(-1, 0, 0, 1, 0, 0)"
          />
        </Flex>
        <FlexCol gap={2.5} w="full">
          <FlexBetween fontSize={18} fontWeight={800} fontFamily="sfPro">
            <Box>Your Progress</Box>
            <Box>50%</Box>
          </FlexBetween>
          <Box w="full" bg="rgba(214, 231, 246, 1)" rounded={100} overflow="hidden" h={4}>
            <Box w="50%" h="full" rounded={100} bg="linear-gradient(90deg, #1DF69D 0%, #904EEC 100%)" />
          </Box>
        </FlexCol>
        <FlexCol w="full" gap="30px">
          {Array.from({ length: 10 }).map((_, i) => (
            <Flex
              key={i}
              justifyContent="space-between"
              p={5}
              bg="rgba(237, 247, 255, 1)"
              rounded={10}
              alignItems="center"
            >
              <FlexCol gap={2.5} fontFamily="sfPro" lineHeight={1.4}>
                <Box fontSize={14} fontWeight={500}>
                  Mission #1
                </Box>
                <Box fontSize={20} fontWeight={800}>
                  Join SolJeetsBot Telegram Channel (10%)
                </Box>
              </FlexCol>
              <Box w={248} h="50px" fontSize={20}>
                {true ? (
                  <Button
                    w="full"
                    h="full"
                    rounded={8}
                    bg="linear-gradient(90deg, #1DF69D 0%, #904EEC 100%)"
                    color="white"
                  >
                    Join
                  </Button>
                ) : (
                  <Center w="full" h="full" rounded={8} color="green" border="2px solid" borderColor="green">
                    COMPLETED
                  </Center>
                )}
              </Box>
            </Flex>
          ))}
        </FlexCol>
      </FlexCol>
    </Flex>
  );
}
