import { useEffect, useMemo } from 'react';

import { useBaseQuery } from '@/hooks/useBaseQuery';
import { queryClient } from '@/providers/react-query';
import { getChatboxList } from '@/services/chatbox';
import useDataStore from '@/store/useDataStore';
import { IPaginationResponse } from '@/types/api.type';
import { IChat } from '@/types/token.type';
import { pushDataToFirstPage } from '@/utils/react-query';

const pageSize = 20;

export const useQueryChat = (mint: string, network: string, page: number) => {
  const queryKey = useMemo(() => ['getChatboxList', mint, network, page], [mint, network, page]);

  useEffect(() => {
    const unsub = useDataStore.subscribe(
      (state) => state.chatLastest,
      (chatLastest) => {
        if (!chatLastest || chatLastest.mint !== mint || chatLastest.network !== network) return;
        queryClient.setQueryData(queryKey, (data?: IPaginationResponse<IChat>) =>
          pushDataToFirstPage(data, chatLastest, { isNotSlice: true }),
        );
      },
    );
    return () => unsub();
  }, [mint, network, queryKey]);

  return useBaseQuery({
    queryKey: queryKey,
    queryFn: () => getChatboxList(mint, { page, limit: pageSize, network, tab: 'Chatbox' }),
    refetchInterval: 30_000,
  });
};
