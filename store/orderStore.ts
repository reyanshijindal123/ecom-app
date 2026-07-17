import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Order } from "@/types/order";

interface OrderStore {
  orders: Order[];
  placeOrder: (order: Order) => void;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      orders: [],

      placeOrder: (order) =>
        set((state) => ({
          orders: [order, ...state.orders],
        })),
    }),
    {
      name: "velvet-orders",
    }
  )
);