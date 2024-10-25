import { useMemo } from 'react';

import { getAssociatedTokenAddressSync, TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { useQuery } from '@tanstack/react-query';

export const useSolanaBalance = () => {
  const { publicKey } = useWallet();
  const { connection } = useConnection();

  const { data: balance, isLoading: loading } = useQuery({
    queryKey: ['solana-balance', publicKey],
    queryFn: async () => {
      if (publicKey) {
        try {
          const balance = await connection.getBalance(publicKey);
          return balance;
        } catch {
          return null;
        }
      } else {
        return null;
      }
    },
    refetchInterval: 5000,
  });

  return { balance, loading };
};

export const useSolanaBalanceToken = (tokenAddress: PublicKey | string, isToken2002?: boolean) => {
  const { publicKey } = useWallet();
  const { connection } = useConnection();

  const tokenUserATA = useMemo(
    () =>
      publicKey
        ? getAssociatedTokenAddressSync(
            typeof tokenAddress === 'string' ? new PublicKey(tokenAddress) : tokenAddress,
            publicKey,
            undefined,
            isToken2002 ? TOKEN_2022_PROGRAM_ID : TOKEN_PROGRAM_ID,
          )
        : undefined,
    [publicKey, tokenAddress, isToken2002],
  );

  const { data: balance, isLoading: loading } = useQuery({
    queryKey: ['solana-balance-token', tokenUserATA],
    queryFn: async () => {
      if (tokenUserATA) {
        try {
          const balance = await connection.getTokenAccountBalance(tokenUserATA);
          return balance.value;
        } catch {
          return null;
        }
      } else {
        return null;
      }
    },
    refetchInterval: 5000,
  });

  return { balance, loading };
};
