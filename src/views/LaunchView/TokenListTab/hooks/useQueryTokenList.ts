import { cloneDeep } from 'lodash';
import { useEffect, useMemo } from 'react';

import { useBaseQuery } from '@/hooks/useBaseQuery';
import { queryClient } from '@/providers/react-query';
import { getTokenList } from '@/services/token';
import useDataStore from '@/store/useDataStore';
import { IPaginationResponse } from '@/types/api.type';
import { ITokenCreate } from '@/types/token.type';
import { pushDataToFirstPage } from '@/utils/react-query';

export const useQueryTokenList = (params: {
  page: number;
  limit: number;
  sortBy: string;
  sortType: string;
  search: string;
}) => {
  const queryKey = useMemo(() => ['getTokenList', params], [params]);

  useEffect(() => {
    const unsub = useDataStore.subscribe(
      (state) => state.lastestToken,
      (lastestToken) => {
        if (!lastestToken) return;
        queryClient.setQueryData(queryKey, (data?: IPaginationResponse<ITokenCreate>) =>
          pushDataToFirstPage(data, lastestToken, { isNotSlice: true }),
        );
      },
    );
    return () => unsub();
  }, [queryKey]);

  useEffect(() => {
    const unsub = useDataStore.subscribe(
      (state) => state.lastestTokenUpdated,
      (lastestTokenUpdated) => {
        queryClient.setQueryData(queryKey, (data?: IPaginationResponse<ITokenCreate>) => {
          if (!lastestTokenUpdated || data?.page !== 1) return data;
          const cloneData = cloneDeep(data);
          const indexFinded = data?.docs.findIndex((e) => e._id === lastestTokenUpdated._id);
          if (indexFinded >= 0) {
            cloneData.docs.splice(indexFinded, 1);
          }
          cloneData.docs.unshift(lastestTokenUpdated);
          return cloneData;
        });
      },
    );
    return () => unsub();
  }, [queryKey]);

  return useBaseQuery({ queryKey: queryKey, queryFn: () => getTokenList(params) });
};
