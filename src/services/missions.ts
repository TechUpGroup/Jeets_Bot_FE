import { axiosInstance } from '@/utils/axios';

export interface IMission {
  _id: string;
  mid: number;
  type: string;
  name: string;
  link: string;
  action_link: string;
  ratio: number;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  name_chat: string;
}

export const getMissions = async () => {
  const data = await axiosInstance.get<{
    ratio: number;
    result: IMission[];
  }>(`/missions/user`);
  return data.data;
};

export const postMissions = async (id: string) => {
  const data = await axiosInstance.post<boolean>(`/missions/action/${id}`);
  return data.data;
};
