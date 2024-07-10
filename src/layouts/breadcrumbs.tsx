import { MenusMap } from "@/config/menu";
import { useLayoutStore } from "@/stores/layout";
import { Breadcrumb } from "antd";
import {
  BreadcrumbItemType,
  BreadcrumbSeparatorType,
  ItemType,
} from "antd/es/breadcrumb/Breadcrumb";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const itemRender = (
  route: ItemType,
  params: Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[],
  routes: ItemType[],
  paths: string[]
) => {
  const isLast = route?.path === routes[routes.length - 1]?.path;

  return isLast ? (
    <span>{route.title}</span>
  ) : (
    <Link to={`/${paths.join("/")}`}>{route.title}</Link>
  );
};

const MyBreadcrumbs = () => {
  const { breadcrumbs } = useLayoutStore();

  const items = breadcrumbs.map((item) => {
    return { title: MenusMap[item].label };
  });

  return <Breadcrumb itemRender={itemRender} items={items} />;
};

export default MyBreadcrumbs;
