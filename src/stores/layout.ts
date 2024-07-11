import { ButtonProps } from "antd";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface BtnProps extends ButtonProps {
  key: string;
  url?: string;
}

interface LayoutState {
  breadcrumbs: Array<string>;
  setBreadcrumbs: (breadcrumbs: Array<string>) => void;
  openKeys: Array<string>;
  setOpenKeys: (openKeys: Array<string>) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  headerBtns: Array<BtnProps>;
  setHeaderBtns: (btns: BtnProps[]) => void;
}

export const useLayoutStore = create<LayoutState>()(
  persist(
    (set) => ({
      breadcrumbs: [],
      setBreadcrumbs: (breadcrumbs: Array<string>) => set({ breadcrumbs }),
      openKeys: [],
      setOpenKeys: (openKeys: Array<string>) => set({ openKeys }),
      collapsed: false,
      setCollapsed: (collapsed: boolean) => set({ collapsed }),
      headerBtns: [],
      setHeaderBtns: (headerBtns) => set({ headerBtns }),
    }), 
    {
    name: "layout-store",
    storage: createJSONStorage(() => localStorage),
  })
);
