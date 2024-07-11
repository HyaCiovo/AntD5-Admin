import { ButtonProps } from "antd";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface BtnProps extends ButtonProps {
  key: string;
  url?: string;
}

interface BreadcrumbsType {
  title: string;
  path: string;
}

interface LayoutState {
  breadcrumbs: Array<BreadcrumbsType>;
  setBreadcrumbs: (breadcrumbs: Array<BreadcrumbsType>) => void;
  openKeys: Array<string>;
  setOpenKeys: (openKeys: Array<string>) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

interface NormalLayoutState {
  headerBtns: Array<BtnProps>;
  setHeaderBtns: (headerBtns: Array<BtnProps>) => void;
}

export const useNormalLayoutStore = create<NormalLayoutState>((set) => ({
  headerBtns: [],
  setHeaderBtns: (headerBtns) => set({ headerBtns }),
}))

export const useLayoutStore = create<LayoutState>()(
  persist(
    (set) => ({
      breadcrumbs: [],
      setBreadcrumbs: (breadcrumbs: Array<BreadcrumbsType>) =>
        set({ breadcrumbs }),
      openKeys: [],
      setOpenKeys: (openKeys: Array<string>) => set({ openKeys }),
      collapsed: false,
      setCollapsed: (collapsed: boolean) => set({ collapsed }),
    }),
    {
      name: "layout-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
