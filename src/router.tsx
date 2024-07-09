import { createBrowserRouter } from "react-router-dom";
import Layout from "@/layouts/layout";
import User from "@/pages/users";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "user",
        element: <User />,
      },
    ],
  },
]);