import { BtnProps, useHeaderBtnsStore } from "@/stores/header-btns";
import { useEffect } from "react";

/**
 * 使用自定义头部按钮。
 *
 * 该钩子用于在组件中注入并更新页面头部的按钮配置。它通过调用`useHeaderBtnsStore`中的`setHeaderBtns`方法来实现。
 * 主要用于在不同页面或组件中动态设置头部按钮，以实现页面功能的定制和交互。
 *
 * @param Buttons - 按钮属性数组。每个元素应包含按钮的相关信息，如文本、图标、点击事件等。
 */
export const useHeaderBtns = (Buttons: BtnProps[]) => {
  // 从useHeaderBtnsStore钩子中获取设置头部按钮的方法
  const { setHeaderBtns } = useHeaderBtnsStore();

  // 在组件挂载时设置头部按钮，并在组件卸载时清除头部按钮配置
  useEffect(() => {
    setHeaderBtns(Buttons);
    return () => setHeaderBtns([]);
  }, []);
};
