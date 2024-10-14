import { useMemo } from 'react';

import useUserStore from '@/store/useUserStore';

import useWalletAddress from './useWalletAddress';

export default function useWalletActive() {
  const { address, network } = useWalletAddress();
  const user = useUserStore((state) => state.user);
  return useMemo(
    () => ({
      address: user ? address : undefined,
      network: user ? network : undefined,
    }),
    [address, network, user]
  );
}
