import { useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { IUserInfo } from '@/types/auth.type';
import { IUser } from '@/types/user.type';

import { deepCompareState } from './index';

interface UserState {
  user: IUserInfo | null;
  setUser(user: IUserInfo | null): void;
  updateUserInfo(userInfo: IUser): void;
}
const useUserStore = createWithEqualityFn<UserState>(
  (set) => ({
    user: null,
    setUser: (user) => set({ user }),
    updateUserInfo: (userInfo) =>
      set((state) => ({
        user: state.user ? { ...state.user, user: userInfo } : null,
      })),
  }),
  deepCompareState,
);

export default useUserStore;

export const useUserShallow = <U>(selector: (state: UserState) => U) => useUserStore(useShallow(selector));

export const useUser = () => {
  const user = useUserStore((s) => s.user, deepCompareState);
  return useMemo(() => user?.user, [user?.user]);
};
