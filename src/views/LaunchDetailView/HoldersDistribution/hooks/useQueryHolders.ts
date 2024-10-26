import { useBaseQuery } from '@/hooks/useBaseQuery';
import { getTokenHolders } from '@/services/token';

export const useQueryHolders = (mint: string) => {
  return useBaseQuery({
    queryKey: ['getTokenHolders', mint],
    queryFn: () => getTokenHolders(mint, { network: 'solana', page: 1, limit: 100 }),
  });
};
