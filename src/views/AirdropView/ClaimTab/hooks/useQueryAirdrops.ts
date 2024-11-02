import { useBaseQuery } from '@/hooks/useBaseQuery';
import { getListAirdrops } from '@/services/airdrops';
import { useUser } from '@/store/useUserStore';

export const useQueryAirdrops = () => {
  const user = useUser();
  return useBaseQuery({ queryKey: ['getListAirdrops'], queryFn: getListAirdrops, enabled: !!user });
};
