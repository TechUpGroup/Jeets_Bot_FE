import { IPoolInfo } from '@/types/airdrop.type';
import { IPaginationParams, IPaginationResponse } from '@/types/api.type';
import { axiosInstance } from '@/utils/axios';

export interface IAirdrop {
  _id: string;
  address: string;
  nonce: string;
  vid: number;
  timestamp: string;
  tx?: string;
  detail: {
    symbol: string;
    decimal: number;
    mint: string;
    amount: string;
  };
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export const getListAirdrops = async () => {
  const params: IPaginationParams = { page: 1, limit: 100 };

  const data = await axiosInstance.get<IPaginationResponse<IAirdrop>>(`/airdrops/list`, { params });
  return data.data;
};

export const postClaimAirdrop = async (id: string) => {
  const data = await axiosInstance.post<string>(`/airdrops/claim/${id}`);
  return data.data;
};

export const getAirdropsPoolInfos = async () => {
  const data = await axiosInstance.get<IPoolInfo[]>(`/airdrops/pool-infos`);
  return data.data;
};
