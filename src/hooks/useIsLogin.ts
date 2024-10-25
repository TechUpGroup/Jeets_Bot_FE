import { useMemo } from 'react';

import { useUser } from '@/store/useUserStore';

export const useIsLogin = () => {
  const user = useUser();
  const isLinked = useMemo(() => !!user && !!user?.telegram_uid && !!user.twitter_uid, [user]);

  return isLinked;
};
