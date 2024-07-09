import { Breadcrumb } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { Link } from "react-router-dom";

const itemRender = (route: ItemType, params: any, routes: ItemType[], paths: string[]) => {
  const isLast = route?.path === routes[routes.length - 1]?.path;

  return isLast ? (
    <span>{route.title}</span>
  ) : (
    <Link to={`/${paths.join("/")}`}>{route.title}</Link>
  );
}

const MyBreadcrumbs = () => {

  return (
    <Breadcrumb itemRender={itemRender} items={[{
      title: 'Home',
    },
    {
      title: <a href="">Application Center</a>,
    },
    {
      title: <a href="">Application List</a>,
    },
    {
      title: 'An Application',
    },]} />
  )
}

export default MyBreadcrumbs;