'use client';

import { useState } from 'react';

import { Button, Currency, FlexBanner, FlexCol, InputCurrency, Title, Title2, Wrapper } from '@/components';
import {
  Box,
  Flex,
  Input,
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
  Table,
  TableContainer,
  Tbody,
  Td,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';

import { CollapseItem } from './CollapseItem';

export default function CampaignView() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [maxBuyPerAddress, setMaxBuyPerAddress] = useState(0);
  const [totalSol, setTotalSol] = useState(1);
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <Wrapper>
      <Flex justifyContent="space-between" w="full" gap={1}>
        <Title>CAMPAIGN</Title>
        <Button
          bg="makeColor"
          fontSize={{ base: 16, md: 20 }}
          h={{ base: 10, md: 10 }}
          color="white"
          px={4}
          rounded={8}
          onClick={onOpen}
        >
          CREATE CAMPAIGN
        </Button>
      </Flex>
      <FlexBanner>
        <FlexCol justifyContent="center" alignItems="center" flex={1} gap={2.5}>
          <Box fontSize={30} fontFamily="sfPro" fontWeight={800}>
            Campaign in week
          </Box>
          <Box color="purple" fontSize={42}>
            Oct 21 - oct 27, 2024
          </Box>
        </FlexCol>
      </FlexBanner>

      <TableContainer w="full" pb={4}>
        <Table variant="unstyled" style={{ borderCollapse: 'separate', borderSpacing: '0 10px' }}>
          <Thead>
            <Tr fontFamily="sfPro" fontWeight={800} fontSize={{ base: 16, md: 20 }} color="rgba(172, 172, 172, 1)">
              <Td p={0} lineHeight={1.4} w={288} pr={5}>
                Campaign
              </Td>
              <Td p={0} lineHeight={1.4} textAlign="center" px={5}>
                Time
              </Td>
              <Td p={0} lineHeight={1.4} textAlign="center" px={5}>
                Jeets Score Rewards
              </Td>
              <Td p={0} lineHeight={1.4} textAlign="center" w={288} px={5}>
                Status
              </Td>
            </Tr>
          </Thead>
          <Tbody fontSize={{ base: 16, md: 20 }} fontFamily="sfPro" fontWeight={800}>
            {Array.from({ length: 10 }).map((_, i) => (
              <Tr key={i}>
                <Td p={5} bg="rgba(237, 247, 255, 1)" roundedLeft={10}>
                  <CollapseItem />
                </Td>
                <Td p={5} bg="rgba(237, 247, 255, 1)">
                  <Flex alignItems="center" justifyContent="center" textAlign="center">
                    Oct 21 - Oct 27, 2024
                  </Flex>
                </Td>
                <Td p={5} bg="rgba(237, 247, 255, 1)">
                  <Flex alignItems="center" justifyContent="center" textAlign="center">
                    <Currency value={2_000} />
                  </Flex>
                </Td>

                <Td p={5} bg="rgba(237, 247, 255, 1)" roundedRight={10}>
                  <Flex alignItems="center">
                    <Button
                      h={{ base: 10 }}
                      w="full"
                      color="rgba(253, 214, 75, 1)"
                      border="1px solid"
                      borderColor="rgba(253, 214, 75, 1)"
                      rounded={8}
                      bg="white"
                      px={5}
                      cursor="default"
                    >
                      On Going
                    </Button>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

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
                px={5}
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
