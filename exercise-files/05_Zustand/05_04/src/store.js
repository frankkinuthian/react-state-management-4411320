// src/store.js
import { create } from 'zustand';

export const useStore = create((set) => ({
  items: [
    { id: 1, task: "pay bills", done: false },
    { id: 2, task: "buy groceries", done: false },
    { id: 3, task: "learn Redux", done: false },
  ],
  filter: "all",
  input: "",
  addTask: (task) => {
    set((state) => ({
      items: [...state.items, { id: Date.now(), task, done: false }],
      input: "",
    }));
  },
  toggleTask: (id) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      ),
    }));
  },
  archiveTasks: () => {
    set((state) => ({
      items: state.items.filter((item) => !item.done),
    }));
  },
  setFilter: (filter) => {
    set({ filter });
  },
  setInput: (input) => {
    set({ input });
  },
}));
