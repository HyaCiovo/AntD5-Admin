import { createBrowserRouter, Navigate } from "react-router-dom";
import React from "react";
import Loading from "./suspense-loading";
import { tokenLoader } from "./loader";
import { Spin } from "antd";

interface LazyComponentProps {
  Children: React.LazyExoticComponent<() => JSX.Element>;
  layout?: boolean;
}
const LazyComponent = ({ Children, layout = false }: LazyComponentProps) => {
  return (
    <React.Suspense fallback={<Spin />}>
      <Children />
    </React.Suspense>
  );
};

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <div>login</div>,
  },
  {
    path: "/",
    element: (
      <LazyComponent
        layout
        Children={React.lazy(() => import("@/layouts/layout"))}
      />
    ),
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <Navigate to="/role" />,
      },
      {
        path: "role",
        element: (
          <LazyComponent Children={React.lazy(() => import("@/pages/role"))} />
        ),
      },
      {
        path: "auth",
        element: (
          <LazyComponent Children={React.lazy(() => import("@/pages/auth"))} />
        ),
      },
      {
        path: "route_config",
        element: (
          <LazyComponent
            Children={React.lazy(() => import("@/pages/config-routes"))}
          />
        ),
      },
      {
        path: "picture_config",
        element: (
          <LazyComponent
            Children={React.lazy(() => import("@/pages/config-pictures"))}
          />
        ),
      },
      {
        path: "*",
        element: (
          <LazyComponent Children={React.lazy(() => import("@/pages/404"))} />
        ),
      },
    ],
  },
]);
