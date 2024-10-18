import { axiosInstance } from '@/utils/axios';

export const getVoting = async () => {
  const data = await axiosInstance.get<number>(`/votings/user`);
  return data.data;
};

export const postVoting = async (id: string) => {
  const data = await axiosInstance.post<boolean>(`/votings/action/${id}`);
  return data.data;
};
