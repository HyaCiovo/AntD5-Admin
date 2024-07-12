import React from "react";
import { Menu } from "antd";
import {
  menus,
  MenusBeforeFilter,
  MenusMap,
} from "@/router/menu";
import { useLocation, useNavigate } from "react-router-dom";
import { useLayoutStore } from "@/stores/layout";

const SiderMenu: React.FC = () => {
  const { setBreadcrumbs, breadcrumbs, setOpenKeys, openKeys, collapsed } = useLayoutStore();
  const [selectedKeys, setSelectedKeys] = React.useState(["role"]);
  const [menuOpenKeys, setMenuOpenKeys] = React.useState(openKeys);

  const navigate = useNavigate();
  const onSelect = (menu: any) => {
    navigate(MenusMap[menu.key].path as string);
  };

  const { pathname } = useLocation();

  React.useEffect(() => {
    if (!MenusMap[pathname]) return;
    const keys = [`/${pathname.split("/")[1]}`];
    setSelectedKeys(keys);
    setBreadcrumbs(MenusMap[pathname].breadcrumbs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);


  React.useEffect(() => {
    !collapsed && setMenuOpenKeys(openKeys);
  }, [openKeys, collapsed]);

  return (
    <div className="relative h-[calc(100% - 64px)] select-none">
      <Menu
        onClick={onSelect}
        onOpenChange={(keys) => {
          if (collapsed) setMenuOpenKeys(keys);
          else setOpenKeys(keys);
        }}
        style={{
          maxWidth: "200px",
          height: "calc(100vh - 64px)",
          overflow: "auto",
          scrollbarWidth: "thin",
          textAlign: "left",
        }}
        openKeys={menuOpenKeys}
        selectedKeys={selectedKeys}
        mode="inline"
        items={menus}
      />
    </div>
  );
};

export default SiderMenu;
