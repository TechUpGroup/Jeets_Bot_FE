import { useBaseQuery } from '@/hooks/useBaseQuery';
import { getMintTokenInfo } from '@/services/token';

export const useQueryTokenDetail = (id: string) => {
  return useBaseQuery({ queryKey: ['getMintTokenInfo', id], queryFn: () => getMintTokenInfo(id), retry: false });
};
