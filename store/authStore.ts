import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: number;
  [key: string]: any;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: (user) =>
        set({
          user,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),

      updateUser: (user) =>
        set({
          user,
        }),
    }),
    {
      name: "velvet-auth",
    }
  )
);