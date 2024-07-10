import { createBrowserRouter, Navigate } from "react-router-dom";
import React from "react";
import Loading from "./suspense-loading";
import { tokenLoader } from "./loader";
import { Spin } from "antd";

interface LazyComponentProps {
  Children: React.LazyExoticComponent<() => JSX.Element>,
  layout?: boolean
}
const LazyComponent = ({ Children, layout = false }: LazyComponentProps) => {
  return (
    <React.Suspense fallback={<Loading />}>
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
    element: <LazyComponent layout Children={React.lazy(() => import("@/layouts/layout"))} />,
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <Navigate to="/user" />,
      },
      {
        path: "user",
        element: <LazyComponent Children={React.lazy(() => import("@/pages/users"))} />,
      },
      {
        path: "auth",
        element: <LazyComponent Children={React.lazy(() => import("@/pages/auth"))} />,
      },
      {
        path: "*",
        element: <LazyComponent Children={React.lazy(() => import("@/pages/404"))} />,
      }
    ],
  },
]);