'use client';

import bs58 from 'bs58';
import { useEffect, useRef } from 'react';

import useAuth from '@/hooks/useAuth';
import useWalletAddress from '@/hooks/useWalletAddress';
import { getNonce, postLogin } from '@/services/api';
import useUserStore, { useUserShallow } from '@/store/useUserStore';
import { useWallet } from '@solana/wallet-adapter-react';

export function useAuthSignMessage() {
  const loading = useRef<boolean>(false);

  const { address, network } = useWalletAddress();
  const { signMessage } = useWallet();

  const { logout } = useAuth();

  const { setUser } = useUserShallow((state) => ({
    setUser: state.setUser,
  }));

  const { user } = useUserStore((state) => ({
    user: state.user,
  }));

  useEffect(() => {
    const updateAuth = async () => {
      if (loading.current || !address || !network) return;
      try {
        loading.current = true;
        const listAddress = user
          ? [{ address: user.user.address, network: user.user.network }, ...user.user.address_secondaries]
          : [];
        if (listAddress.find((e) => e.address === address && e.network === network)) return;

        try {
          setUser(null);
          const preMessage = 'Nonce: ';
          const nonce = await getNonce(address);
          const message = preMessage + nonce.nonce;
          let signature: string = '';

          if (signMessage) {
            const signatureBuffer = await signMessage?.(new TextEncoder().encode(message));
            signature = bs58.encode(signatureBuffer);
          }
          const login = await postLogin(network, address, signature ?? '', preMessage);
          setUser(login);
        } catch (e) {
          console.error(e);
          logout();
        }
      } finally {
        loading.current = false;
      }
    };
    updateAuth();
  }, [address, network, logout, setUser, signMessage, user]);

  return null;
}
