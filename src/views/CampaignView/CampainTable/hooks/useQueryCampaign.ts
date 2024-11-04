import { useBaseQuery } from '@/hooks/useBaseQuery';
import { getListCampaign } from '@/services/campaign';
import { useUser } from '@/store/useUserStore';
import { IPaginationParams } from '@/types/api.type';
import { keepPreviousData } from '@tanstack/react-query';

export const useQueryCampaign = (params: IPaginationParams) => {
  const user = useUser();
  return useBaseQuery({
    queryKey: ['getListCampaign', params],
    queryFn: () => getListCampaign(params),
    enabled: !!user,
    placeholderData: keepPreviousData 
  });
};
