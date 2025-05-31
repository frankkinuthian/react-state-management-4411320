import { create } from "zustand";

const useCounter = create((set, get) => ({
  count: 0,
  increment: () => {
    set(() => ({
      count: get().input ? get().count + get().input : get().count + 1,
    }));
  },
  decrement: () => {
    if (get().count < 1) {
      return false;
    }
    set(() => ({
      count: get().count - 1,
    }));
  },
  reset: () =>
    set(() => ({
      count: 0,
    })),
}));

export default useCounter;


// import create from 'zustand';

// const useCounterStore = create((set) => ({
//   count: 0,
//   increment: () => set((state) => ({ count: state.count + 1 })),
//   decrement: () => set((state) => ({ count: state.count - 1 })),
//   reset: () => set({ count: 0 }),
// }));

// export default useCounterStore;
