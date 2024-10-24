import { useBaseQuery } from '@/hooks/useBaseQuery';
import { getListCampaign } from '@/services/campaign';

export const useQueryCampaign = () => {
  return useBaseQuery({ queryKey: ['getListCampaign'], queryFn: getListCampaign });
};
