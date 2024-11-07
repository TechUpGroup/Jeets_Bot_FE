import { subscribeWithSelector } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { IChat, ITokenCreate, ITokenTrade } from '@/types/token.type';

import { deepCompareState } from './';

interface DataState {
  lastestToken: ITokenCreate | undefined;
  setLastestToken(lastestToken: ITokenCreate): void;

  lastestTokenUpdated: ITokenCreate | undefined;
  setLastestTokenUpdated(lastestTokenUpdated: ITokenCreate): void;

  tradeLastest: ITokenTrade | undefined;
  setTradeLatest(tradeLastest: ITokenTrade): void;

  chatLastest: IChat | undefined;
  setChatLatest(ChatLastest: IChat): void;
}

const useDataStore = createWithEqualityFn<DataState>()(
  subscribeWithSelector((set) => ({
    lastestToken: undefined,
    setLastestToken: (lastestToken) => set(() => ({ lastestToken })),

    lastestTokenUpdated: undefined,
    setLastestTokenUpdated: (lastestTokenUpdated) => set(() => ({ lastestTokenUpdated })),

    tradeLastest: undefined,
    setTradeLatest: (tradeLastest) => set(() => ({ tradeLastest })),

    chatLastest: undefined,
    setChatLatest: (chatLastest) => set(() => ({ chatLastest })),
  })),
  deepCompareState,
);

export default useDataStore;

export const useDataShallow = <U>(selector: (state: DataState) => U) => useDataStore(useShallow(selector));
