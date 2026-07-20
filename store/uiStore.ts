import { create } from "zustand";

interface UIStore {
  deleteConfirmId: number | null;
  setDeleteConfirmId: (id: number | null) => void;

  clearCartModal: boolean;
  setClearCartModal: (open: boolean) => void;

  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  deleteConfirmId: null,

  setDeleteConfirmId: (id) =>
    set({
      deleteConfirmId: id,
    }),

  clearCartModal: false,

  setClearCartModal: (open) =>
    set({
      clearCartModal: open,
    }),

  isDrawerOpen: false,

  openDrawer: () =>
    set({
      isDrawerOpen: true,
    }),

  closeDrawer: () =>
    set({
      isDrawerOpen: false,
    }),

  toggleDrawer: () =>
    set((state) => ({
      isDrawerOpen: !state.isDrawerOpen,
    })),
}));
