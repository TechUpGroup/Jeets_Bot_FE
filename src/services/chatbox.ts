import { isNil } from 'lodash';

import { appConfig } from '@/config';
import { IPaginationResponse } from '@/types/api.type';
import { IChat } from '@/types/token.type';
import { axiosInstance, axiosNoAuthInstance } from '@/utils/axios';

export const postCreateChat = async (body: { network: string; mint: string; description?: string; file?: File }) => {
  var formData = new FormData();
  for (const [key, val] of Object.entries(body)) {
    if (!isNil(val) && val !== '') {
      formData.append(key, val.toString());
    }
  }
  const data = await axiosInstance.post(appConfig.publicUrlV2 + '/chatbox/create', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data.data;
};

export const getChatboxList = async (
  mint: string,
  params: { page: number; limit: number; network: string; tab: 'Chatbox' },
) => {
  const data = await axiosNoAuthInstance.get<IPaginationResponse<IChat>>(
    appConfig.publicUrlV2 + `/chatbox/list/${mint}`,
    {
      params: { ...params, sortType: 'desc' },
    },
  );
  return data.data;
};
