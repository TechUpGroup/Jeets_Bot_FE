import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';

import { useUser } from '@/store/useUserStore';

export const useIsLogin = (isForceLogin?: boolean) => {
  const user = useUser();
  const router = useRouter();
  const isLinked = useMemo(() => !!user?.telegram_uid && !!user.twitter_uid, [user?.telegram_uid, user?.twitter_uid]);
  // useEffect(() => {
  //   if (!!user && !isLinked && isForceLogin) {
  //     router.replace('/login');
  //   }
  // }, [user, isLinked, isForceLogin]);

  return isLinked;
};
