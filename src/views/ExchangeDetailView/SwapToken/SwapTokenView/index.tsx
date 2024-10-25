import BigNumber from 'bignumber.js';
import { isNil } from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { formatEther } from 'viem';

import {
  Button,
  Container,
  Currency,
  FlexBetween,
  FlexCol,
  InputForm,
  Line,
  LinkCustom,
  ModalBase,
  TextareaForm,
  Title,
} from '@/components';
import { EditIcon, SettingIcon, SwapIcon } from '@/components/Icons';
import useActiveWeb3React from '@/hooks/useActiveWeb3React';
import { useAddress } from '@/hooks/useAddress';
import { useDebounce } from '@/hooks/useDebounce';
import { useApproveToken, useEthBalance, useTokenAllowance, useTokenBalance } from '@/hooks/wagmi';
import { postBuyToken, postSellToken } from '@/services/token';
import useListUserStore from '@/store/useListUserStore';
import { ITokenInfo } from '@/types/token.type';
import { toastError, toastSuccess } from '@/utils/toast';
import { ConnectWalletButton } from '@/views/common/Layout/Header/ConnectWalletButton';
import {
  Box,
  Button as ButtonChakra,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  useDisclosure,
} from '@chakra-ui/react';

import { useBuyToken } from './hooks/useBuyToken';
import { useCalculateFee } from './hooks/useCalculateFee';
import { useCalculateTokenOut } from './hooks/useCalculateTokenOut';
import { useSellToken } from './hooks/useSellToken';

export const SwapTokenView = ({ token }: { token: ITokenInfo; isSell: boolean }) => {
  const slippage = useListUserStore((s) => s.slippage);
  const setSlippage = useListUserStore((s) => s.setSlippage);
  const { moonad } = useAddress();
  const { address, network } = useActiveWeb3React();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenSlippage, onOpen: onOpenSlippage, onClose: onCloseSlippage } = useDisclosure();
  const { isOpen: isOpenAlert, onOpen: onOpenAlert, onClose: onCloseAlert } = useDisclosure();
  const ethBalance = useEthBalance();
  const tokenBalance = useTokenBalance(token.mint);
  const tokenAllowance = useTokenAllowance(token.mint, moonad);
  const approveToken = useApproveToken(token.mint, moonad);
  const [amount, setAmount] = useState('');
  const [comment, setComment] = useState('');
  const [referralCode, setReferralCode] = useState(useListUserStore.getState().referralCode);
  const amountDebounce = useDebounce(Number(amount).toString(), 300);
  const ethBalanceFormated = useMemo(
    () => BigNumber(ethBalance?.value.toString() ?? 0).dividedBy(1e18),
    [ethBalance?.value],
  );
  const [isLoading, setIsLoading] = useState(false);
  const isApproveToken = useMemo(
    () => BigNumber(tokenAllowance?.toString() ?? 0).gt(BigNumber(amount || 0).multipliedBy(1e18)),
    [amount, tokenAllowance],
  );
  const buyToken = useBuyToken();
  const sellToken = useSellToken();

  const tokenBalanceFormated = useMemo(() => BigNumber(tokenBalance?.toString() ?? 0).dividedBy(1e18), [tokenBalance]);

  const [isBuy, setIsBuy] = useState(true);
  const { data: calcFeeBuy } = useCalculateFee(amountDebounce, true);

  const { data: amountTokenOut } = useCalculateTokenOut(
    token.mint,
    isBuy,
    isBuy ? (calcFeeBuy ? formatEther(calcFeeBuy?.[0]) : '0') : amountDebounce,
  );
  const estReceiveBuy = useMemo(() => {
    if (isNil(amountTokenOut?.[2])) return undefined;
    return amountTokenOut[2];
  }, [amountTokenOut]);
  const estReceiveSell = useMemo(() => {
    if (isNil(amountTokenOut?.[2])) return undefined;
    return amountTokenOut[2];
  }, [amountTokenOut]);

  const { data: calcFeeSell } = useCalculateFee(estReceiveSell?.toString());
  const estReceive = useMemo(() => {
    if (isBuy) return estReceiveBuy;
    return calcFeeSell?.[0];
  }, [isBuy, estReceiveBuy, calcFeeSell]);

  const estReceiveFormated = useMemo(() => {
    if (isNil(estReceive)) return undefined;
    return BigNumber(
      BigNumber(estReceive.toString() ?? '0')
        .dividedBy(1e18)
        .toFixed(isBuy ? 3 : 5),
    ).toFixed();
  }, [estReceive, isBuy]);

  const handleSwap = useCallback(async () => {
    if (!address) {
      toastError('You have not connected your wallet yet');
      return;
    }
    if (isLoading) return;
    try {
      if (!amount || !Number(amount) || isNil(estReceive)) return;
      setIsLoading(true);

      let slippageCal = parseInt(slippage.toString());
      slippageCal = slippageCal < 1 ? 1 : slippageCal > 50 ? 50 : Number.isNaN(slippageCal) ? 1 : slippageCal;
      const amountOutMin = BigInt(
        BigNumber(estReceive.toString())
          .multipliedBy(100 - slippageCal)
          .dividedBy(100)
          .toFixed(0),
      );
      if (isBuy) {
        const res = await postBuyToken({
          network,
          mint: token.mint,
          ethAmount: BigNumber(amount).multipliedBy(1e18).toFixed(0),
          description: comment,
          code: referralCode,
        });
        await buyToken({
          token: token.mint,
          nonce: res.nonce,
          price: res.price,
          signTime: res.signTime,
          signature: res.signature,
          referral: res.referral,
          amount,
          amountOutMin,
        });
        toastSuccess('Buy token success');
      } else {
        if (!isApproveToken) {
          await approveToken();
          toastSuccess('Approve token success');
        }
        const res = await postSellToken({
          network,
          mint: token.mint,
          tokenAmount: BigNumber(amount).multipliedBy(1e18).toFixed(0),
          description: comment,
          // code: referralCode,
        });
        await sellToken({
          token: token.mint,
          amount,
          amountOutMin,
          nonce: res.nonce,
          price: res.price,
          signTime: res.signTime,
          signature: res.signature,
        });
        toastSuccess('Sell token success');
      }
      setAmount('');
      setComment('');
    } catch (e) {
      console.error(e);
      toastError(`${isBuy ? 'Buy' : 'Sell'} failed`, e);
    } finally {
      setIsLoading(false);
    }
  }, [
    address,
    amount,
    approveToken,
    buyToken,
    comment,
    estReceive,
    isApproveToken,
    isBuy,
    isLoading,
    network,
    referralCode,
    sellToken,
    slippage,
    token.mint,
  ]);

  const isOutValue = useMemo(() => {
    if (isBuy && ethBalanceFormated.lt(amount || '0')) return true;
    if (!isBuy && tokenBalanceFormated.lt(amount || '0')) return true;
    return false;
  }, [amount, ethBalanceFormated, isBuy, tokenBalanceFormated]);

  const isDisableSwap = useMemo(() => {
    if (Number(amount || '0') === 0) return true;
    if (isOutValue) return true;
    return false;
  }, [amount, isOutValue]);

  const handleOnMaxAmount = () => {
    if (isBuy && ethBalance) {
      setAmount(BigNumber(ethBalance.value.toString()).dividedBy(1e18).toFixed());
    } else if (!isBuy && !isNil(tokenBalance)) {
      setAmount(BigNumber(tokenBalance.toString()).dividedBy(1e18).toFixed());
    }
  };

  return (
    <>
      <Container as={FlexCol} gap={6}>
        <FlexBetween>
          <Title>Swap</Title>
          <Button onClick={onOpenSlippage}>
            <SettingIcon />
          </Button>
        </FlexBetween>
        <FlexCol gap={3}>
          <FlexCol gap={2}>
            <FlexBetween>
              <Box fontSize={14} fontWeight={500}>
                From
              </Box>
              <Box fontSize={14} fontWeight={600}>
                Balance: <Currency value={isBuy ? ethBalance?.value : tokenBalance} isWei />
              </Box>
            </FlexBetween>
            <InputCurrency
              currency={isBuy ? 'ETH' : token.symbol}
              isInvalid={isOutValue}
              value={amount}
              min={0}
              onChange={setAmount}
              onMax={handleOnMaxAmount}
              icon={isBuy ? undefined : token.image_uri}
            />
          </FlexCol>
          <Flex alignItems="center" gap={3}>
            <Line flex={1} />
            <Button onClick={() => setIsBuy((e) => !e)}>
              <SwapIcon />
            </Button>
            <Line flex={1} />
          </Flex>
          <FlexCol gap={2}>
            <FlexBetween>
              <Box fontSize={14} fontWeight={500}>
                To
              </Box>
              <Box fontSize={14} fontWeight={600}>
                Balance: <Currency value={isBuy ? tokenBalance : ethBalance?.value} isWei isKmb />
              </Box>
            </FlexBetween>
            <InputCurrency
              currency={isBuy ? token.symbol : 'ETH'}
              value={estReceiveFormated}
              isDisabled
              icon={isBuy ? token.image_uri : undefined}
            />
          </FlexCol>
        </FlexCol>
        <FlexBetween>
          <Box fontSize={14} fontWeight={500}>
            Slippage Tolerance
          </Box>
          <Flex alignItems="center" gap={1}>
            <Box fontSize={14} fontWeight={500}>
              {slippage}%
            </Box>
            {/* <Button onClick={onOpenSlippage}>
              <EditIcon />
            </Button> */}
          </Flex>
        </FlexBetween>
        {!address ? (
          <ConnectWalletButton />
        ) : (
          <ButtonChakra
            rounded={8}
            onClick={() => {
              if (!isBuy && token.anti_rug_pool) {
                onOpenAlert();
              } else {
                onOpen();
              }
            }}
            isDisabled={isDisableSwap}
            isLoading={isLoading}
          >
            SWAP
          </ButtonChakra>
        )}
      </Container>
      <ModalBase isOpen={isOpen} onClose={onClose} isCentered>
        <FlexCol gap={2.5}>
          <FormControl>
            <FormLabel fontSize={14}>Add a comment</FormLabel>
            <TextareaForm
              borderColor="dark.600"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Optional"
            />
          </FormControl>
          {isBuy && (
            <FormControl>
              <FormLabel fontSize={14}>Referral Code</FormLabel>
              <InputForm
                borderColor="dark.600"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                placeholder="Optional"
              />
            </FormControl>
          )}
          <ButtonChakra
            isDisabled={isDisableSwap || isLoading}
            onClick={() => {
              onClose();
              handleSwap();
            }}
          >
            SWAP
          </ButtonChakra>
        </FlexCol>
      </ModalBase>

      <ModalBase
        isOpen={isOpenSlippage}
        onClose={onCloseSlippage}
        isCentered
        closeOnOverlayClick={false}
        minW={{ base: 'unset', md: 520 }}
      >
        <FlexCol gap={2.5}>
          <FlexCol w="full" gap={3} p={4} rounded={16} border="1px solid" borderColor="dark.800" pb={9}>
            <Box fontSize={14} fontWeight={500}>
              Set Slippage
            </Box>

            <Slider min={1} max={50} defaultValue={slippage} onChange={setSlippage}>
              <SliderMark value={1} top={5} left={0} fontSize={12} fontWeight={600} color="dark.500">
                1%
              </SliderMark>
              <SliderMark
                value={50}
                top={5}
                right={0}
                left="unset !important"
                fontSize={12}
                fontWeight={600}
                color="dark.500"
              >
                50%
              </SliderMark>

              <SliderMark
                value={slippage}
                textAlign="center"
                bg="primary.100"
                color="white"
                mt="-10"
                ml="-13px"
                bottom={'-20px'}
                w="fit-content"
                px={1}
                py={0.5}
                rounded={4}
                fontWeight={500}
                fontSize={10}
              >
                {slippage}%
              </SliderMark>
              <SliderTrack bg="dark.700" h={1.5} rounded="full">
                <SliderFilledTrack bg="primary.100" />
              </SliderTrack>
              <SliderThumb boxSize={5} bg="primary.100" border="1px solid white" />
            </Slider>
          </FlexCol>
          <ButtonChakra onClick={onCloseSlippage}>OK</ButtonChakra>
        </FlexCol>
      </ModalBase>

      <ModalBase isOpen={isOpenAlert} onClose={onCloseAlert} isCentered minW={{ base: 'unset', md: 520 }}>
        <FlexCol gap={2.5}>
          <Box w="full" py={10} textAlign="center">
            This project is protected by S.meme . You can only sell the token once it has been listed on MVX.Exchange.
          </Box>
          <ButtonChakra onClick={onCloseAlert}>OK</ButtonChakra>
        </FlexCol>
      </ModalBase>
    </>
  );
};
