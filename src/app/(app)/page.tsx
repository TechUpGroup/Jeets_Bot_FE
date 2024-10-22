'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useIsLogin } from '@/hooks/useIsLogin';
import useWalletActive from '@/hooks/useWalletActive';
import HomeView from '@/views/HomeView';
import MissionsView from '@/views/MissionsView';

export default function Home() {
  const isLinked = useIsLogin();
  const { address } = useWalletActive();
  const router = useRouter();
  useEffect(() => {
    if (!!address && !isLinked) {
      router.replace('/login');
    }
  }, [address, isLinked, router]);

  return isLinked ? <MissionsView /> : <HomeView />;
}
