import { axiosInstance } from '@/utils/axios';

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
    result?: [
      {
        _id: string;
        rank: number;
        name: string;
        avatar: string;
        countVote: number;
        status: boolean;
      },
      {
        _id: string;
        rank: number;
        name: string;
        avatar: string;
        countVote: number;
        status: boolean;
      },
      {
        _id: string;
        rank: number;
        name: string;
        avatar: string;
        countVote: number;
        status: boolean;
      },
      {
        _id: string;
        rank: number;
        name: string;
        avatar: string;
        countVote: number;
        status: boolean;
      },
      {
        _id: string;
        rank: number;
        name: string;
        avatar: string;
        countVote: number;
        status: boolean;
      },
    ];
  }>(`/votings/user`);
  return data.data;
};

export const postVoting = async (id: string) => {
  const data = await axiosInstance.post<boolean>(`/votings/action/${id}`);
  return data.data;
};
