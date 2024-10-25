import { Network } from '@/enums/network.enum';

import { ObjectID } from './common.type';

export interface IUser {
  isReferral: boolean;
  _id: ObjectID;
  address: string;
  banned: boolean;
  twitter_username: boolean;
  twitter_uid: string;
  telegram_username: boolean;
  telegram_uid: string;
}
