type Address = string;

export interface ICreateTokenSignature {
  mintoken: ITokenCreate;

  signature: {
    nonce: Address;
    caller: Address;
    ethAmount: string;
    price: string;
    signTime: number;
    signature: Address;
  };
}

export interface ITokenHolder {
  _id: string;
  network: string;
  mint: string;
  account: string;
  token_amount: {
    $numberDecimal: string;
  };
  mint_account: string;
  createdAt: string;
  updatedAt: string;
  ratio: number;
}

export interface ITokenCreate {
  network: string;
  user: {
    address: string;
    username: string;
    avatar: string;
  };
  is_king: boolean;
  name: string;
  symbol: string;
  description: string;
  image_uri: string;
  metadata_uri: string;
  mint: string;
  avatar?: string;
  creator: string;
  created_timestamp: number;
  nonce: Address;
  milestone_pushed: number;
  anti_rug_pool: boolean;
  complete: boolean;
  complete_timestamp: number;
  total_supply: string;
  virtual_eth_reserves: string;
  virtual_token_reserves: string;
  real_eth_reserves: string;
  real_token_reserves: string;
  init_price: number;
  market_cap: string;
  chat_count: number;
  is_minted_onchain: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
  no: number;

  telegram?: string;
  twitter?: string;
  website?: string;
}

export interface ITokenTrade {
  _id: string;
  network: string;
  transaction_hash: string;
  log_index: number;
  user: {
    username: string;
    avatar: string;
  };
  token_name: string;
  token_symbol: string;
  token_image_uri: string;
  mint: string;
  account: string;
  current_price: number;
  usd_market_cap: number;
  usd_eth_amount: number;
  is_buy: boolean;
  timestamp: number;
  eth_amount: string;
  token_amount: string;
  virtual_eth_reserves: string;
  virtual_token_reserves: string;
  market_cap: string;
  isNew?: boolean;
}

export interface ITokenInfo {
  _id: string;
  network: string;
  pool: string;

  is_king: boolean;
  user: {
    _id: string;
    username: string;
    avatar: string;
  };
  name: string;
  symbol: string;
  max_holding: string;
  description: string;
  image_uri: string;
  metadata_uri: string;
  mint: Address;
  creator: string;
  created_timestamp: number;
  nonce: string;
  milestone_pushed: number;
  anti_rug_pool: boolean;
  complete: boolean;
  complete_timestamp: number;
  total_supply: string;
  virtual_eth_reserves: string;
  virtual_token_reserves: string;
  real_eth_reserves: string;
  real_token_reserves: string;
  init_price: number;
  market_cap: string;
  chat_count: number;
  is_minted_onchain: boolean;
  createdAt: string;
  updatedAt: string;
  no: number;
  transaction_hash: string;

  telegram?: string;
  twitter?: string;
  website?: string;
}

export interface ITokenData {
  is_sell: boolean;
  mintToken?: ITokenInfo;
  volume: {
    eth_volume: number;
    usd_volume: number;
  };

  usd_king_threshold: number;
  virtualLiquidity: {
    usd_virtual_liquidity: number;
    eth_virtual_liquidity: string;
  };
  marketCap: {
    usd_market_cap: number;
    eth_market_cap: string;
  };
}

export interface IChat {
  _id: string;
  network: string;
  nonce: string;
  user: {
    _id: string;
    username: string;
    avatar: string;
  };
  mint: string;
  is_buy: true;
  eth_amount: string;
  token_amount: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  timestamp: number;
  transaction_hash: string;
}

export interface IReferralToken {
  _id: string;
  network: string;
  transaction_hash: string;
  referred: {
    address: string;
    username: string;
  };
  referral: {
    address: string;
    username: string;
  };
  mint: string;
  timestamp: number;
  token_amount: string;
}

export interface IVolumeMilestone {
  _id: string;
  daily_volume: number;
  token?: {
    _id: string;
    network: string;
    username: string;
    avatar: string;
    name: string;
    symbol: string;
    description: string;
    image_uri: string;
    metadata_uri: string;
    mint: string;
    creator: string;
    created_timestamp: number;
    complete: boolean;
    total_supply: number;
    virtual_sol_reserves: number;
    virtual_token_reserves: number;
    real_sol_reserves: number;
    real_token_reserves: number;
    init_price: number;
    market_cap: number;
    last_trade_timestamp: number;
    show_name: boolean;
    is_withdraw: boolean;
    is_burned_lp: boolean;
    is_minted_onchain: boolean;
    createdAt: string;
    updatedAt: string;
    no: number;
    __v: number;
    transaction_hash: string;
  };
}
export interface IMarketCapMilestone {
  _id: string;
  network: string;
  username: string;
  avatar: string;
  name: string;
  symbol: string;
  description: string;
  image_uri: string;
  metadata_uri: string;
  mint: string;
  creator: string;
  created_timestamp: number;
  complete: boolean;
  total_supply: number;
  virtual_sol_reserves: number;
  virtual_token_reserves: number;
  real_sol_reserves: number;
  real_token_reserves: number;
  init_price: number;
  market_cap: number;
  last_trade_timestamp: number;
  show_name: boolean;
  is_withdraw: boolean;
  is_burned_lp: boolean;
  is_minted_onchain: boolean;
  createdAt: string;
  updatedAt: string;
  no: number;
  __v: number;
  transaction_hash: string;
}
