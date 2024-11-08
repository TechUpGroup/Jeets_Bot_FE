import { useBaseQuery } from '@/hooks/useBaseQuery';
import { getTokenListOfUser } from '@/services/token';

export const useQueryMyTokenList = (params: {
  page: number;
  limit: number;
  sortBy: string;
  sortType: string;
  search: string;
}) => {
  return useBaseQuery({ queryKey: ['getTokenListOfUser', params], queryFn: () => getTokenListOfUser(params) });
};
