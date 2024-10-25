import { useBaseQuery } from '@/hooks/useBaseQuery';
import useWalletActive from '@/hooks/useWalletActive';
import { getMissions } from '@/services/missions';

export const useQueryMissions = () => {
  const { address } = useWalletActive();
  return useBaseQuery({ queryKey: ['getMissions'], queryFn: getMissions, enabled: !!address });
};
