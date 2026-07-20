import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Review {
  productId: number;
  [key: string]: any;
}

interface ReviewStore {
  reviews: Review[];
  addReview: (review: Review) => void;
  getReviews: (productId: number) => Review[];
}

export const useReviewStore = create<ReviewStore>()(
  persist(
    (set, get) => ({
      reviews: [],

      addReview: (review) =>
        set((state) => ({
          reviews: [...state.reviews, review],
        })),

      getReviews: (productId) =>
        get().reviews.filter((r) => r.productId === productId),
    }),
    {
      name: "velvet-reviews",
    },
  ),
);
