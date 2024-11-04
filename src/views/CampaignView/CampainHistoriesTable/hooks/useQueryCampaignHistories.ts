import { useBaseQuery } from '@/hooks/useBaseQuery';
import useWalletActive from '@/hooks/useWalletActive';
import { getCampaignHistories } from '@/services/campaign';
import { IPaginationParams } from '@/types/api.type';
import { keepPreviousData } from '@tanstack/react-query';

export const useQueryCampaignHistories = (params: IPaginationParams) => {
  const { address } = useWalletActive();
  return useBaseQuery({
    queryKey: ['getCampaignHistories', params],
    queryFn: () => getCampaignHistories(params),
    enabled: !!address,
    placeholderData: keepPreviousData,
  });
};
