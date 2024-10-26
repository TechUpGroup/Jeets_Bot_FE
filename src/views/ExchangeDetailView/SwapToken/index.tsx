import { ITokenInfo } from '@/types/token.type';

import { SwapTokenView } from './SwapTokenView';

export const SwapToken = ({ token }: { token: ITokenInfo }) => {
  return <SwapTokenView token={token} />;
};
