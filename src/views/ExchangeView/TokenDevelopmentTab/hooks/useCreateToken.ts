import { useCallback } from 'react';

export const useCreateToken = () => {
  return useCallback(
    async (params: {
      symbol: string;
      name: string;
      fundingGoal: bigint;
      maxHolding?: bigint;
      nonce: string;
      price: bigint;
      isAntiRugPool: boolean;
      signTime: bigint;
      signature: string;
      ethAmount: bigint;
    }) => {},
    [],
  );
};
