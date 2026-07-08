import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, User, Review, Order, Address } from '@/types';
import { FilterState, SortOption } from '@/types';

// ─── Cart Store ───────────────────────────────────────────────────────────────
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
          const existing = state.items.find((i) => i.id === product.id && i.size === size);
          if (existing) {
            return { items: state.items.map((i) => i.id === product.id && i.size === size ? { ...i, quantity: i.quantity + 1 } : i) };
          }
          return { items: [...state.items, { ...product, quantity: 1, size }] };
        });
      },
      removeItem: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
     updateQuantity: (id, quantity) => {
      
  const isAuthenticated = useAuthStore.getState().isAuthenticated;

  if (!isAuthenticated) {
    return;
  }

  if (quantity <= 0) {
    get().removeItem(id);
    return;
  }

  set((state) => ({
    items: state.items.map((i) =>
      i.id === id ? { ...i, quantity } : i
    ),
  }));
},
      clearCart: () => set({ items: [] }),
      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    { name: 'velvet-cart' }
  )
);

// ─── Auth Store ───────────────────────────────────────────────────────────────
interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: 'velvet-auth' }
  )
);

// ─── Filter Store ─────────────────────────────────────────────────────────────
const defaultFilters: FilterState = { category: '', search: '', sort: 'title-asc', minPrice: 0, maxPrice: 100000 };

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
  setPriceRange: (minPrice, maxPrice) => set({ minPrice, maxPrice }),
  resetFilters: () => set(defaultFilters),
}));

// ─── Wishlist Store ───────────────────────────────────────────────────────────
interface WishlistStore {
  ids: number[];
  toggle: (id: number) => void;
  isWishlisted: (id: number) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) => set((s) => ({ ids: s.ids.includes(id) ? s.ids.filter((i) => i !== id) : [...s.ids, id] })),
      isWishlisted: (id) => get().ids.includes(id),
    }),
    { name: 'velvet-wishlist' }
  )
);

// ─── Review Store ─────────────────────────────────────────────────────────────
interface ReviewStore {
  reviews: Review[];
  addReview: (review: Review) => void;
  getReviews: (productId: number) => Review[];
}

export const useReviewStore = create<ReviewStore>()(
  persist(
    (set, get) => ({
      reviews: [],
      addReview: (review) => set((s) => ({ reviews: [...s.reviews, review] })),
      getReviews: (productId) => get().reviews.filter((r) => r.productId === productId),
    }),
    { name: 'velvet-reviews' }
  )
);

// ─── Order Store ──────────────────────────────────────────────────────────────
interface OrderStore {
  orders: Order[];
  placeOrder: (order: Order) => void;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      orders: [],
      placeOrder: (order) => set((s) => ({ orders: [order, ...s.orders] })),
    }),
    { name: 'velvet-orders' }
  )
);

// ─── Search History Store ─────────────────────────────────────────────────────
interface SearchStore {
  history: string[];
  addSearch: (term: string) => void;
  clearHistory: () => void;
}

export const useSearchStore = create<SearchStore>()(
  persist(
    (set) => ({
      history: [],
      addSearch: (term) => set((s) => ({ history: [term, ...s.history.filter((h) => h !== term)].slice(0, 10) })),
      clearHistory: () => set({ history: [] }),
    }),
    { name: 'velvet-search' }
  )
);

// ─── UI Store (modals, toasts etc.) ───────────────────────────────────────────
interface UIStore {
  deleteConfirmId: number | null;
  setDeleteConfirmId: (id: number | null) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  deleteConfirmId: null,
  setDeleteConfirmId: (id) => set({ deleteConfirmId: id }),
}));
