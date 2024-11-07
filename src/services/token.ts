import { isNil } from 'lodash';

import { appConfig } from '@/config';
import { IPaginationResponse, ITokenPaginationParams } from '@/types/api.type';
import { ICreateTokenSignature, ITokenCreate, ITokenData, ITokenHolder, ITokenTrade } from '@/types/token.type';
import { axiosInstance, axiosNoAuthInstance } from '@/utils/axios';

export const postCreateMintToken = async (
  body: {
    network: string;
    mint: string;
    name: string;
    symbol: string;
    description: string;

    min_target_score: number;
    max_target_score: number;

    max_buy_per_address?: number;
    price_sol_per_token: number;
    total_sol_receive: number;

    twitter?: string;
    telegram?: string;
    website?: string;
  },
  image: File,
) => {
  var formData = new FormData();
  for (const [key, val] of Object.entries(body)) {
    if (!isNil(val) && (val !== '' || key === 'description')) {
      formData.append(key, val.toString());
    }
  }
  formData.append('file', image);
  const data = await axiosInstance.post<ICreateTokenSignature>(appConfig.publicUrlV2 + '/mint-token/create', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data.data;
};
export const getTokenTop = async () => {
  const data = await axiosNoAuthInstance.get<IPaginationResponse<ITokenCreate>>(
    appConfig.publicUrlV2 + '/mint-token/top',
    {
      params: { page: 1, limit: 3 },
    },
  );
  return data.data;
};

export const getTokenList = async (params: {
  page: number;
  limit: number;
  sortBy: 'current_price' | 'totalHolders' | 'saleProgress' | string;
  sortType: 'asc' | 'desc' | string;
  search: string;
}) => {
  const data = await axiosNoAuthInstance.get<IPaginationResponse<ITokenCreate>>(
    appConfig.publicUrlV2 + '/mint-token/list',
    { params },
  );
  return data.data;
};

export const getTokenListOfUser = async (params: {
  page: number;
  limit: number;
  sortBy: 'current_price' | 'myAmount' | string;
  sortType: 'asc' | 'desc' | string;
  search: string;
}) => {
  const data = await axiosInstance.get<IPaginationResponse<ITokenCreate>>(
    appConfig.publicUrlV2 + '/mint-token/list-mint-tokens-of-user',
    { params },
  );
  return data.data;
};

export const getMintTokenInfo = async (nodeId: string) => {
  const data = await axiosInstance.get<ITokenData>(appConfig.publicUrlV2 + `/mint-token/info/${nodeId}`, {
    params: { tab: 'daily' },
  });
  return data.data;
};

export const getTradeHistory = async (mint: string, params: ITokenPaginationParams) => {
  const data = await axiosNoAuthInstance.get<IPaginationResponse<ITokenTrade>>(
    appConfig.publicUrlV2 + `/trades/histories/${mint}`,
    { params },
  );
  return data.data;
};

export const getTokenHolders = async (mint: string, params: ITokenPaginationParams) => {
  const data = await axiosNoAuthInstance.get<IPaginationResponse<ITokenHolder>>(
    appConfig.publicUrlV2 + `/mint-token/holder/${mint}`,
    {
      params,
    },
  );
  return data.data;
};

export const getSolPrice = async () => {
  const data = await axiosNoAuthInstance.get<{ SOL: number }>(appConfig.publicUrlV2 + `/price-token/sol-price`);
  return data.data.SOL;
};

export const postBuyToken = async (body: { network: string; mint: string; solAmount: string }) => {
  const data = await axiosInstance.post<string>(appConfig.publicUrlV2 + `/mint-token/buy`, body);
  return data.data;
};
