import BigNumber from 'bignumber.js';
import { isNil } from 'lodash';
import { useCallback, useMemo, useState } from 'react';

import {
  Button,
  Currency,
  FlexBetween,
  FlexCol,
  ImageRatio,
  InputCurrency,
  Line,
  ModalBase,
  TextareaForm,
} from '@/components';
import { SwapIcon } from '@/components/Icons';
import { useSolanaBalance, useSolanaBalanceToken } from '@/hooks/solana';
import { useDebounce } from '@/hooks/useDebounce';
import useWalletActive from '@/hooks/useWalletActive';
import { postBuyToken } from '@/services/token';
import useListUserStore from '@/store/useListUserStore';
import { useUser } from '@/store/useUserStore';
import { ITokenInfo } from '@/types/token.type';
import { toastError, toastSuccess } from '@/utils/toast';
import {
  Box,
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
import { useSellToken } from './hooks/useSellToken';

export const SwapTokenView = ({ token }: { token: ITokenInfo }) => {
  const { address, network } = useWalletActive();
  const user = useUser();
  const slippage = useListUserStore((s) => s.slippage);
  const setSlippage = useListUserStore((s) => s.setSlippage);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenSlippage, onOpen: onOpenSlippage, onClose: onCloseSlippage } = useDisclosure();

  const { balance: solBalance } = useSolanaBalance();
  const { balance: tokenBalance } = useSolanaBalanceToken(token.mint);
  const [isBuy, setIsBuy] = useState(true);
  // const [amount, setAmount] = useState<string>();
  const amount = useMemo(() => {
    if (isBuy) return BigNumber(token.max_buy_per_address).multipliedBy(token.price_sol_per_token).toFixed();
    return BigNumber(tokenBalance?.amount ?? 0)
      .dividedBy(1 ** (tokenBalance?.decimals ?? 1))
      .toFixed();
  }, [isBuy, token.max_buy_per_address, token.price_sol_per_token, tokenBalance?.amount, tokenBalance?.decimals]);

  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // const amountDebounce = useDebounce(Number(amount || 0).toString(), 300);
  const amountDebounce = useMemo(() => BigNumber(amount || 0).toFixed(), [amount]);

  const ethBalanceFormated = useMemo(() => BigNumber(solBalance ?? 0).dividedBy(1e9), [solBalance]);
  const tokenBalanceFormated = useMemo(() => BigNumber(tokenBalance?.toString() ?? 0).dividedBy(1e6), [tokenBalance]);

  const buyToken = useBuyToken();
  const sellToken = useSellToken();

  const estReceive = useMemo(() => {
    if (isBuy)
      return BigNumber(amountDebounce || 0)
        .dividedBy(token.price_sol_per_token)
        .toFixed();
    return BigNumber(amountDebounce || 0)
      .multipliedBy(token.price_sol_per_token)
      .toFixed();
  }, [amountDebounce, isBuy, token.price_sol_per_token]);
  const handleSwap = useCallback(async () => {
    if (!address || !network) {
      toastError('You have not connected your wallet yet');
      return;
    }
    if (isLoading) return;
    try {
      if (!amount || !Number(amount) || isNil(estReceive)) return;
      setIsLoading(true);

      if (isBuy) {
        const signature = await postBuyToken({
          network,
          mint: token.mint,
          solAmount: BigNumber(amount).multipliedBy(1e9).toFixed(0),
        });
        await buyToken(signature);
        toastSuccess('Buy token success');
      } else {
        await sellToken({
          mint: token.mint,
          amountToken: BigNumber(amount).multipliedBy(1e6).toFixed(0),
        });
        toastSuccess('Sell token success');
      }
      // setAmount('');
      setComment('');
    } catch (e) {
      console.error(e);
      toastError(`${isBuy ? 'Buy' : 'Sell'} failed`, e);
    } finally {
      setIsLoading(false);
    }
  }, [address, amount, buyToken, estReceive, isBuy, isLoading, network, sellToken, token.mint]);

  const isOutValue = useMemo(() => {
    if (isBuy && ethBalanceFormated.lt(amount || '0')) return true;
    if (!isBuy && tokenBalanceFormated.lt(amount || '0')) return true;
    return false;
  }, [amount, ethBalanceFormated, isBuy, tokenBalanceFormated]);

  // const handleOnMaxAmount = () => {
  //   if (isBuy && solBalance) {
  //     setAmount(BigNumber(solBalance.toString()).dividedBy(1e9).toFixed());
  //   } else if (!isBuy && !isNil(tokenBalance)) {
  //     setAmount(BigNumber(tokenBalance.toString()).dividedBy(1e6).toFixed());
  //   }
  // };

  const messageError = useMemo(() => {
    const userScore = user?.score ?? 0;
    if (isBuy && Number(estReceive) > token.max_buy_per_address) return 'Exceeded maximum number of tokens purchased';
    if (userScore < token.min_target_score) return `You don't have enough score to swap token`;
    if (userScore > token.max_target_score) return `You exceed score to swap token`;
    if (isOutValue) return 'Insufficient balance';
    return '';
  }, [
    user?.score,
    isBuy,
    estReceive,
    token.max_buy_per_address,
    token.min_target_score,
    token.max_target_score,
    isOutValue,
  ]);

  const isDisableSwap = useMemo(() => {
    if (Number(amount || '0') === 0) return true;
    if (isOutValue || messageError) return true;
    return false;
  }, [amount, isOutValue, messageError]);

  return (
    <>
      <Box as={FlexCol} gap={6} bg="rgba(249, 252, 255, 1)" rounded={16} p={5}>
        <FlexBetween>
          <Box fontSize={20} fontWeight={600}>
            Swap
          </Box>
          {/* <Button onClick={onOpenSlippage}>
            <SettingIcon />
          </Button> */}
        </FlexBetween>
        <FlexCol gap={3}>
          <FlexCol gap={2}>
            <FlexBetween>
              <Box fontSize={14} fontWeight={500}>
                From
              </Box>
              <Box fontSize={12} fontWeight={600} color="rgba(131, 131, 131, 1)">
                Balance:{' '}
                <Currency
                  value={isBuy ? solBalance : tokenBalance?.amount}
                  decimalNumber={isBuy ? 9 : tokenBalance?.decimals}
                />
              </Box>
            </FlexBetween>
            <Box pos="relative">
              <InputCurrency
                style={{
                  height: '44px',
                  paddingRight: '55px',
                  // paddingRight: '126px'
                }}
                disabled
                value={amount}
                min={0}
                // onValueChange={setAmount}
              />

              <Flex gap={2} alignItems="center" pos="absolute" right={3} top={0} h="full">
                {/* <Button color="purple" onClick={handleOnMaxAmount}>
                  MAX
                </Button>
                <Box h={5} w="1px" bg="rgba(40, 40, 45, 1)" /> */}
                <Flex alignItems="center" gap={1}>
                  <ImageRatio
                    src={isBuy ? '/icons/solana.png' : token.image_uri}
                    ratio={1}
                    w={5}
                    h={5}
                    rounded={999}
                    overflow="hidden"
                  />
                  <Box
                    as="span"
                    maxW={45}
                    justifyContent="end"
                    alignItems="center"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    fontSize={14}
                    color="dark.500"
                  >
                    {isBuy ? 'SOL' : token.symbol}
                  </Box>
                </Flex>
              </Flex>
            </Box>
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
              <Box fontSize={12} fontWeight={600} color="rgba(131, 131, 131, 1)">
                Balance:{' '}
                <Currency
                  value={!isBuy ? solBalance : tokenBalance?.amount}
                  decimalNumber={!isBuy ? 9 : tokenBalance?.decimals}
                />
              </Box>
            </FlexBetween>

            <Box pos="relative">
              <InputCurrency style={{ height: '44px', paddingRight: '55px' }} disabled value={estReceive} />

              <Flex gap={1} alignItems="center" pos="absolute" right={3} top={0} h="full">
                <ImageRatio
                  src={!isBuy ? '/icons/solana.png' : token.image_uri}
                  ratio={1}
                  w={5}
                  h={5}
                  rounded={999}
                  overflow="hidden"
                />
                <Box
                  as="span"
                  maxW={45}
                  justifyContent="end"
                  alignItems="center"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  fontSize={14}
                  color="dark.500"
                >
                  {!isBuy ? 'SOL' : token.symbol}
                </Box>
              </Flex>
            </Box>
          </FlexCol>
        </FlexCol>
        {/* <FlexBetween>
          <Box fontSize={14} fontWeight={500}>
            Slippage Tolerance
          </Box>
          <Flex alignItems="center" gap={1}>
            <Box fontSize={14} fontWeight={500} color="rgba(131, 131, 131, 1)">
              {slippage}%
            </Box>
        
          </Flex>
        </FlexBetween> */}
        {!!messageError && <Box color="red">{messageError}</Box>}
        <Button
          rounded={8}
          onClick={handleSwap}
          isLoading={isLoading}
          bg="makeColor"
          h={10}
          color="white"
          fontFamily="titanOne"
          fontWeight={400}
          fontSize={20}
          _disabled={{
            bg: 'rgba(131, 131, 131, 1)',
            cursor: 'not-allowed',
          }}
          disabled={isDisableSwap || token.trade_completed}
        >
          SWAP
        </Button>
      </Box>
      <ModalBase isOpen={isOpen} onClose={onClose} isCentered>
        <FlexCol gap={2.5}>
          <FormControl>
            <FormLabel fontSize={14} fontFamily="sfPro" fontWeight={700}>
              Add a comment
            </FormLabel>
            <TextareaForm
              fontFamily="sfPro"
              fontWeight={700}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Optional"
            />
          </FormControl>

          <Button
            fontFamily="titanOne"
            fontWeight={400}
            bg="makeColor"
            h={10}
            color="white"
            isLoading={isLoading}
            rounded={8}
            onClick={() => {
              onClose();
              // handleSwap();
            }}
          >
            SWAP
          </Button>
        </FlexCol>
      </ModalBase>

      <ModalBase
        isOpen={isOpenSlippage}
        onClose={onCloseSlippage}
        isCentered
        closeOnOverlayClick={false}
        minW={{ base: 'unset', md: 520 }}
      >
        <FlexCol gap={2.5} pt={5}>
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
                bg="rgba(243, 235, 255, 1)"
                color="purple"
                ml="-3px"
                bottom={'-25px'}
                w="fit-content"
                px={1}
                py={0.5}
                rounded={4}
                fontWeight={500}
                fontSize={10}
              >
                {slippage}%
              </SliderMark>
              <SliderTrack bg="rgba(243, 235, 255, 1)" h={1.5} rounded="full">
                <SliderFilledTrack bg="purple" />
              </SliderTrack>
              <SliderThumb boxSize={5} bg="purple" border="1px solid white" />
            </Slider>
          </FlexCol>
          <Button onClick={onCloseSlippage} h={10} bg="makeColor" rounded={8} color="white">
            OK
          </Button>
        </FlexCol>
      </ModalBase>
    </>
  );
};
