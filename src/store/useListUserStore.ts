import { cloneDeep } from 'lodash';
import { persist } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { IUserInfo } from '@/types/auth.type';
import { IUser } from '@/types/user.type';

import { StorageStoreName } from './constants';
import { deepCompareState } from './index';

interface ListUserState {
  listUser: IUserInfo[];
  addUserToList(user: IUserInfo): void;
  updateUserInfoToList(user: IUser): void;
  clearUserToList(user: IUserInfo): void;

  slippage: number;
  setSlippage(slippage: number): void;
}
const useListUserStore = createWithEqualityFn<ListUserState>()(
  persist(
    (set) => ({
      listUser: [],
      addUserToList: (user) =>
        set((state) => {
          const listUserClone = cloneDeep(state.listUser);
          const findIndex = listUserClone.findIndex((e) => e.user.address === user.user.address);
          if (findIndex >= 0) {
            listUserClone[findIndex] = user;
          } else {
            listUserClone.push(user);
          }
          return { listUser: listUserClone };
        }),
      updateUserInfoToList: (user) =>
        set((state) => {
          const listUserClone = cloneDeep(state.listUser);
          const findIndex = listUserClone.findIndex((e) => e.user.address === user.address);
          if (findIndex >= 0) {
            listUserClone[findIndex].user = user;
          }
          return { listUser: listUserClone };
        }),
      clearUserToList: (user) =>
        set((state) => {
          const listUserClone = cloneDeep(state.listUser);
          const findIndex = listUserClone.findIndex((e) => e.user.address === user.user.address);
          if (findIndex >= 0) {
            listUserClone.splice(findIndex, 1);
          }
          return { listUser: listUserClone };
        }),

      slippage: 2,
      setSlippage: (slippage) => set({ slippage }),
    }),
    {
      name: StorageStoreName.USER,
    },
  ),
  deepCompareState,
);

export default useListUserStore;

export const useListUserShallow = <U>(selector: (state: ListUserState) => U) => useListUserStore(useShallow(selector));
