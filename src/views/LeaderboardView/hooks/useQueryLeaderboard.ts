import { useBaseQuery } from '@/hooks/useBaseQuery';
import { getLeaderboard } from '@/services/leaderboard';
import { useUser } from '@/store/useUserStore';

export const useQueryLeaderboard = (type: 'W' | 'M' | 'Y' | 'D' | 'TOP_100') => {
  const user = useUser();
  return useBaseQuery({
    queryKey: ['getLeaderboard', type],
    queryFn: () => getLeaderboard(type),
    enabled: !!user,
  });
};
