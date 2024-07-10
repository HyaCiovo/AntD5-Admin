import { create } from "zustand";

interface BreadcrumbsState {
  breadcrumbs: Array<string>;
  setBreadcrumbs: (breadcrumbs: Array<string>) => void;
}

export const useBreadcrumbsStore = create<BreadcrumbsState>((set) => ({
  breadcrumbs: [],
  setBreadcrumbs: (breadcrumbs) => set({ breadcrumbs }),
}));
