'use client';

import { useEffect, useMemo, useState } from 'react';

import { Button, Currency, FlexCenter, FlexCol, ImageRatio, ModalBase, SelectForm } from '@/components';
import { SearchIcon } from '@/components/Icons';
import { postUpdatePartner } from '@/services/contract';
import { useUser } from '@/store/useUserStore';
import { toastError } from '@/utils/toast';
import { Box, useDisclosure } from '@chakra-ui/react';

import { useQueryHolderRequire } from './hooks/useQueryHolderRequire';

export default function ConditionTab() {
  const { data: holderRequire } = useQueryHolderRequire();

  const options = useMemo(() => {
    return holderRequire?.map((item) => ({
      value: item.contract_address,
      label: (
        <FlexCenter gap={2}>
          <Currency value={item.require_hold} decimalNumber={item.decimal} /> {item.symbol}
        </FlexCenter>
      ),
    }));
  }, [holderRequire]);

  const [optionSelected, setOptionSelected] = useState<any>();
  const [optionSelectedTemp, setOptionSelectedTemp] = useState<any>();

  useEffect(() => {
    if (options && options.length > 0) {
      setOptionSelected(options[0]);
    }
  }, [options]);

  const user = useUser();

  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const isPassed = useMemo(() => {
    if (!user) return false;
    return user?.is_hold_token && user.twitter_verified_type !== 'none' && user.twitter_followers_count >= 2000;
  }, [user]);

  const [loadingUpdatePartner, setLoadingUpdatePartner] = useState(false);
  const handleUpdatePartner = async () => {
    if (optionSelected) {
      try {
        setLoadingUpdatePartner(true);
        await postUpdatePartner(optionSelected.value);
        onClose();
      } catch (e: any) {
        toastError('Update partner failed', e);
      } finally {
        setLoadingUpdatePartner(false);
      }
    }
  };

  return (
    <>
      <FlexCol
        maxW={1517}
        w="full"
        rounded={24}
        pt={6}
        px={{ base: 4, md: 6, lg: 8, xl: '44px' }}
        pb={79}
        bg="white"
        alignItems="center"
        gap={30}
        lineHeight={1.145}
      >
        <FlexCol
          w="full"
          border="3px dashed"
          borderColor="#8F51EC"
          rounded={8}
          p={5}
          alignItems="center"
          gap={{ base: 1.5, md: 2.5 }}
          lineHeight={1.145}
          fontSize={{ base: 14, md: 20 }}
          color="#201B03"
          textAlign="center"
        >
          <FlexCol alignItems="center" fontSize={{ base: 18, md: 24 }} color="#8F51EC">
            Airdrop Eligibility
          </FlexCol>
          <FlexCenter gap="5px">
            <Box>Have X blue/gold tick</Box>
            <ImageRatio src={imageXVerified ?? `/icons/error.png`} ratio={1} w={6} />
          </FlexCenter>
          <FlexCenter gap="5px">
            <Box>Have more than 2000 followers</Box>
            <ImageRatio
              src={(user?.twitter_followers_count ?? 0) >= 2000 ? `/icons/success.png` : `/icons/error.png`}
              ratio={1}
              w={6}
            />
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
                <Box as="span" color="#2BA2DE" textDecor="underline" cursor="pointer" onClick={onOpen}>
                  our partners{' '}
                </Box>
                {user?.partner && <Box as="span">{user?.partner.symbol}</Box>}
              </Box>
              {!user?.partner && <ImageRatio src={`/icons/error.png`} ratio={1} w={6} />}
            </FlexCenter>
          )}

          <FlexCenter gap="5px">
            <Box>Pass our voting process</Box>
            <ImageRatio src={isPassed ? `/icons/success.png` : `/icons/error.png`} ratio={1} w={6} />
          </FlexCenter>
        </FlexCol>

        <FlexCol
          w="full"
          border="3px dashed"
          borderColor="#8F51EC"
          rounded={8}
          p={5}
          alignItems="center"
          gap={{ base: 1.5, md: 2.5 }}
          lineHeight={1.145}
          fontSize={{ base: 14, md: 20 }}
          color="#201B03"
          textAlign="center"
        >
          <FlexCol alignItems="center" fontSize={{ base: 18, md: 24 }} color="#8F51EC">
            Voting Eligibility
          </FlexCol>
          <FlexCenter gap="5px">
            <Box>Have X blue/gold tick</Box>
            <ImageRatio src={imageXVerified ?? `/icons/error.png`} ratio={1} w={6} />
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
                <Box as="span" color="#2BA2DE" textDecor="underline" cursor="pointer" onClick={onOpen}>
                  our partners{' '}
                </Box>
                {user?.partner && <Box as="span">{user?.partner.symbol}</Box>}
              </Box>
              {!user?.partner && <ImageRatio src={`/icons/error.png`} ratio={1} w={6} />}
            </FlexCenter>
          )}
          {/* <FlexCenter gap="5px">
            <Box>Eligible for voting</Box>
            <ImageRatio src={!!imageXVerified ? `/icons/success.png` : `/icons/error.png`} ratio={1} w={6} />
          </FlexCenter> */}
        </FlexCol>
      </FlexCol>

      <ModalBase isOpen={isOpen} onClose={onClose} isCentered minW={{ base: 'unset', md: 530 }}>
        <FlexCol gap={5} w="full">
          <Box textAlign="center" fontSize={{ base: 16, md: 18 }}>
            Hold tokens from our partners
          </Box>
          <Box fontWeight={500} pos="relative">
            <Box pos="absolute" top="50%" transform="translateY(-50%)" left={4} zIndex={2}>
              <SearchIcon />
            </Box>
            <SelectForm
              styles={{
                control: (baseStyles) => {
                  return {
                    ...baseStyles,
                    background: 'white',
                    borderColor: 'rgba(192, 192, 192, 1)',
                    borderRadius: 8,
                    paddingLeft: 32,
                  };
                },
                indicatorsContainer: () => ({ display: 'none' }),
              }}
              value={optionSelectedTemp}
              options={options}
              placeholder="Search contract token"
              onChange={(value) => {
                setOptionSelectedTemp(value);
                setOptionSelectedTemp(null);
                setOptionSelected(value);
              }}
            />
          </Box>
          <Box>Amount</Box>
          <Box fontWeight={500}>
            <SelectForm
              isSearchable={false}
              value={optionSelected}
              onChange={(value) => setOptionSelected(value)}
              options={options}
            />
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
            disabled={!optionSelected}
            isLoading={loadingUpdatePartner}
            onClick={handleUpdatePartner}
          >
            CONFIRM
          </Button>
        </FlexCol>
      </ModalBase>
    </>
  );
}