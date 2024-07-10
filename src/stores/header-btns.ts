import { ButtonProps } from "antd/es/button/button";
import { create } from "zustand";

export interface BtnProps extends ButtonProps {
  key: string;
}

interface BtnState {
  headerBtns: Array<BtnProps>;
  setHeaderBtns: (btns: BtnProps[]) => void;
}

export const useHeaderBtnsStore = create<BtnState>((set) => ({
  headerBtns: [],
  setHeaderBtns: (headerBtns) => set({ headerBtns }),
}));
