import { useBaseQuery } from '@/hooks/useBaseQuery';
import useWalletActive from '@/hooks/useWalletActive';
import { getVoting } from '@/services/voting';

export const useQueryVoting = () => {
  const { address } = useWalletActive();
  return useBaseQuery({ queryKey: ['getVoting'], queryFn: getVoting, enabled: !!address });
};
