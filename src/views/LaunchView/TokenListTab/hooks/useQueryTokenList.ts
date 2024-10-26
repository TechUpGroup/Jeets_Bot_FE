import { useBaseQuery } from '@/hooks/useBaseQuery';
import { getTokenList } from '@/services/token';

export const useQueryTokenList = (params: {
  page: number;
  limit: number;
  sortBy: string;
  sortType:  string;
  search: string;
}) => {
  return useBaseQuery({ queryKey: ['getTokenList', params], queryFn: () => getTokenList(params) });
};
