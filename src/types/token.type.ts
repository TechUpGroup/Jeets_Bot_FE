type Address = string;

export interface ICreateTokenSignature {
  network: string;
  username: string;
  name: string;
  symbol: string;
  description: string;
  image_uri: string;
  metadata_uri: string;
  min_target_score: number;
  max_target_score: number;
  max_buy_per_address: number;
  price_sol_per_token: number;
  total_sol_receive: number;
  mint: string;
  creator: string;
  created_timestamp: number;
  complete: boolean;
  trade_completed: boolean;
  total_supply: number;
  virtual_sol_reserves: number;
  virtual_token_reserves: number;
  real_sol_reserves: number;
  real_token_reserves: number;
  current_price: number;
  market_cap: number;
  fee_create_market_pool: number;
  last_trade_timestamp: number;
  show_name: boolean;
  is_withdraw: boolean;
  is_burned_lp: boolean;
  is_minted_onchain: boolean;
  call_withdraw: number;
  call_create_market: number;
  call_create_pool: number;
  call_burn_lp: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITokenHolder {
  _id: string;
  network: string;
  mint: string;
  account: string;
  token_amount: number;
  mint_account: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
  ratio: number;
}

export interface ITokenCreate {
  _id: string;
  network: string;
  username: string;
  name: string;
  symbol: string;
  description: string;
  image_uri: string;
  metadata_uri: string;
  min_target_score: number;
  max_target_score: number;
  max_buy_per_address: number;
  price_sol_per_token: number;
  total_sol_receive: number;
  mint: string;
  creator: string;
  created_timestamp: number;
  complete: boolean;
  trade_completed: boolean;
  total_supply: number;
  virtual_sol_reserves: number;
  virtual_token_reserves: number;
  real_sol_reserves: number;
  real_token_reserves: number;
  current_price: number;
  myAmount: number;
  market_cap: number;
  fee_create_market_pool: number;
  last_trade_timestamp: number;
  show_name: boolean;
  is_withdraw: boolean;
  is_burned_lp: boolean;
  is_minted_onchain: boolean;
  call_withdraw: number;
  call_create_market: number;
  call_create_pool: number;
  call_burn_lp: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  transaction_hash: string;
  holders: [];
  totalHolders: number;
  saleProgress: number;
}

export interface ITokenTrade {
  _id: string;
  network: string;
  transaction_hash: string;
  log_index: number;
  username: string;
  twitter_username?: string;
  telegram_username?: string;
  avatar?: string;
  token_name: string;
  token_symbol: string;
  token_image_uri: string;
  mint: string;
  account: string;
  sol_amount: number;
  token_amount: number;
  virtual_sol_reserves: number;
  virtual_token_reserves: number;
  current_price: number;
  market_cap: number;
  usd_market_cap: number;
  usd_sol_amount: number;
  is_buy: boolean;
  timestamp: number;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface ITokenInfo {
  _id: string;
  network: string;
  username: string;
  name: string;
  symbol: string;
  description: string;
  image_uri: string;
  metadata_uri: string;
  min_target_score: number;
  max_target_score: number;
  max_buy_per_address: number;
  price_sol_per_token: number;
  total_sol_receive: number;
  mint: string;
  creator: string;
  created_timestamp: number;
  complete: boolean;
  trade_completed: boolean;
  total_supply: number;
  virtual_sol_reserves: number;
  virtual_token_reserves: number;
  real_sol_reserves: number;
  real_token_reserves: number;
  current_price: number;
  market_cap: number;
  fee_create_market_pool: number;
  last_trade_timestamp: number;
  show_name: boolean;
  is_withdraw: boolean;
  is_burned_lp: boolean;
  is_minted_onchain: boolean;
  call_withdraw: number;
  call_create_market: number;
  call_create_pool: number;
  call_burn_lp: number;
  createdAt: string;
  updatedAt: string;
  transaction_hash: string;
}

export interface ITokenData {
  mintToken?: ITokenInfo;
  marketCap?: {
    usd_market_cap: number;
    sol_market_cap: number;
  };
  volume?: {
    sol_volume: number;
    usd_volume: number;
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
