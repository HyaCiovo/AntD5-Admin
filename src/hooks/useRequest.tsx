import { useRequest as useAhooksRequest } from "ahooks";
import { Options, Service, Plugin } from "ahooks/lib/useRequest/src/types";

/**
 * 使用ahooks的useRequest钩子，但对手动触发请求的行为进行了默认配置。
 *
 * 此函数旨在简化对ahooks中useRequest钩子的调用，特别是对于那些默认需要手动触发请求的场景。
 * 通过在此处设置`manual`选项为`true`，可以避免在每次组件渲染时自动触发请求，从而提供更灵活的控制。
 *
 * @param service 服务函数，用于执行请求。
 * @param options 可选的配置对象，用于定制useRequest的行为。如果未提供，则使用默认配置。
 * @param plugins 可选的插件数组，用于扩展useRequest的功能。
 * @returns 返回ahooks的useRequest钩子的结果，包括请求状态、数据、错误处理和触发请求的函数等。
 */
const useRequest = (
  service: Service<unknown, any[]>,
  options?: Options<unknown, any[]> | undefined,
  plugins?: Plugin<unknown, any[]>[] | undefined
) => {
  // 使用ahooks的useRequest钩子，并应用默认配置：手动触发请求。
  return useAhooksRequest(
    service,
    {
      ...options,
      manual: options?.manual || true,
    },
    plugins
  );
};

export default useRequest;
