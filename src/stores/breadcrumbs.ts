import { ButtonProps } from "antd/es/button/button";
import { create } from "zustand";

export interface BtnProps extends ButtonProps {
  key: string;
}

interface BreadcrumbsState {
  breadcrumbs: Array<BtnProps>;
  setBreadcrumbs: (btns: BtnProps[]) => void;
}

export const useBreadcrumbsStore = create<BreadcrumbsState>((set) => ({
  breadcrumbs: [{ type: "primary", children: "按钮", key: "btn" }],
  setBreadcrumbs: (breadcrumbs) => set({ breadcrumbs }),
}));
