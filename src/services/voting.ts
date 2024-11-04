import { axiosInstance } from '@/utils/axios';

export interface IVoting {
  wid: string;
  rank: number;
  name: string;
  avatar: string;
  countVote: number;
  status: boolean;
}

export const getVoting = async () => {
  const data = await axiosInstance.get<{
    current?: {
      _id: string;
      vid: number;
      start_time: number;
      end_time: number;
      status: boolean;
      createdAt: string;
      updatedAt: string;
    };
    ratio?: number;
    result?: IVoting[];
  }>(`/votings/user`);
  return data.data;
};

export const postVoting = async (wid: string) => {
  const data = await axiosInstance.post<string>(`/votings/create-vote/${wid}`);
  return data.data;
};

export const getVotingCheck = async () => {
  const data = await axiosInstance.get<boolean>(`/votings/check`);
  return data.data;
};
