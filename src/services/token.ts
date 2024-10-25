import { isNil } from 'lodash';

import { appConfig } from '@/config';
import { IPaginationResponse, ITokenPaginationParams } from '@/types/api.type';
import {
  IChat,
  ICreateTokenSignature,
  IReferralToken,
  ITokenCreate,
  ITokenData,
  ITokenHolder,
  ITokenInfo,
  ITokenTrade,
} from '@/types/token.type';
import { axiosInstance, axiosNoAuthInstance } from '@/utils/axios';

type Address = string;

export const postCreateMintToken = async (
  body: {
    network: string;
    mint: string;
    name: string;
    symbol: string;
    description: string;

    target_score?: number;
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

// export const getTokenList = async (params: {
//   page: number;
//   limit: number;
//   network: string;
//   sortBy: 'updatedAt' | 'created_timestamp' | 'market_cap' | 'chat_count' | string;
//   sortType: 'asc' | 'desc' | string;
//   search: string;
//   tab: string;
// }) => {
//   const data = await axiosNoAuthInstance.get<IPaginationResponse<ITokenCreate>>(
//     appConfig.publicUrlV2 + '/mint-token/list',
//     { params },
//   );
//   return data.data;
// };

// export const getLatestToken = async () => {
//   const data = await axiosNoAuthInstance.get<ITokenCreate[]>(appConfig.publicUrlV2 + '/mint-token/latest');
//   return data.data?.[0];
// };

// export const getMintTokenInfo = async (nodeId: string) => {
//   const data = await axiosInstance.get<ITokenData>(appConfig.publicUrlV2 + `/mint-token/info/${nodeId}`, {
//     params: { network: 'scroll', tab: 'daily' },
//   });
//   return data.data;
// };

// export const postCreateChat = async (body: { network: string; mint: string; description?: string; file?: File }) => {
//   var formData = new FormData();
//   for (const [key, val] of Object.entries(body)) {
//     if (!isNil(val) && val !== '') {
//       formData.append(key, val.toString());
//     }
//   }
//   const data = await axiosInstance.post(appConfig.publicUrlV2 + '/chatbox/create', formData, {
//     headers: { 'Content-Type': 'multipart/form-data' },
//   });
//   return data.data;
// };

// export const getChatboxList = async (
//   mint: string,
//   params: { page: number; limit: number; network: string; tab: 'Chatbox' | 'Trade' },
// ) => {
//   const data = await axiosNoAuthInstance.get<IPaginationResponse<IChat>>(`/chatbox/list/${mint}`, {
//     params: { ...params, sortType: 'desc' },
//   });
//   return data.data;
// };

// export const getTradeHistory = async (mint: string, params: ITokenPaginationParams) => {
//   const data = await axiosNoAuthInstance.get<IPaginationResponse<ITokenTrade>>(`/trades/histories/${mint}`, { params });
//   return data.data;
// };
// export const getTokenIsKing = async () => {
//   const data = await axiosNoAuthInstance.get<ITokenInfo[]>(`/mint-token/is-king/`);
//   return data.data;
// };

// export const getTradeReferral = async (mint: string, params: ITokenPaginationParams) => {
//   const data = await axiosNoAuthInstance.get<IPaginationResponse<IReferralToken>>(`/trades/referral/${mint}`, {
//     params,
//   });
//   return data.data;
// };

// export const getTradeLatest = async () => {
//   const data = await axiosNoAuthInstance.get<IPaginationResponse<ITokenTrade>>(`/trades/latest`, {
//     params: { page: 1, limit: 10 },
//   });
//   return data.data;
// };

// export const getTokenHolders = async (mint: string, params: ITokenPaginationParams) => {
//   const data = await axiosNoAuthInstance.get<IPaginationResponse<ITokenHolder>>(`/mint-token/holder/${mint}`, {
//     params,
//   });
//   return data.data;
// };

// export const getListMintTokenOfUser = async (params: {
//   page: number;
//   limit: number;
//   network: string;
//   sortBy: 'updatedAt' | 'created_timestamp' | 'market_cap' | 'chat_count' | string;
//   sortType: 'asc' | 'desc' | string;
//   search: string;
//   tab: string;
// }) => {
//   const data = await axiosInstance.get<IPaginationResponse<ITokenCreate>>(
//     appConfig.publicUrlV2 + '/mint-token/list-mint-tokens-of-user',
//     {
//       params,
//     },
//   );
//   return data.data;
// };

// export const getEthPrice = async () => {
//   const data = await axiosNoAuthInstance.get<{ ETH: number }>(`/price-token/eth-price`);
//   return data.data;
// };

// export const postBuyToken = async (body: {
//   network: string;
//   mint: string;
//   ethAmount: string;
//   description?: string;
//   code?: string;
// }) => {
//   const data = await axiosInstance.post<{
//     nonce: Address;
//     caller: Address;
//     referral: Address;
//     ethAmount: string;
//     price: string;
//     signTime: number;
//     signature: Address;
//   }>(appConfig.publicUrlV2 + `/mint-token/buy`, body);
//   return data.data;
// };

// export const postSellToken = async (body: {
//   network: string;
//   mint: string;
//   tokenAmount: string;
//   description?: string;
// }) => {
//   const data = await axiosInstance.post<{
//     nonce: Address;
//     caller: Address;
//     referral: Address;
//     tokenAmount: string;
//     price: string;
//     signTime: number;
//     signature: Address;
//   }>(appConfig.publicUrlV2 + `/mint-token/sell`, body);
//   return data.data;
// };

// export const getTokenPrice = async (
//   mint: string,
//   // 'P1' | 'P3' | 'P5' | 'P15' | 'P30' | 'P45' | 'H1' | 'H2' | 'H3' | 'H4' | 'D1' | 'W1' | 'M1',
//   price_frame_tab: string,
// ) => {
//   const data = await axiosNoAuthInstance.get<
//     {
//       high: number;
//       low: number;
//       open: number;
//       close: number;
//       timestamp: number;
//     }[]
//   >(appConfig.publicUrlV2 + `/price-token/${mint}`, { params: { price_frame_tab, network: 'scroll' } });
//   return data.data;
// };
