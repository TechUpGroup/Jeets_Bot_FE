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
  statusHold: boolean;
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
  event: string;
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

export interface IAirdrop {
  _id: string;
  address: string;
  nonce: string;
  vid: number;
  timestamp: string;
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

export interface ICampaignResponse {
  airdrops?: IAirdrop[];
  campaigns: IPaginationResponse<ICampaign>;
}

export const getListCampaign = async (params: IPaginationParams) => {
  const data = await axiosInstance.get<IPaginationResponse<ICampaign>>(`/campaigns/list`, { params });
  return data.data;
};

export const getCampaignHistories = async (params: IPaginationParams) => {
  const data = await axiosInstance.get<IPaginationResponse<ICampaignHistories>>(`/campaigns/histories`, { params });
  return data.data;
};

export const postCampaign = async (body: any) => {
  const data = await axiosInstance.post<boolean>(`/create-new-campaign`, body);
  return data.data;
};

export const postClaimAirdrop = async (id: string) => {
  const data = await axiosInstance.post<string>(`/airdrops/claim/${id}`);
  return data.data;
};
