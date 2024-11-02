'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useIsLogin } from '@/hooks/useIsLogin';
import useWalletActive from '@/hooks/useWalletActive';
import AirdropView from '@/views/AirdropView';
import HomeView from '@/views/HomeView';

export default function Home() {
  const isLinked = useIsLogin();
  const { address } = useWalletActive();
  const router = useRouter();
  useEffect(() => {
    if (!!address && !isLinked) {
      router.replace('/login');
    }
  }, [address, isLinked, router]);

  return isLinked ? <AirdropView /> : <HomeView />;
}
