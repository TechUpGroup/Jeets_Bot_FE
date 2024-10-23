import { Network } from '@/enums/network.enum';

import { ObjectID } from './common.type';

export interface IUser {
  isReferral: boolean;
  _id: ObjectID;
  address: string;
  banned: boolean;
  twitter_username: string;
  twitter_uid: string;
  telegram_username: string;
  telegram_uid: string;
}
