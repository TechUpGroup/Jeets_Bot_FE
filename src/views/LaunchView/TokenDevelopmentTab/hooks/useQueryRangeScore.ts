import { useBaseQuery } from '@/hooks/useBaseQuery';
import { getTotalUserWithScore } from '@/services/api';

export const useQueryTotalUserWithScore = (min_target_score: number, max_target_score: number) => {
  return useBaseQuery({
    queryKey: ['getTotalUserWithScore', min_target_score, max_target_score],
    queryFn: () => getTotalUserWithScore({ min_target_score, max_target_score }),
  });
};
