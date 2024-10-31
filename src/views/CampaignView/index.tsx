'use client';

import { cloneDeep } from 'lodash';
import { useState } from 'react';

import { Button, Currency, FlexBanner, FlexCol, InputCurrency, LinkCustom, Title, Title2, Wrapper } from '@/components';
import { useCurrentTime } from '@/hooks/useCurrentTime';
import { queryClient } from '@/providers/react-query';
import { ICampaignResponse, postClaimAirdrop } from '@/services/campaign';
import dayjs from '@/utils/dayjs';
import { toastError, toastSuccess } from '@/utils/toast';
import { InfoIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
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

import { CollapseAirdrop } from './CollapseAirdrop';
import { CollapseItem } from './CollapseItem';
import { useClaimVault } from './hooks/useClaimVault';
import { useQueryCampaign } from './hooks/useQueryCampaign';

export default function CampaignView() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [maxBuyPerAddress, setMaxBuyPerAddress] = useState(0);
  const [totalSol, setTotalSol] = useState(1);
  const [showTooltip, setShowTooltip] = useState(false);
  const currentTime = useCurrentTime();

  const { data } = useQueryCampaign();

  const claimVault = useClaimVault();
  const [loading, setLoading] = useState('');

  const handleClaimVault = async (id: string) => {
    try {
      setLoading(id);
      const signature = await postClaimAirdrop(id);
      await claimVault(signature);
      toastSuccess('Claim success!');
      queryClient.setQueryData(['getListCampaign'], (oldData: ICampaignResponse) => {
        const cloned = cloneDeep(oldData);
        const airdrop = cloned.airdrops?.find((e) => e._id === id);
        if (airdrop) {
          airdrop.status = true;
        }
        return cloned;
      });
    } catch (e) {
      toastError('Claim failed!', e);
    } finally {
      setLoading('');
    }
  };

  return (
    <Wrapper>
      <Flex justifyContent="center" w="full" gap={1}>
        <Title>CAMPAIGN</Title>
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
            List campaign
          </Box>
          {/* <Box color="purple" fontSize={42}>
            Oct 21 - oct 27, 2024
          </Box> */}
        </FlexCol>
      </FlexBanner>

      <TableContainer w="full" pb={4}>
        <Table
          variant="unstyled"
          style={{ borderCollapse: 'separate', borderSpacing: '0 10px' }}
          fontFamily="sfPro"
          fontWeight={800}
        >
          <Thead>
            <Tr fontSize={{ base: 16, md: 20 }} color="rgba(172, 172, 172, 1)">
              {[
                { name: 'Campaign', center: false, w: 288 },
                { name: 'Time' },
                {
                  name: (
                    <Flex gap={1}>
                      <Popover placement="top" trigger={'hover'}>
                        <PopoverTrigger>
                          <Button display="flex" h="fit-content" gap={1}>
                            SPW
                            <InfoIcon />
                          </Button>
                        </PopoverTrigger>
                        <Portal>
                          <PopoverContent w="fit-content" bg="black" rootProps={{ zIndex: 999 }}>
                            <PopoverBody>
                              <Box fontFamily="sfPro" fontWeight={800} color="white">
                                Score Per Week
                              </Box>
                            </PopoverBody>
                          </PopoverContent>
                        </Portal>
                      </Popover>
                    </Flex>
                  ),
                },
                { name: 'Historical' },
                { name: 'Eligible' },
                { name: 'Status', w: 288 },
              ].map((e, i) => (
                <Td
                  key={i}
                  p={0}
                  lineHeight={1.4}
                  textAlign={e.center === false ? undefined : 'center'}
                  pr={i === 0 ? { base: 2, md: 5 } : undefined}
                  px={i !== 0 ? { base: 2, md: 5 } : undefined}
                  w={e.w}
                >
                  {e.name}
                </Td>
              ))}
            </Tr>
          </Thead>
          <Tbody fontSize={{ base: 16, md: 20 }}>
            {data?.airdrops?.map((airdrop, i) => {
              return (
                <Tr key={i}>
                  <Td p={{ base: 2, md: 5 }} bg="rgba(237, 247, 255, 1)" roundedLeft={10}>
                    <CollapseAirdrop item={airdrop} />
                    {/* Airdroped { } */}
                  </Td>
                  <Td p={{ base: 2, md: 5 }} bg="rgba(237, 247, 255, 1)">
                    <Flex alignItems="center" justifyContent="center" textAlign="center">
                      {dayjs.utc(airdrop.timestamp).format('MMM DD, YYYY')}
                    </Flex>
                  </Td>
                  <Td p={{ base: 2, md: 5 }} bg="rgba(237, 247, 255, 1)">
                    <Flex alignItems="center" justifyContent="center" textAlign="center" gap={2}>
                      {/* <Currency value={airdrop.score} /> */}
                    </Flex>
                  </Td>
                  <Td p={{ base: 2, md: 5 }} bg="rgba(237, 247, 255, 1)">
                    <Flex alignItems="center" justifyContent="center" textAlign="center" gap={2}></Flex>
                  </Td>
                  <Td p={{ base: 2, md: 5 }} bg="rgba(237, 247, 255, 1)">
                    <Flex alignItems="center" justifyContent="center" textAlign="center" gap={2}></Flex>
                  </Td>
                  <Td p={{ base: 2, md: 5 }} bg="rgba(237, 247, 255, 1)" roundedRight={10}>
                    <Flex alignItems="center">
                      {airdrop.status ? (
                        <Button
                          h={{ base: 9, md: 10 }}
                          w="full"
                          color="rgba(23, 210, 133, 1)"
                          border="1px solid"
                          borderColor="rgba(23, 210, 133, 1)"
                          rounded={8}
                          bg="white"
                          px={{ base: 3, md: 5 }}
                          cursor="default"
                        >
                          Claimed
                        </Button>
                      ) : (
                        <Button
                          h={{ base: 9, md: 10 }}
                          w="full"
                          color="rgba(253, 214, 75, 1)"
                          border="1px solid"
                          borderColor="rgba(253, 214, 75, 1)"
                          rounded={8}
                          bg="white"
                          px={{ base: 3, md: 5 }}
                          disabled={!!loading}
                          isLoading={loading === airdrop._id}
                          onClick={() => handleClaimVault(airdrop._id)}
                        >
                          Claim
                        </Button>
                      )}
                    </Flex>
                  </Td>
                </Tr>
              );
            })}

            {data?.campaigns.docs.map((campaign, i) => {
              const startTime = dayjs.utc(campaign.start_time);
              const endTime = dayjs.utc(campaign.end_time);
              return (
                <Tr key={i}>
                  <Td p={{ base: 2, md: 5 }} bg="rgba(237, 247, 255, 1)" roundedLeft={10}>
                    <CollapseItem campaign={campaign} />
                  </Td>
                  <Td p={{ base: 2, md: 5 }} bg="rgba(237, 247, 255, 1)">
                    <Flex alignItems="center" justifyContent="center" textAlign="center">
                      {startTime.isSame(endTime, 'year')
                        ? startTime.format('MMM DD')
                        : startTime.format('MMM DD, YYYY')}{' '}
                      - {endTime.format('MMM DD, YYYY')}
                    </Flex>
                  </Td>
                  <Td p={{ base: 2, md: 5 }} bg="rgba(237, 247, 255, 1)">
                    <Flex alignItems="center" justifyContent="center" textAlign="center" gap={2}>
                      <Currency value={campaign.score} />
                    </Flex>
                  </Td>
                  <Td p={{ base: 2, md: 5 }} bg="rgba(237, 247, 255, 1)">
                    <Flex alignItems="center" justifyContent="center" textAlign="center" gap={2}>
                      <LinkCustom href="/profile">
                        <Button
                          h={{ base: 9, md: 10 }}
                          w="fit-content"
                          color="rgba(23, 210, 133, 1)"
                          border="1px solid"
                          borderColor="rgba(23, 210, 133, 1)"
                          rounded={8}
                          bg="white"
                          px={{ base: 4, md: 4 }}
                          cursor="default"
                        >
                          View
                        </Button>
                      </LinkCustom>
                    </Flex>
                  </Td>
                  <Td p={{ base: 2, md: 5 }} bg="rgba(237, 247, 255, 1)">
                    <Flex alignItems="center" justifyContent="center" textAlign="center" gap={2}>
                      {campaign.statusHold ? 'Yes' : 'No'}
                    </Flex>
                  </Td>
                  <Td p={{ base: 2, md: 5 }} bg="rgba(237, 247, 255, 1)" roundedRight={10}>
                    <Flex alignItems="center">
                      {currentTime > campaign.end_time ? (
                        <Button
                          h={{ base: 9, md: 10 }}
                          w="full"
                          color="rgba(23, 210, 133, 1)"
                          border="1px solid"
                          borderColor="rgba(23, 210, 133, 1)"
                          rounded={8}
                          bg="white"
                          px={{ base: 3, md: 5 }}
                          cursor="default"
                        >
                          Finished
                        </Button>
                      ) : currentTime < campaign.start_time ? (
                        <Button
                          h={{ base: 9, md: 10 }}
                          w="full"
                          color="rgba(253, 214, 75, 1)"
                          border="1px solid"
                          borderColor="rgba(253, 214, 75, 1)"
                          rounded={8}
                          bg="white"
                          px={{ base: 3, md: 5 }}
                          cursor="default"
                        >
                          Comming Soon
                        </Button>
                      ) : (
                        <Button
                          h={{ base: 9, md: 10 }}
                          w="full"
                          color="rgba(253, 214, 75, 1)"
                          border="1px solid"
                          borderColor="rgba(253, 214, 75, 1)"
                          rounded={8}
                          bg="white"
                          px={{ base: 3, md: 5 }}
                          cursor="default"
                        >
                          On Going
                        </Button>
                      )}
                    </Flex>
                  </Td>
                </Tr>
              );
            })}
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
