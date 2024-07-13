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
  refresh: () => void;
}

interface NormalLayoutState {
  headerBtns: Array<BtnProps>;
  setHeaderBtns: (headerBtns: Array<BtnProps>) => void;
}

const initialLayoutData: Pick<LayoutState, "breadcrumbs" | "openKeys" | "collapsed"> = {
  breadcrumbs: [],
  openKeys: [],
  collapsed: false,
}

/**
 * 使用zustand创建一个名为layoutStore的持久化状态管理店。
 * 
 * 该store管理着布局相关的状态，包括面包屑导航、打开的侧边栏项、布局是否折叠等。
 * 使用persisit持久化存储来保留用户在刷新页面后的布局设置。
 */
export const useLayoutStore = create<LayoutState>()(
  persist(
    (set) => (
      {
        /**
         * 面包屑导航项的状态管理。
         * 通过setBreadcrumbs函数来更新面包屑导航项。
         */
        breadcrumbs: initialLayoutData.breadcrumbs,
        setBreadcrumbs: (breadcrumbs: Array<BreadcrumbsType>) =>
          set({ breadcrumbs }),

        /**
         * 侧边栏展开项的状态管理。
         * 使用setOpenKeys函数来更新展开的侧边栏项。
         */
        openKeys: initialLayoutData.openKeys,
        setOpenKeys: (openKeys: Array<string>) => set({ openKeys }),

        /**
         * 布局是否折叠的状态管理。
         * 使用setCollapsed函数来更新布局的折叠状态。
         */
        collapsed: initialLayoutData.collapsed,
        setCollapsed: (collapsed: boolean) => set({ collapsed }),

        /**
         * 重置布局状态到初始值。
         */
        refresh: () => set(initialLayoutData),
      }
    ),
    {
      name: "layout-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

/**
 * 使用zustand创建一个普通的布局状态管理 store。
 * 
 * 它初始化了头部按钮列表，并提供了一个方法来更新这个列表。这种方式有利于在组件中集中管理和更新布局状态，
 * 使得状态的变化更加直观和可控。
 * 
 * @returns {NormalLayoutState} 返回一个包含布局状态和更新状态方法的对象。
 */
export const useNormalLayoutStore = create<NormalLayoutState>((set) => ({
  headerBtns: [],
  /**
   * 更新头部按钮列表。
   * 
   * 该方法接受一个新的头部按钮列表作为参数，然后使用 `set` 函数来更新整个布局状态对象中的头部按钮列表。
   * 这种更新方式确保了状态的不可变性，符合函数式编程的原则。
   * 
   * @param {Array} headerBtns 新的头部按钮列表。
   */
  setHeaderBtns: (headerBtns) => set({ headerBtns }),
}))