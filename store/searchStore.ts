import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SearchStore {
  history: string[];
  addSearch: (term: string) => void;
  clearHistory: () => void;
}

export const useSearchStore = create<SearchStore>()(
  persist(
    (set) => ({
      history: [],

      addSearch: (term) =>
        set((state) => ({
          history: [
            term,
            ...state.history.filter((h) => h !== term),
          ].slice(0, 10),
        })),

      clearHistory: () =>
        set({
          history: [],
        }),
    }),

    {
      name: "velvet-search",
    }
  )
);