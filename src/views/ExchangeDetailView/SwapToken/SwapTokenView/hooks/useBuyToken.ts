import BigNumber from 'bignumber.js';
import { useCallback } from 'react';
import { Address, zeroAddress } from 'viem';

import moonadABI from '@/config/ABI/moonadABI';
import useActiveWeb3React from '@/hooks/useActiveWeb3React';
import { useAddress } from '@/hooks/useAddress';
import { useCallWithGasPrice } from '@/hooks/wagmi/useCallWithGasPrice';
import { getReceiptTxs } from '@/utils/helpers';

export const useBuyToken = () => {
  const { provider } = useActiveWeb3React();
  const { callWithGasPrice } = useCallWithGasPrice();
  const { moonad } = useAddress();
  return useCallback(
    async (params: {
      token: Address;
      referral?: string;
      nonce: Address;
      price: string;
      signTime: number;
      signature: Address;
      amount: string;
      amountOutMin: bigint;
    }) => {
      if (!provider) return;
      const { token, referral, nonce, price, signTime, signature, amount, amountOutMin } = params;
      await getReceiptTxs(
        callWithGasPrice(
          { abi: moonadABI, address: moonad },
          'buy',
          [
            token,
            (referral ?? zeroAddress) as Address,
            amountOutMin,
            nonce,
            BigInt(price),
            BigInt(signTime),
            signature,
          ],
          { value: BigInt(BigNumber(amount).multipliedBy(1e18).toFixed(0)) },
        ),
        provider,
      );
    },
    [moonad, provider, callWithGasPrice],
  );
};
