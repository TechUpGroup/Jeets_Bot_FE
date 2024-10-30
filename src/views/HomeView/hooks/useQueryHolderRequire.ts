import { useBaseQuery } from '@/hooks/useBaseQuery';
import { getHolderRequire } from '@/services/contract';

export const useQueryHolderRequire = () => {
  return useBaseQuery({
    queryKey: ['getHolderRequire'],
    queryFn: getHolderRequire,
    refetchOnWindowFocus: false,
  });
};
