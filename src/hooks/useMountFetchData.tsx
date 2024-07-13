import { useEffect } from "react";
import { create } from "zustand";
import { produce } from "immer";
import DataMaps from "@/stores/initialGlobalData";

export type InitialGlobalState = Record<
  string,
  { initial: unknown; func?: () => Promise<unknown> }
>;

interface State {
  data: { [K in keyof typeof DataMaps]: (typeof DataMaps)[K]["initial"] };
  setProperty: (property: string, value: unknown) => void;
}

export const useMountDataStore = create<State>()((set) => ({
  data: Object.fromEntries(
    Object.entries(DataMaps).map(([key, value]) => [key, value.initial])
  ),
  setProperty: (property: string, value: unknown) =>
    set(
      produce((state) => {
        // 使用Immer的produce函数来修改状态
        state.data[property] = value;
      })
    ),
}));

const useMountFetchData = () => {
  const { setProperty } = useMountDataStore();
  const fetchAll = () => {
    Object.entries(DataMaps).forEach(async ([key, value]) => {
      value.func &&
        value.func().then((res) => {
          setProperty(key, res);
        });
    });
  };

  useEffect(fetchAll, []);
};

export default useMountFetchData;
