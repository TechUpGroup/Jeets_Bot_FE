import { isNil } from 'lodash';
import { useEffect } from 'react';

import useWalletActive from '@/hooks/useWalletActive';
import { getAccountInfo } from '@/services/api';
import useGlobalStore from '@/store/useGlobalStore';
import useListUserStore from '@/store/useListUserStore';
import useUserStore from '@/store/useUserStore';
import { useQuery } from '@tanstack/react-query';

export function useFetchData() {
  const updateUserInfo = useUserStore((s) => s.updateUserInfo);
  const updateUserInfoToList = useListUserStore((s) => s.updateUserInfoToList);

  const count = useGlobalStore((state) => state.count);
  const { address } = useWalletActive();
  const user = useUserStore((state) => state.user);
  const { data: dataAccountInfo } = useQuery({
    queryKey: ['accountInfo', address, count, user],
    queryFn: () => getAccountInfo(),
    refetchInterval: 10_000,
    enabled: !!(address && user),
  });

  useEffect(() => {
    if (isNil(dataAccountInfo)) return;
    updateUserInfo(dataAccountInfo);
    updateUserInfoToList(dataAccountInfo);
  }, [updateUserInfoToList, dataAccountInfo, updateUserInfo]);
}
