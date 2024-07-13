import { createBrowserRouter, Navigate } from "react-router-dom";
import React from "react";
import { tokenLoader } from "./loader";
import { Spin } from "antd";

interface LazyComponentProps {
  Children: React.LazyExoticComponent<() => JSX.Element>;
  layout?: boolean;
}

const TablePageSkeleton = () => {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-160px)]">
      <Spin spinning />
    </div>
  );
};
const LazyComponent = ({ Children, layout = false }: LazyComponentProps) => {
  return (
    <React.Suspense
      fallback={
        !layout ? <TablePageSkeleton /> : <Spin size="large" fullscreen />
      }
    >
      <Children />
    </React.Suspense>
  );
};

export const routes = [
  {
    id: "login",
    name: "登录",
    path: "/login",
    element: (
      <LazyComponent
        layout
        Children={React.lazy(() => import("@/pages/login"))}
      />
    ),
  },
  {
    path: "/",
    loader: tokenLoader,
    element: (
      <LazyComponent
        layout
        Children={React.lazy(() => import("@/layouts/layout"))}
      />
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/guider" />,
      },
      {
        path: "*",
        element: (
          <LazyComponent Children={React.lazy(() => import("@/pages/404"))} />
        ),
      },
      {
        name: "引导介绍",
        path: "/guider",
        element: (
          <LazyComponent
            Children={React.lazy(() => import("@/pages/guider"))}
          />
        ),
      },
      {
        name: "角色管理",
        path: "/role",
        auth: "auth.role",
        element: (
          <LazyComponent Children={React.lazy(() => import("@/pages/role"))} />
        ),
      },
      {
        name: "添加角色",
        path: "/role/add",
        auth: "auth.role.add",
        hideInMenu: true,
        element: (
          <LazyComponent
            Children={React.lazy(() => import("@/pages/role/add-role"))}
          />
        ),
      },
      {
        name: "权限管理",
        path: "/permission",
        auth: "auth.permission",
        element: (
          <LazyComponent Children={React.lazy(() => import("@/pages/auth"))} />
        ),
      },
      {
        name: "路由配置",
        path: "/route-config",
        auth: "auth.route",
        element: (
          <LazyComponent
            Children={React.lazy(() => import("@/pages/config-routes"))}
          />
        ),
      },
      {
        name: "图片配置",
        path: "/picture-config",
        auth: "auth.picture",
        element: (
          <LazyComponent
            Children={React.lazy(() => import("@/pages/config-pictures"))}
          />
        ),
      },
      {
        name: "图片配置",
        path: "/audit-permissions",
        auth: "audit.permissions",
        element: (
          <LazyComponent
            Children={React.lazy(() => import("@/pages/audit-permissions"))}
          />
        ),
      },
      {
        name: "图片配置",
        path: "/audit-goods",
        auth: "audit.goods",
        element: (
          <LazyComponent
            Children={React.lazy(() => import("@/pages/audit-goods"))}
          />
        ),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
