import { create } from "zustand";

interface SidebarUIState {
  isSidebarVisible: boolean;

  toggleSidebar: () => void;
  showSidebar: () => void;
  hideSidebar: () => void;
}

export const useSidebarStore = create<SidebarUIState>((set) => ({
  isSidebarVisible: true,

  toggleSidebar: () =>
    set((state) => ({
      isSidebarVisible: !state.isSidebarVisible,
    })),

  showSidebar: () =>
    set({ isSidebarVisible: true }),

  hideSidebar: () =>
    set({ isSidebarVisible: false }),
}));