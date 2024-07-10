import React from "react";
import { Menu } from "antd";
import {
  findKeyByPath,
  generateKeysByPath,
  menus,
  MenusMap,
} from "@/config/menu";
import { useLocation, useNavigate } from "react-router-dom";
import { useBreadcrumbsStore } from "@/stores/breadcrumbs";

const SiderMenu: React.FC = () => {
  const { setBreadcrumbs } = useBreadcrumbsStore();
  const defaultSelectedKeys = ["user_manage"];
  const [selectedKeys, setSelectedKeys] = React.useState(defaultSelectedKeys);

  const navigate = useNavigate();
  const onSelect = (menu: any) => {
    console.log(menu);
    navigate(MenusMap[menu.key].path as string);
    setBreadcrumbs(menu.keyPath.reverse());
  };

  const { pathname } = useLocation();
  React.useEffect(() => {
    if (pathname) {
      setSelectedKeys([findKeyByPath(pathname)]);
      setBreadcrumbs(generateKeysByPath(pathname));
    }
  }, [pathname]);

  return (
    <div className="relative h-[calc(100% - 64px)] select-none">
      <Menu
        onClick={onSelect}
        style={{
          maxWidth: "200px",
          height: "calc(100vh - 64px)",
          overflow: "auto",
          scrollbarWidth: "thin",
          textAlign: "left",
        }}
        defaultSelectedKeys={defaultSelectedKeys}
        defaultOpenKeys={["user_manage"]}
        selectedKeys={selectedKeys}
        mode="inline"
        items={menus}
      />
    </div>
  );
};

export default SiderMenu;
