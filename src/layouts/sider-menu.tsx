import React from "react";
import { Menu } from "antd";
import {
  findKeyByPath,
  generateKeysByPath,
  menus,
  MenusMap,
} from "@/config/menu";
import { useLocation, useNavigate } from "react-router-dom";
import { useLayoutStore } from "@/stores/layout";

const SiderMenu: React.FC = () => {
  const { setBreadcrumbs, setOpenKeys, openKeys, collapsed } = useLayoutStore();
  const [selectedKeys, setSelectedKeys] = React.useState(["role_manage"]);
  const [menuOpenKeys, setMenuOpenKeys] = React.useState(openKeys);

  const navigate = useNavigate();
  const onSelect = (menu: any) => {
    navigate(MenusMap[menu.key].path as string);
    setBreadcrumbs(menu.keyPath.reverse());
  };

  const { pathname } = useLocation();

  React.useEffect(() => {
    if (!pathname) return;
    // 根据当前路径name设置选中的菜单项
    setSelectedKeys([findKeyByPath(pathname)]);
    // 生成当前路径对应的面包屑导航项
    const breadcrumbs = generateKeysByPath(pathname);
    setBreadcrumbs(breadcrumbs);
    // 如果面包屑存在，并且第一个面包屑不在当前展开的菜单项中，则将其添加到展开的菜单项中
    if (breadcrumbs.length > 0 && !openKeys.includes(breadcrumbs[0]))
      setOpenKeys([...openKeys, breadcrumbs[0]]);
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
