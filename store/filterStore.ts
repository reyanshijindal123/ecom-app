import { create } from "zustand";
export type SortOption =
  "title-asc" | "title-desc" | "price-asc" | "price-desc" | string;

export interface FilterState {
  category: string;
  search: string;
  sort: SortOption;
  minPrice: number;
  maxPrice: number;
}

const defaultFilters: FilterState = {
  category: "",
  search: "",
  sort: "title-asc",
  minPrice: 0,
  maxPrice: 100000,
};

interface FilterStore extends FilterState {
  setCategory: (category: string) => void;
  setSearch: (search: string) => void;
  setSort: (sort: SortOption) => void;
  setPriceRange: (min: number, max: number) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  ...defaultFilters,

  setCategory: (category) => set({ category }),

  setSearch: (search) => set({ search }),

  setSort: (sort) => set({ sort }),

  setPriceRange: (minPrice, maxPrice) =>
    set({
      minPrice,
      maxPrice,
    }),

  resetFilters: () => set(defaultFilters),
}));
