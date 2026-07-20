import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useAuthStore } from "./authStore";

interface Product {
  id: number;
  price: number;
  [key: string]: any;
}

interface CartItem extends Product {
  quantity: number;
  size?: string | null;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, size?: string) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, size) => {
        set((state) => {
          const existing = state.items.find(
            (i) => i.id === product.id && i.size === size,
          );

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === product.id && i.size === size
                  ? { ...i, quantity: i.quantity + 1 }
                  : i,
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                ...product,
                quantity: 1,
                size,
              },
            ],
          };
        });
      },

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      updateQuantity: (id, quantity) => {
        const isAuthenticated = useAuthStore.getState().isAuthenticated;

        if (!isAuthenticated) return;

        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        set((state) => ({
          items: state.items.map((i) =>
            i.id === id
              ? {
                  ...i,
                  quantity,
                }
              : i,
          ),
        }));
      },

      clearCart: () =>
        set({
          items: [],
        }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      totalPrice: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    {
      name: "velvet-cart",
    },
  ),
);
