import type { InitialGlobalState } from "@/hooks/useMountFetchData";
const fetchCount = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.floor(Math.random() * 100));
    }, 1000);
  });
};

/**
 * 配置初始全局状态数据
 *
 * 该对象定义了全局状态的初始值和更新这些状态的函数。全局状态在这里指的是应用中共享的、可被不同组件或逻辑访问和修改的数据。
 * 这种方式初始化状态的好处是，可以集中管理和更新状态，提高代码的可维护性和可读性。
 *
 * @template InitialGlobalState 一个泛型，用于指定全局状态的初始值和更新函数的结构。
 */
const GlobalState: InitialGlobalState = {
  permission: {
    initial: 0,
    func: () => fetchCount(),
  },
  goods: {
    initial: 0,
    func: () => fetchCount(),
  },
};

export default GlobalState;
