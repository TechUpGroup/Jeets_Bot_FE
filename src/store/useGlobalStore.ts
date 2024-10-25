import { createWithEqualityFn } from 'zustand/traditional';

interface GlobalState {
  count: number;
  incrementCount(): void;
}

const useGlobalStore = createWithEqualityFn<GlobalState>(
  (set) => ({
    count: 0,
    incrementCount: () => set((state) => ({ count: state.count + 1 })),
  }),
  Object.is,
);

export default useGlobalStore;

export const { incrementCount } = useGlobalStore.getState();
