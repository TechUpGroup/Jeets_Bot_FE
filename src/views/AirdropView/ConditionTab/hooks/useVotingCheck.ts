import { useBaseQuery } from '@/hooks/useBaseQuery';
import { getVotingCheck } from '@/services/voting';

export const useVotingCheck = () => {
  return useBaseQuery({ queryKey: ['getVotingCheck'], queryFn: getVotingCheck });
};
