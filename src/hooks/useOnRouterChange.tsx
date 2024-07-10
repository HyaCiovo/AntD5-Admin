import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * 使用此钩子可以跟踪路由变化，并在路由变化时执行提供的回调函数。
 *
 * @param func 路由变化时将被调用的函数。
 * @returns 返回一个对象，包含从和到的路由信息。
 */
const useOnRouterChange = (func: () => void) => {
  const location = useLocation();
  // 初始化路由变化的状态，记录从哪里到哪里的路由变化
  const [changes, setChanges] = useState({ from: "/", to: "/" });

  // 当路由变化时，更新路由变化的状态并调用提供的函数
  useEffect(() => {
    // 如果当前路径是根路径，则不进行任何操作
    if (location.pathname === "/") return;
    // 更新路由变化的状态，将之前的路由作为'from'，当前路由作为'to'
    setChanges({ from: changes.to, to: location.pathname });
    func();
  }, [location]);

  // 返回路由变化的状态
  return { from: changes.from, to: changes.to };
};

export default useOnRouterChange;
