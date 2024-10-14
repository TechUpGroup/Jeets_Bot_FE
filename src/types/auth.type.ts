import { IUser } from './user.type';

export interface IResponseNonce {
  address: string;
  nonce: string;
}

interface IToken {
  token: string;
  expires: string;
}

export interface ITokens {
  access: IToken;
  refresh: IToken;
}

export interface IUserInfo {
  user: IUser;
  tokens: ITokens;
}
