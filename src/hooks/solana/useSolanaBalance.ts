import { useEffect, useMemo, useState } from 'react';

import { getAssociatedTokenAddressSync, TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, TokenAmount } from '@solana/web3.js';

export const useSolanaBalance = () => {
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const { connection } = useConnection();

  useEffect(() => {
    const getBalance = () => {
      if (publicKey) {
        connection
          .getBalance(publicKey)
          .then((balance) => {
            setBalance(balance);
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
          });
      } else {
        setBalance(null);
      }
    };

    getBalance();
    const interval = setInterval(getBalance, 5000);
    return () => clearInterval(interval);
  }, [publicKey, connection]);

  return { balance, loading };
};

export const useSolanaBalanceToken = (tokenAddress: PublicKey | string, isToken2002?: boolean) => {
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<TokenAmount | null>(null);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const getBalance = () => {
      if (tokenUserATA) {
        connection
          .getTokenAccountBalance(tokenUserATA)
          .then((res) => {
            setBalance(res.value);
            setLoading(false);
          })
          .catch((error) => {
            console.log('🚀 ~ getBalance ~ error:', error);
            setLoading(false);
          });
      } else {
        setBalance(null);
      }
    };

    getBalance();
    const interval = setInterval(getBalance, 5000);
    return () => clearInterval(interval);
  }, [tokenUserATA, connection]);

  return { balance, loading };
};
