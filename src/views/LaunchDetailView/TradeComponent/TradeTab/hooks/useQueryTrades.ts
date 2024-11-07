import { useEffect, useMemo } from 'react';

import { useBaseQuery } from '@/hooks/useBaseQuery';
import { queryClient } from '@/providers/react-query';
import { getTradeHistory } from '@/services/token';
import useDataStore from '@/store/useDataStore';
import { IPaginationResponse } from '@/types/api.type';
import { ITokenTrade } from '@/types/token.type';
import { pushDataToFirstPage } from '@/utils/react-query';

const pageSize = 20;
export const useQueryTrades = (mint: string, network: string, page: number) => {
  const queryKey = useMemo(() => ['getTradeHistory', mint, network, page], [mint, network, page]);

  useEffect(() => {
    const unsub = useDataStore.subscribe(
      (state) => state.tradeLastest,
      (tradeLastest) => {
        if (!tradeLastest || tradeLastest.mint !== mint || tradeLastest.network !== network) return;
        queryClient.setQueryData(queryKey, (data?: IPaginationResponse<ITokenTrade>) =>
          pushDataToFirstPage(data, tradeLastest, { isNotSlice: true }),
        );
      },
    );
    return () => unsub();
  }, [mint, network, queryKey]);

  return useBaseQuery({
    queryKey: queryKey,
    queryFn: () => getTradeHistory(mint, { page, limit: pageSize, network }),
    refetchInterval: 30_000,
  });
};
