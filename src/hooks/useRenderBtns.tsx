import { useNormalLayoutStore, BtnProps } from "@/stores/layout";
import { useEffect } from "react";

/**
 * 使用自定义头部按钮。
 *
 * 该钩子用于设置页面头部的按钮配置。它通过调用`useNormalLayoutStore`中的`setHeaderBtns`方法来实现。
 * 参数`Buttons`是一个包含按钮属性的数组，用于定义头部按钮的布局和行为。
 *
 * @param Buttons 按钮属性数组，包含所有头部按钮的配置。
 */
export const useHeaderBtns = (Buttons: BtnProps[]) => {
  // 从`useNormalLayoutStore`中获取设置头部按钮的方法
  const { setHeaderBtns } = useNormalLayoutStore();

  // 在组件挂载时设置头部按钮，组件卸载时清除头部按钮
  useEffect(() => {
    setHeaderBtns(Buttons);
    // 返回一个清理函数，用于在组件卸载时清除头部按钮配置
    return () => setHeaderBtns([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
