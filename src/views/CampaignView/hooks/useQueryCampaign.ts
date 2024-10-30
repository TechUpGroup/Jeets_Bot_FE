import { useBaseQuery } from '@/hooks/useBaseQuery';
import { getListCampaign } from '@/services/campaign';
import { useUser } from '@/store/useUserStore';

export const useQueryCampaign = () => {
  const user = useUser();
  return useBaseQuery({ queryKey: ['getListCampaign'], queryFn: getListCampaign, enabled: !!user });
};
