import { Network } from '@/enums/network.enum';

import { ObjectID } from './common.type';

export interface IUser {
  isReferral: boolean;
  _id: ObjectID;
  address: string;
  network: Network;
  banned: boolean;
  balance: number;
  payload_amount: 0;
  twitter_uid: string;
  twitter_username: string;
  twitter_connected: boolean;
  twitter_followed_or_joined: boolean;
  discord_uid: string;
  discord_connected: boolean;
  discord_followed_or_joined: boolean;
  nonce: string;
  address_secondaries: { address: string; network: Network }[];
  code: string;
  discord_roles: {
    _id: string;
    role_id: string;
    payload_amount: number;
    role: string;
  }[];
}
