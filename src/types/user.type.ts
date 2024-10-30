import { ObjectID } from './common.type';

export interface IUser {
  isReferral: boolean;
  _id: ObjectID;
  address: string;
  banned: boolean;
  score: number;
  twitter_username: string;
  twitter_uid: string;
  telegram_username: string;
  telegram_uid: string;

  twitter_verified_type: 'none' | 'blue' | 'business' | 'government';
  twitter_followers_count: number;

  is_hold_token?: boolean;
  partner: {
    symbol: string;
    decimal: number;
    mint: string;
    amount: string;
  };
}
