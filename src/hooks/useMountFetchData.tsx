import { useEffect } from "react";
import { create } from "zustand";
import DataMaps from "@/stores/initialGlobalData";

export type InitialGlobalState = Record<
  string,
  { initial: unknown; func?: () => Promise<unknown> }
>;

interface State {
  data: { [K in keyof typeof DataMaps]: (typeof DataMaps)[K]["initial"] };
  setProperty: (property: string, value: unknown) => void;
}

export const useMountDataStore = create<State>((set) => ({
  data: Object.fromEntries(
    Object.entries(DataMaps).map(([key, value]) => [key, value.initial])
  ),
  setProperty: (property: string, value: unknown) =>
    set((state: State) => ({
      data: { ...state.data, [property]: value },
    })),
}));

const useMountFetchData = () => {
  const { setProperty, data } = useMountDataStore();
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
