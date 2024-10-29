import { axiosInstance } from '@/utils/axios';

export const getLeaderboard = async (type: 'W' | 'M' | 'Y' | 'D') => {
  const data = await axiosInstance.get<{
    user: {
      twitter_username: string;
      twitter_avatar: string;
      totalScore: number;
      rank: number;
    };
    topScores: {
      twitter_username: string;
      twitter_avatar: string;
      totalScore: number;
      rank: number;
    }[];
  }>(`/campaigns/leaderboard`, { params: { type } });
  return data.data;
};
