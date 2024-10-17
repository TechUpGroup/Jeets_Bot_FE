import { IPaginationResponse } from '@/types/api.type';
import { axiosInstance } from '@/utils/axios';

export const getHistories = async () => {
  const data = await axiosInstance.get<
    IPaginationResponse<{
      transaction_hash: string;
      timestamp: number;
      remain: string;
      transfer_amount: string;
    }>
  >(`/histories`);
  return data.data;
};

export const getHistoriesRemain = async () => {
  const data = await axiosInstance.get<number>(`/histories/remain`);
  return data.data;
};
