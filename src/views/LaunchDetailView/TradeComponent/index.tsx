import { Currency, FlexCol, ImageRatio } from '@/components';
import { ITokenInfo } from '@/types/token.type';
import dayjs from '@/utils/dayjs';
import { Box, Flex } from '@chakra-ui/react';

import { useQueryTrades } from './hooks/useQueryTrades';

export const TradeComponent = ({ token }: { token: ITokenInfo }) => {
  const { data } = useQueryTrades(token.mint);
  console.log('data', data);
  return (
    <FlexCol w="full" bg="rgba(249, 252, 255, 1)" rounded={16} p={5} gap={4}>
      <Box fontSize={16} fontWeight={600} pb={2}>
        Trades
      </Box>
      {data?.docs.map((item, index) => (
        <Flex
          justify="space-between"
          alignItems="center"
          key={index}
          w="full"
          bg="rgba(237, 247, 255, 1)"
          rounded={16}
          px={5}
          py={3}
          gap={2}
        >
          <FlexCol gap={2}>
            <Flex alignItems="center" gap={1.5}>
              <ImageRatio
                originalImage
                src={item.avatar ?? 'https://placehold.co/100x100/png'}
                ratio={1}
                w={4}
                rounded="full"
                overflow="hidden"
                alt=""
              />
              <Box fontSize={14} fontWeight={500} color="purple">
                {item.username}
              </Box>
            </Flex>
            <Box py={2} px={3} fontWeight={500} bg="white" roundedEnd={16} roundedBottomStart={16} minW={100}>
              {item.is_buy ? `Bought ` : `Sold `}
              <Currency value={item.is_buy ? item.sol_amount : item.token_amount} decimalNumber={item.is_buy ? 9 : 6} />
              {item.is_buy ? ` SOL` : ` ${item.token_symbol}`}
            </Box>
          </FlexCol>
          <Box fontSize={12} color="light.400" fontWeight={600}>
            {dayjs(new Date()).fromNow()}
          </Box>
        </Flex>
      ))}
    </FlexCol>
  );
};
