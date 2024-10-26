import { useBaseQuery } from '@/hooks/useBaseQuery';
import useWalletActive from '@/hooks/useWalletActive';
import { getCampaignHistories } from '@/services/campaign';

export const useQueryCampaignHistories = () => {
  const { address } = useWalletActive();
  return useBaseQuery({ queryKey: ['getCampaignHistories'], queryFn: getCampaignHistories, enabled: !!address });
};
