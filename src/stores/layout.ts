import { create } from "zustand";

interface LayoutState {
  breadcrumbs: Array<string>;
  setBreadcrumbs: (breadcrumbs: Array<string>) => void;
  openKeys: Array<string>;
  setOpenKeys: (openKeys: Array<string>) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const useLayoutStore = create<LayoutState>((set) => ({
  breadcrumbs: [],
  setBreadcrumbs: (breadcrumbs) => set({ breadcrumbs }),
  openKeys: [],
  setOpenKeys: (openKeys) => set({ openKeys }),
  collapsed: false,
  setCollapsed: (collapsed) => set({ collapsed }),
}));
