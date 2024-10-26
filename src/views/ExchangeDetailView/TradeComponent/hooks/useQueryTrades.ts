import { useBaseQuery } from '@/hooks/useBaseQuery';
import { getTradeHistory } from '@/services/token';

export const useQueryTrades = (mint: string) => {
  return useBaseQuery({
    queryKey: ['getTradeHistory', mint],
    queryFn: () => getTradeHistory(mint, { network: 'solana', page: 1, limit: 100 }),
  });
};
