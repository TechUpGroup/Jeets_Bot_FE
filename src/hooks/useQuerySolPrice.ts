import { useBaseQuery } from '@/hooks/useBaseQuery';
import { getSolPrice } from '@/services/token';

export const useQuerySolPrice = () => {
  return useBaseQuery({ queryKey: ['getSolPrice'], queryFn: getSolPrice });
};
