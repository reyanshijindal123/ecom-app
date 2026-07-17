import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistStore {
  ids: number[];
  toggle: (id: number) => void;
  isWishlisted: (id: number) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      ids: [],

      toggle: (id) =>
        set((state) => ({
          ids: state.ids.includes(id)
            ? state.ids.filter((i) => i !== id)
            : [...state.ids, id],
        })),

      isWishlisted: (id) => get().ids.includes(id),
    }),
    {
      name: "velvet-wishlist",
    }
  )
);