import { axiosInstance } from '@/utils/axios';

export const getUserTwitterRestart = async () => {
  const data = await axiosInstance.get<{ redirectUrl: string }>(`/users/twitter/restart`);
  return data.data;
};

export const postUserTwitterReconnect = async (code: string) => {
  const data = await axiosInstance.post<boolean>('/users/twitter/reconnect', { code });
  return data.data;
};
