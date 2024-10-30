import { axiosInstance } from '@/utils/axios';

export const getHolderRequire = async () => {
  const data = await axiosInstance.get<
    {
      _id: string;
      contract_address: string;
      decimal: number;
      symbol: string;
      require_hold: string;
    }[]
  >(`/contract/hold-require`);
  return data.data;
};

export const postUpdatePartner = async (mint: string) => {
  const data = await axiosInstance.put(`/users/update-partner/${mint}`);
  return data.data;
};
