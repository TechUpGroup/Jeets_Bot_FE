'use client';

import { useMemo, useState } from 'react';

import {
  Button,
  Currency,
  FlexBanner,
  FlexCenter,
  FlexCol,
  ImageRatio,
  InputCurrency,
  Title,
  Title2,
  Wrapper,
} from '@/components';
import { XIconBlack } from '@/components/Icons';
import { useUser } from '@/store/useUserStore';
import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';

import CampainHistoriesTable from './CampainHistoriesTable';
import CampainTable from './CampainTable';

export default function CampaignView() {
  const user = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [maxBuyPerAddress, setMaxBuyPerAddress] = useState(0);
  const [totalSol, setTotalSol] = useState(1);
  const [showTooltip, setShowTooltip] = useState(false);

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

  return (
    <Wrapper>
      <Flex justifyContent="center" w="full" gap={1}>
        <Title>Jeets Index</Title>
        {/* <Button
          bg="makeColor"
          fontSize={{ base: 16, md: 20 }}
          h={{ base: 10, md: 10 }}
          color="white"
          px={4}
          rounded={8}
          onClick={onOpen}
        >
          CREATE CAMPAIGN
        </Button> */}
      </Flex>
      <FlexBanner>
        <FlexCol justifyContent="center" alignItems="center" flex={1} gap={2.5}>
          <Box fontSize={30} fontFamily="sfPro" fontWeight={800}>
          Jeets Index Score
          </Box>
          <Box color="purple" fontSize={42}>
            <Currency value={user?.score} />
          </Box>
        </FlexCol>
      </FlexBanner>
      <FlexBanner>
        <FlexCol justifyContent="center" alignItems="center" flex={1} gap={2.5}>
          <FlexCol alignItems="center" fontSize={{ base: 18, md: 24 }} color="#8F51EC">
            How it work?
          </FlexCol>
          <FlexCenter gap="5px">Hold tokens of our partners for 1 week, and you&apos;ll earn +7 points.</FlexCenter>
          <FlexCenter gap="5px">Selling 0.001% supply -1 point.</FlexCenter>
          <FlexCenter gap="5px">Buying 0.001% supply +1 point.</FlexCenter>
          <FlexCenter gap="5px">Voting for airdrop qualified +1 point.</FlexCenter>
        </FlexCol>
      </FlexBanner>
      <FlexCol
        fontSize={20}
        bg="rgba(208, 255, 237, 1)"
        rounded={10}
        py={4}
        px={6}
        w="full"
        gap={1.5}
        alignItems="center"
        textAlign="center"
      >
         <FlexCol alignItems="center" fontSize={{ base: 18, md: 24 }} color="#8F51EC">
         Conditions to start earning Jeets Index Score
          </FlexCol>
        <FlexCenter gap="5px">
          <XIconBlack w={6} />
          <Box>{user?.twitter_username ?? ''}</Box>
          <ImageRatio src={imageXVerified ?? `/icons/error.png`} ratio={1} w={7} />
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
              <Box as="span" color="#2BA2DE" textDecor="underline" cursor="pointer">
                our partners{' '}
              </Box>
              {user?.partner && <Box as="span">{user?.partner.symbol}</Box>}
            </Box>
            {!user?.partner && <ImageRatio src={`/icons/error.png`} ratio={1} w={6} />}
          </FlexCenter>
        )}
      </FlexCol>

      <CampainTable />

      <CampainHistoriesTable />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent rounded={24} bg="white" maxW="530px" w="full" mx={2.5} p={{ base: 4, md: 6 }}>
          <ModalCloseButton />
          <ModalBody fontFamily="sfPro" fontWeight={800} lineHeight={1.4} p={0}>
            <FlexCol gap={5} w="full">
              <Box fontSize={{ base: 16, md: 18 }} fontWeight={600} textAlign="center">
                Create campaign
              </Box>
              <FlexCol w="full" gap={2.5}>
                <Box>Amount</Box>
                <Box position="relative" w="full">
                  <InputCurrency style={{ paddingRight: '40px' }} />
                  <Flex
                    position="absolute"
                    top={0}
                    right={4}
                    h="full"
                    alignItems="center"
                    color="rgba(142, 142, 147, 1)"
                    fontWeight={500}
                  >
                    %
                  </Flex>
                </Box>
              </FlexCol>
              <FlexCol w="full" gap={2.5}>
                <Box fontSize={14}>You receive</Box>
                <Title2 color="purple" fontWeight={600}>
                  <Currency value={0} suffix=" DOG" />
                </Title2>
              </FlexCol>
              <Box w="full" borderBottom="1px solid rgba(99, 99, 102, 1)" />
              <Box fontSize={{ base: 16, md: 18 }}>Max buy per address</Box>
              <SimpleGrid columns={4} gap={2} fontSize={14} fontWeight={600}>
                {[0.1, 0.5, 0.7, 1].map((e) => (
                  <Box
                    key={e}
                    bg="rgba(243, 235, 255, 1)"
                    rounded={6}
                    p={2.5}
                    color="purple"
                    textAlign="center"
                    cursor="pointer"
                    onClick={() => setMaxBuyPerAddress(e)}
                  >
                    {e}%
                  </Box>
                ))}
              </SimpleGrid>
              <Box pb={'30px'}>
                <Slider
                  value={maxBuyPerAddress}
                  min={0}
                  max={1}
                  onChange={(val) => setMaxBuyPerAddress(val)}
                  py="9px"
                  h={6}
                  step={0.1}
                >
                  <SliderTrack bg="rgba(243, 235, 255, 1)" h={1.5} rounded={999}>
                    <SliderFilledTrack bg="purple" />
                  </SliderTrack>
                  <Box w="full" px={3} h={1.5}>
                    <Box position="relative" w="full" h="full">
                      <SliderThumb
                        bg="purple"
                        boxSize={6}
                        transform="translate(-50%, -50%)"
                        _active={{ transform: 'translate(-50%, -50%) scale(1.15)' }}
                      />
                      <SliderMark
                        value={maxBuyPerAddress}
                        textAlign="center"
                        color="rgba(174, 174, 178, 1)"
                        top="calc(100% + 19px)"
                        fontWeight={400}
                        fontSize={14}
                        transform="translateX(-50%)"
                      >
                        ({maxBuyPerAddress}%)
                      </SliderMark>
                    </Box>
                  </Box>
                </Slider>
              </Box>
              <Box w="full" borderBottom="1px solid rgba(99, 99, 102, 1)" />
              <FlexCol w="full" gap={2.5}>
                <Box>Price SOL/Token</Box>
                <Box position="relative" w="full">
                  <InputCurrency style={{ paddingRight: '52px' }} />
                  <Flex
                    position="absolute"
                    top={0}
                    right={4}
                    h="full"
                    alignItems="center"
                    color="rgba(142, 142, 147, 1)"
                    fontWeight={500}
                  >
                    SOL
                  </Flex>
                </Box>
              </FlexCol>

              <Box fontSize={{ base: 16, md: 18 }}>Total SOL Receive</Box>

              <Box pb={'30px'}>
                <Slider
                  value={totalSol}
                  min={1}
                  max={100}
                  onChange={(val) => setTotalSol(val)}
                  py="9px"
                  h={6}
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  <SliderTrack bg="rgba(243, 235, 255, 1)" h={1.5} rounded={999}>
                    <SliderFilledTrack bg="purple" />
                  </SliderTrack>
                  <Box w="full" px={3} h={1.5}>
                    <Box position="relative" w="full" h="full">
                      <Tooltip
                        hasArrow
                        bg="tooltip.500"
                        color="white"
                        fontWeight={400}
                        fontSize={14}
                        placement="top"
                        isOpen={showTooltip}
                        label={`${totalSol} SOL`}
                      >
                        <SliderThumb
                          bg="purple"
                          boxSize={6}
                          transform="translate(-50%, -50%)"
                          _active={{ transform: 'translate(-50%, -50%) scale(1.15)' }}
                        />
                      </Tooltip>

                      <SliderMark
                        value={0}
                        textAlign="center"
                        color="rgba(174, 174, 178, 1)"
                        top="calc(100% + 19px)"
                        fontWeight={400}
                        fontSize={14}
                        transform="translateX(-12px)"
                      >
                        (0SOL)
                      </SliderMark>
                      <SliderMark
                        value={100}
                        textAlign="center"
                        color="rgba(174, 174, 178, 1)"
                        top="calc(100% + 19px)"
                        fontWeight={400}
                        fontSize={14}
                        transform="translateX(calc(-100% + 12px))"
                      >
                        (100SOL)
                      </SliderMark>
                    </Box>
                  </Box>
                </Slider>
              </Box>
              <Button
                bg="makeColor"
                fontSize={{ base: 16, md: 20 }}
                fontWeight={400}
                rounded={8}
                px={{ base: 3, md: 5 }}
                h={{ base: 10, md: 10 }}
                color="white"
                fontFamily="titanOne"
              >
                DEPLOY
              </Button>
            </FlexCol>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Wrapper>
  );
}
