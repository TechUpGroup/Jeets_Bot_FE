'use client';

import bs58 from 'bs58';
import { useEffect, useRef } from 'react';

import useAuth from '@/hooks/useAuth';
import useWalletAddress from '@/hooks/useWalletAddress';
import { getNonce, postLogin } from '@/services/api';
import useListUserStore, { useListUserShallow } from '@/store/useListUserStore';
import useUserStore, { useUserShallow } from '@/store/useUserStore';
import { useWallet } from '@solana/wallet-adapter-react';

export function useAuthSignMessage() {
  const loading = useRef<boolean>(false);

  const { address } = useWalletAddress();
  const { signMessage } = useWallet();

  const { logout } = useAuth();

  const setUser = useUserShallow((s) => s.setUser);
  const addUserToList = useListUserShallow((s) => s.addUserToList);
  const listUser = useListUserStore((s) => s.listUser);

  const user = useUserStore((s) => s.user);

  useEffect(() => {
    const updateAuth = async () => {
      if (loading.current || !address) return;
      try {
        loading.current = true;
        const findUser = listUser.find((e) => e.user.address.toLowerCase() === address.toLowerCase());
        if (findUser) {
          setUser(findUser);
          return;
        }

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
          const login = await postLogin(address, signature ?? '', preMessage);
          setUser(login);
          addUserToList(login);
        } catch (e) {
          console.error(e);
          logout();
        }
      } finally {
        loading.current = false;
      }
    };
    updateAuth();
  }, [address, logout, setUser, signMessage, user]);

  return null;
}
