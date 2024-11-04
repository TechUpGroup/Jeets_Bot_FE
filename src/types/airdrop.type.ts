export interface IPoolInfo {
  _id: string;
  pid: number;
  pool_address: string;
  timestamp: string;
  detail: {
    symbol: string;
    decimal: number;
    mint: string;
  };
  status: boolean;
  total: string;
  total_airdropped: string;
}
