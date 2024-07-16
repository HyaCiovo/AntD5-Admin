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

/**
 * 使用useEffect钩子在组件挂载时触发数据的获取操作。
 * 该函数旨在优化数据加载流程，确保组件挂载时自动加载所需数据。
 * 它利用useMountDataStore钩子来管理数据状态，并通过DataMaps来遍历并获取数据。
 */
const useMountFetchData = () => {
  /**
   * 使用useMountDataStore钩子来获取设置数据的函数。
   * 这个函数用于在数据获取完成后更新状态。
   */
  const { setProperty } = useMountDataStore();
  
  /**
   * 执行所有数据获取操作的函数。
   * 它会遍历DataMaps对象，对每个具有func属性的条目异步调用其func函数，
   * 并在获取数据后使用setProperty函数更新状态。
   */
  const fetchAll = () => {
    // 遍历DataMaps对象，异步加载每个条目的数据
    Object.entries(DataMaps).forEach(async ([key, value]) => {
      // 当条目具有func属性时，执行该函数并处理返回的Promise
      value.func &&
        value.func().then((res) => {
          // 在数据获取成功后，使用setProperty更新状态
          setProperty(key, res);
        });
    });
  };

  // 在组件挂载时调用fetchAll函数，之后不再监听任何变化
  useEffect(fetchAll, []);
};

export default useMountFetchData;
