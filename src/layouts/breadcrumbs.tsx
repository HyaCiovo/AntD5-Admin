import { useLayoutStore } from "@/stores/layout";
import { LeftOutlined } from "@ant-design/icons";
import { Breadcrumb, Button } from "antd";
import {
  BreadcrumbItemType,
  BreadcrumbSeparatorType,
  ItemType,
} from "antd/es/breadcrumb/Breadcrumb";
import { Link, useNavigate } from "react-router-dom";

const itemRender = (
  route: ItemType,
  params: Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[],
  routes: ItemType[],
  paths: string[]
) => {
  const isLast = route?.path === routes[routes.length - 1]?.path;
  const isFirst = route?.path === routes[0]?.path;
  // console.log(route.path);
  return isLast || isFirst || !route.path ? (
    <span>{route.title}</span>
  ) : (
    <Link to={route.path}>{route.title}</Link>
  );
};

const MyBreadcrumbs = () => {
  const { breadcrumbs } = useLayoutStore();
  const navigate = useNavigate();

  return (
    <div className="flex items-center">
      {breadcrumbs.length > 2 && (
        <Button
          className="mr-2 mt-[2px]"
          type="text"
          icon={<LeftOutlined />}
          onClick={() => navigate(breadcrumbs[breadcrumbs.length - 2].path)}
        />
      )}
      <Breadcrumb itemRender={itemRender} items={breadcrumbs} />
    </div>
  );
};

export default MyBreadcrumbs;
