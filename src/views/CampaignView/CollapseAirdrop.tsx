import { Currency } from '@/components';
import { IAirdrop } from '@/services/campaign';
import { Flex } from '@chakra-ui/react';

export const CollapseAirdrop = ({ item }: { item: IAirdrop }) => {
  return (
    <>
      <Flex gap={1}>
        Airdropped <Currency value={item.detail.amount} decimalNumber={item.detail.decimal} />{' '}
        {item.detail.symbol?.replace('$MOON', '$🌕').replace('$SUN', '$☀️')}
      </Flex>
    </>
  );
};
