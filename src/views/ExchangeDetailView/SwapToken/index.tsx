import { ITokenInfo } from '@/types/token.type';

import { SwapTokenView } from './SwapTokenView';

export const SwapToken = ({ token, isSell }: { token: ITokenInfo; isSell: boolean }) => {
  return <SwapTokenView token={token} isSell={isSell} />;
};
