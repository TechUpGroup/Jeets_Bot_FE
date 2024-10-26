import BigNumber from 'bignumber.js';
import { useCallback } from 'react';
import { Address } from 'viem';

import moonadABI from '@/config/ABI/moonadABI';
import useActiveWeb3React from '@/hooks/useActiveWeb3React';
import { useAddress } from '@/hooks/useAddress';
import { useCallWithGasPrice } from '@/hooks/wagmi/useCallWithGasPrice';
import { getReceiptTxs } from '@/utils/helpers';

export const useSellToken = () => {
  const { provider } = useActiveWeb3React();
  const { callWithGasPrice } = useCallWithGasPrice();
  const { moonad } = useAddress();
  return useCallback(
    async (params: {
      token: Address;
      amount: string;
      nonce: Address;
      price: string;
      signTime: number;
      signature: Address;
      amountOutMin: bigint;
    }) => {
      if (!provider) return;
      const { token, amount, amountOutMin, nonce, price, signTime, signature } = params;

      await getReceiptTxs(
        callWithGasPrice(
          {
            abi: moonadABI,
            address: moonad,
          },
          'sell',
          [
            token,
            BigInt(BigNumber(amount).multipliedBy(1e18).toFixed(0)),
            amountOutMin,
            nonce,
            BigInt(price),
            BigInt(signTime),
            signature,
          ],
        ),
        provider,
      );
    },
    [moonad, provider, callWithGasPrice],
  );
};
