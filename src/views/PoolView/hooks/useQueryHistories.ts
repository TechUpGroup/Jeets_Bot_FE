import { useBaseQuery } from '@/hooks/useBaseQuery';
import { getAirdropsPoolInfos } from '@/services/airdrops';
import { getHistories, getHistoriesRemain } from '@/services/histories';

export const useQueryHistories = () => {
  return useBaseQuery({ queryKey: ['getHistories'], queryFn: getHistories });
};

export const useQueryHistoriesRemain = () => {
  return useBaseQuery({ queryKey: ['getHistoriesRemain'], queryFn: getHistoriesRemain });
};

export const useQueryAirdropsPoolInfos = () => {
  return useBaseQuery({ queryKey: ['getAirdropsPoolInfos'], queryFn: getAirdropsPoolInfos });
};
