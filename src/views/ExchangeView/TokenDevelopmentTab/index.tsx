'use client';

import BigNumber from 'bignumber.js';
import { isNil } from 'lodash';
import { useRouter } from 'next/navigation';
import { useMemo, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import {
  Button,
  Currency,
  FlexCol,
  FlexContent,
  ImageRatio,
  InputCurrency,
  InputForm,
  ModalBase,
  TextareaForm,
  Title2,
} from '@/components';
import { TelegramIcon, TwitterIcon, WebsiteIcon } from '@/components/Icons';
import { useSolanaBalance } from '@/hooks/solana';
import useWalletActive from '@/hooks/useWalletActive';
import { postCreateMintToken } from '@/services/token';
import { sleep } from '@/utils';
import { toastError } from '@/utils/toast';
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { Keypair } from '@solana/web3.js';

import { useCreateToken } from './hooks/useCreateToken';

const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

type ITokenDeployer = {
  network: string;
  name: string;
  symbol: string;
  image: FileList;
  description: string;
  telegramLink: string;
  twitterLink: string;
  websiteLink: string;
};

export default function TokenDevelopmentTab() {
  const { push } = useRouter();
  const ethPrice = 200;
  const { address, network } = useWalletActive();
  const [amount, setAmount] = useState<string>();
  const [priceToken, setPriceToken] = useState<string>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const imageRef = useRef<any>(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ITokenDeployer>({
    defaultValues: {
      network: 'solana',
    },
  });

  const [maxScore, setMaxScore] = useState(0);
  const [maxHolding, setMaxHolding] = useState(0);
  const balanceSolana = useSolanaBalance();
  const [showTooltip, setShowTooltip] = useState(false);
  const [showTooltipModal, setShowTooltipModal] = useState(false);

  const [maxBuyPerAddress, setMaxBuyPerAddress] = useState(0.1);
  const [totalSol, setTotalSol] = useState(1);

  const watchImage = watch('image');
  const watchSymbol = watch('symbol');
  const { ref, ...registerImage } = register('image', {
    required: true,
    validate: (image) => {
      const file = image?.[0];
      if (!file || !validImageTypes.includes(file.type)) {
        return 'Only image are valid.';
      }
      return true;
    },
  });

  const createToken = useCreateToken();

  const estimatedReceive = useMemo(() => {
    return BigNumber(amount ?? 0)
      .dividedBy(100)
      .multipliedBy(1e9)
      .toFixed();
  }, [amount]);

  const onSubmit: SubmitHandler<ITokenDeployer> = async (values) => {
    try {
      if (!address || !network || !values.image[0]) return;
      const mint = Keypair.generate(); // tạo địa chỉ token
      const res = await postCreateMintToken(
        {
          network,
          mint: mint.publicKey.toBase58(),
          name: values.name,
          symbol: values.symbol,
          description: values.description,

          target_score: maxScore,
          max_buy_per_address: maxBuyPerAddress,
          total_sol_receive: BigNumber(totalSol).multipliedBy(1e9).toNumber(),
          price_sol_per_token: BigNumber(priceToken ?? 0).toNumber(),

          twitter: values.twitterLink,
          telegram: values.telegramLink,
          website: values.websiteLink,
        },
        values.image[0],
      );
      await createToken({
        mint,
        symbol: res.symbol,
        name: res.name,
        targetScore: res.target_score,
        priceSolPerToken: BigNumber(res.price_sol_per_token).multipliedBy(1e9).toFixed(0),
        totalSolReceive: res.total_sol_receive,
        maxTokenCanBuy: BigNumber(maxBuyPerAddress).dividedBy(100).multipliedBy(1e6).multipliedBy(1e9).toFixed(0),
      });
      onClose();
      await sleep(5_000);
      push(`/exchange/${res.mint}`);
    } catch (e) {
      toastError('create token failed', e);
      console.error(e);
    }
  };

  const imagePreview = useMemo(() => {
    const file = watchImage?.[0];
    if (!file || !validImageTypes.includes(file.type)) return;
    return URL.createObjectURL(file);
  }, [watchImage]);

  return (
    <FlexContent w="full" fontFamily="sfPro" lineHeight={1.4} fontWeight={500}>
      <Title2 fontFamily="titanOne" fontWeight={400}>
        Token Development
      </Title2>
      <Box bg="rgba(243, 235, 255, 1)" rounded={12} p={2} w="full">
        <Flex
          bg="rgba(219, 194, 255, 1)"
          border="1px solid"
          borderColor="rgba(143, 81, 236, 1)"
          rounded={8}
          p={2.5}
          justifyContent="center"
          alignItems="center"
          gap={2}
        >
          <ImageRatio src="/icons/solana.png" ratio={1} w={6} rounded={999} overflow="hidden" />
          <Box fontSize={14}>Solana</Box>
        </Flex>
      </Box>
      <FlexCol gap={5} w="full">
        <FormControl isInvalid={!!errors.name}>
          <FormLabel fontSize={16} fontWeight={800}>
            Name{' '}
            <Box as="span" color="red">
              *
            </Box>
          </FormLabel>
          <InputForm
            placeholder="Enter name (example: MemeCoin)"
            {...register('name', {
              required: true,
              minLength: 1,
            })}
          />
        </FormControl>

        <FormControl isInvalid={!!errors.name}>
          <FormLabel fontSize={16} fontWeight={800}>
            Symbol{' '}
            <Box as="span" color="red">
              *
            </Box>
          </FormLabel>
          <InputForm
            placeholder="Enter Symbol (example: MC)"
            {...register('symbol', {
              required: true,
              minLength: 1,
            })}
          />
        </FormControl>

        <FormControl isInvalid={!!errors.image}>
          <FormLabel fontWeight={800} textColor={!!errors.image ? 'error' : 'colorMain'}>
            Image{' '}
            <Box as="span" color="red">
              *
            </Box>
          </FormLabel>
          {!!imagePreview && <ImageRatio mb={2} src={imagePreview} alt="image-preview" ratio={1} w={20} />}

          <Button
            onClick={() => imageRef.current?.click()}
            w="fit-content"
            color="purple"
            border="1px solid"
            borderColor="purple"
            bg="rgba(255, 248, 243, 1)"
            py={2}
            px={4}
            rounded={8}
            fontSize={14}
          >
            {watchImage?.length ? 'change image' : 'Select image'}
          </Button>

          <Input
            type="file"
            isDisabled={isSubmitting}
            id="image"
            display="none"
            accept={validImageTypes.join(', ')}
            ref={(e) => {
              ref(e);
              imageRef.current = e;
            }}
            {...registerImage}
          />
        </FormControl>

        <FormControl isInvalid={!!errors.description}>
          <FormLabel fontSize={16} fontWeight={800}>
            Description
          </FormLabel>
          <TextareaForm
            placeholder="Enter your description (should be not less than xx symbols and max. Xxx symbols)"
            {...register('description')}
          />
        </FormControl>
        <FormControl isInvalid={!!errors.telegramLink}>
          <FormLabel fontSize={16} fontWeight={800}>
            Telegram Link
          </FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <TelegramIcon fill="dark.700" />
            </InputLeftElement>
            <InputForm
              placeholder="Enter Telegram Link (example: https://t.me/memecoin)"
              pl={10}
              {...register('telegramLink')}
            />
          </InputGroup>
        </FormControl>
        <FormControl isInvalid={!!errors.twitterLink}>
          <FormLabel fontSize={16} fontWeight={800}>
            X Link
          </FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <TwitterIcon fill="dark.700" />
            </InputLeftElement>
            <InputForm
              pl={10}
              placeholder="Enter X Link (example: https://x.com/MemeCoinCTO)"
              {...register('twitterLink')}
            />
          </InputGroup>
        </FormControl>
        <FormControl isInvalid={!!errors.websiteLink}>
          <FormLabel fontSize={16} fontWeight={800}>
            Website
          </FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <WebsiteIcon fill="dark.700" />
            </InputLeftElement>
            <InputForm
              placeholder="Enter Website Link (example: https://example.com)"
              pl={10}
              {...register('websiteLink')}
            />
          </InputGroup>
        </FormControl>

        <FlexCol w="full" gap={3} p={4} rounded={16} border="1px solid" borderColor="rgba(192, 192, 192, 1)" pb={9}>
          <Box fontSize={14}>Target Jeets Score</Box>
          <Slider
            min={0}
            max={500}
            defaultValue={maxScore}
            onChange={setMaxScore}
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
                  placement="bottom"
                  isOpen={showTooltip}
                  px={1}
                  rounded={4}
                  bg="purple"
                  label={
                    <Box color="white" fontWeight={600} fontSize={10} fontFamily="sfPro">
                      {`${maxScore} Jeets`}
                    </Box>
                  }
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
                  color="rgba(142, 142, 147, 1)"
                  top="calc(100% + 14px)"
                  fontWeight={600}
                  fontSize={12}
                  transform="translateX(-12px)"
                >
                  0 Jeets
                </SliderMark>
                <SliderMark
                  style={{ textWrap: 'nowrap' }}
                  value={500}
                  textAlign="center"
                  color="rgba(142, 142, 147, 1)"
                  top="calc(100% + 14px)"
                  fontWeight={600}
                  fontSize={12}
                  transform="translateX(calc(-100% + 12px))"
                >
                  500 Jeets
                </SliderMark>
              </Box>
            </Box>
          </Slider>
        </FlexCol>

        {/* <FlexCol gap={2.5} w="full">
          <Title fontSize={16} fontWeight={800}>
            Target Jeets Holder
          </Title>
          <SelectForm
            placeholder="Select"
            options={[
              { value: 'chocolate', label: 'Chocolate' },
              { value: 'strawberry', label: 'Strawberry' },
              { value: 'vanilla', label: 'Vanilla' },
            ]}
          />
        </FlexCol> */}
      </FlexCol>
      <Button
        w="full"
        rounded={8}
        fontFamily="titanOne"
        fontWeight={400}
        h={10}
        fontSize={20}
        disabled={!!Object.keys(errors).length}
        bg="makeColor"
        color="white"
        onClick={() => {
          if (!address) {
            toastError('You have not connected your wallet yet');
            return;
          }
          handleSubmit(onOpen)();
        }}
        isLoading={isSubmitting}
      >
        Deploy
      </Button>

      <ModalBase
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        hideClose={isSubmitting}
        minW={{ base: 'unset', md: 530 }}
      >
        <FlexCol gap={5} w="full">
          <Box fontSize={{ base: 16, md: 18 }} fontWeight={600} textAlign="center">
            Deploy your token
          </Box>
          <FlexCol w="full" gap={2.5}>
            <Box>Amount</Box>
            <Box position="relative" w="full">
              <InputCurrency
                style={{ paddingRight: '40px' }}
                value={amount}
                onValueChange={(val) => {
                  if (Number(val) > 100) {
                    setAmount('100');
                  } else if (Number(val) < 0) {
                    setAmount('0');
                  } else {
                    setAmount(val);
                  }
                }}
                min={0}
                max={100}
              />
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
              <Currency value={estimatedReceive} /> {watchSymbol}
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
              min={0.1}
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
              <InputCurrency style={{ paddingRight: '52px' }} value={priceToken} onValueChange={setPriceToken} />
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
              onMouseEnter={() => setShowTooltipModal(true)}
              onMouseLeave={() => setShowTooltipModal(false)}
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
                    isOpen={showTooltipModal}
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
                    value={1}
                    textAlign="center"
                    color="rgba(174, 174, 178, 1)"
                    top="calc(100% + 19px)"
                    fontWeight={400}
                    fontSize={14}
                    transform="translateX(-12px)"
                  >
                    (1SOL)
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
            disabled={!!Object.keys(errors).length}
            onClick={handleSubmit(onSubmit)}
            isLoading={isSubmitting}
          >
            DEPLOY
          </Button>
        </FlexCol>
      </ModalBase>
    </FlexContent>
  );
}
