import { useBaseQuery } from '@/hooks/useBaseQuery';
import useWalletActive from '@/hooks/useWalletActive';
import { getTotalUserWithScore } from '@/services/api';

export const useQueryTotalUserWithScore = (min_target_score: number, max_target_score: number) => {
  const { address } = useWalletActive();
  return useBaseQuery({
    queryKey: ['getTotalUserWithScore', min_target_score, max_target_score, address],
    queryFn: () => getTotalUserWithScore({ min_target_score, max_target_score }),
    enabled: !!address,
  });
};
