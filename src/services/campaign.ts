import { IPaginationParams, IPaginationResponse } from '@/types/api.type';
import { axiosInstance } from '@/utils/axios';

export interface ICampaign {
  _id: string;
  cid: number;
  name: string;
  type: string;
  start_time: number;
  end_time: number;
  score: number;
  details: {
    mint: string;
    symbol: string;
    decimal: number;
    amount: string;
  }[];
}

export interface ICampaignHistories {
  _id: string;
  address: string;
  timestamp: string;
  score: number;
  event: 'Sent' | 'Received' | 'Bought' | 'Sold';
  is_buy: boolean;
  is_send: boolean;
  tx: string;
  detail?: {
    mint: string;
    symbol: string;
    decimal: number;
    amount: string;
  };

  campaign?: {
    _id: string;
    cid: number;
    name: string;
    type: string;
    start_time: number;
    end_time: number;
    score: number;
    details: {
      mint: string;
      symbol: string;
      decimal: number;
      amount: string;
    }[];
  };
}

export const getListCampaign = async () => {
  const params: IPaginationParams = { page: 1, limit: 100 };

  const data = await axiosInstance.get<IPaginationResponse<ICampaign>>(`/campaigns/list`, { params: params });
  return data.data;
};

export const getCampaignHistories = async () => {
  const params: IPaginationParams = { page: 1, limit: 100 };
  const data = await axiosInstance.get<IPaginationResponse<ICampaignHistories>>(`/campaigns/histories`, {
    params: params,
  });
  return data.data;
};

export const postCampaign = async (body: any) => {
  const data = await axiosInstance.post<boolean>(`/create-new-campaign`, body);
  return data.data;
};
