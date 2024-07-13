import {
  AuditOutlined,
  HomeOutlined,
  SettingOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { ReactNode } from "react";
import { useMountDataStore } from "@/hooks/useMountFetchData";
import { Badge } from "antd";

const flattenFirstLevelChildren = (menus: any[]): any[] => {
  return menus.map((menu) => {
    const newMenu = { ...menu };
    if (newMenu.children) {
      newMenu.children = newMenu.children.map((child: any) => {
        const newChild = { ...child };
        newChild.children = undefined; // 移除第二层的children属性
        return newChild;
      });
    }
    return newMenu;
  });
};

/**
 * 将菜单列表转换为键值对映射的对象，便于快速查找和使用。
 * @param list 菜单列表，每个菜单项包含label、key和可选的path和children。
 * @returns 返回一个对象，键为菜单项的key，值为包含菜单项label、breadcrumbs和可选的path的对象。
 */
const menuListToMap = (list: any[]) => {
  /* 创建一个空对象用于存储转换后的菜单映射。 */
  const map: Record<string, any> = {};

  /**
   * 递归构建菜单项的面包屑导航和映射条目。
   * @param item 当前处理的菜单项。
   * @param parentBreadcrumbs 父级菜单项的面包屑数组，用于构建当前菜单项的面包屑。
   */
  function buildBreadcrumbs(item: any, parentBreadcrumbs: any[] = []) {
    /* 构建当前菜单项的面包屑数组。 */
    const breadcrumbs = [
      ...parentBreadcrumbs,
      { title: item.breadcrumb, path: item.path },
    ];
    /* 创建当前菜单项的映射条目，包括label、path和breadCrumbs。 */
    const entry: any = {
      label: item.breadcrumb,
      path: item.path,
      breadcrumbs,
    };

    /* 如果当前菜单项有path，则添加到entry中。 */
    if ("path" in item) {
      entry.path = item.path;
    }

    /* 将当前菜单项的映射条目存储到map中。 */
    map[item.key] = entry;

    /* 如果当前菜单项有子菜单，则递归处理子菜单。 */
    if (Array.isArray(item.children)) {
      item.children.forEach((subItem: any) =>
        buildBreadcrumbs(subItem, breadcrumbs)
      );
    }
  }

  /* 遍历菜单列表，调用buildBreadcrumbs处理每个菜单项。 */
  list.forEach((item) => buildBreadcrumbs(item));

  /* 返回转换后的菜单映射对象。 */
  return map;
};

/**
 * 创建一个菜单项对象。
 *
 * 该函数用于生成一个包含路径、标签和子项的菜单项对象。此对象通常用于表示导航菜单中的一个条目，
 * 其中路径用于路由跳转，标签用于显示条目的名称，子项则是该条目下的子菜单项。
 *
 * @param path 菜单项的路径，用于路由跳转。
 * @param label 菜单项的显示标签，可以是文本或其他React元素。
 * @param children 菜单项的子项，可选参数，用于表示该菜单项是否有子菜单。
 * @returns 返回一个包含路径、标签、子项和唯一键的菜单项对象。
 */
const setMenuItem = (
  path: string,
  label: ReactNode,
  breadcrumb: string,
  children?: any[]
) => {
  return {
    key: path,
    path,
    label,
    breadcrumb,
    children,
  };
};

/**
 * 创建"一级"菜单项的配置对象。
 *
 * 该函数用于生成一个包含"一级"菜单项各种属性的配置对象，方便后续使用。
 * 主要用于在菜单系统中快速配置一个新的子菜单项，包括其键值、显示标签、图标以及可能的子菜单项。
 *
 * @param key 菜单项的唯一标识符，用于在系统中唯一标识这个菜单项。
 * * ⚠️ 注意：当该菜单项作为可跳转项时，key必须与路由配置中的path匹配，否则无法正确匹配路由。
 *
 * @param label 菜单项的显示文本，用于用户界面中展示菜单项的名称。
 * @param icon 菜单项的图标，用于用户界面中增强菜单项的视觉表现。
 * @param children 菜单项的子菜单项数组，可选参数，用于配置当前菜单项下的子菜单。
 * @returns 返回一个包含菜单项配置的对象，包括键值、路径、标签、图标和子菜单等信息。
 */
const setSubMenuItem = (
  key: string,
  label: ReactNode,
  breadcrumb: string,
  icon: ReactNode,
  children?: any[]
) => {
  return {
    key,
    path: key,
    label,
    breadcrumb,
    icon,
    children,
  };
};

const WithBadgeMenuItem = ({
  label,
  badge,
}: {
  label: ReactNode;
  badge: string;
}) => {
  const { data } = useMountDataStore();

  return (
    <div className="flex items-center">
      {label}
      <Badge count={data[badge] as number} className="ml-1" />
    </div>
  );
};

export const MenusBeforeFilter = [
  setSubMenuItem("/guider", "Guider", "Guider", <HomeOutlined />),
  setSubMenuItem("user", "UserManage", "UserManage", <TeamOutlined />, [
    setMenuItem("/role", "Role", "Role", [
      setMenuItem("/role/add", "Add", "Add"),
      setMenuItem("/role/edit", "Edit", "Edit"),
    ]),
    setMenuItem("/permission", "Permission", "Permission"),
  ]),
  setSubMenuItem(
    "config",
    "ConfigManage",
    "ConfigManage",
    <SettingOutlined />,
    [
      setMenuItem("/route-config", "Routes", "Routes"),
      setMenuItem("/picture-config", "Pictures", "Pictures"),
    ]
  ),
  setSubMenuItem("audit", "Audit", "Audit", <AuditOutlined />, [
    setMenuItem(
      "/audit-permissions",
      <WithBadgeMenuItem label="PermissionAudit" badge="permission" />,
      "PermissionAudit"
    ),
    setMenuItem(
      "/audit-goods",
      <WithBadgeMenuItem label="GoodsAudit" badge="goods" />,
      "GoodsAudit"
    ),
  ]),
];

export const MenusMap = menuListToMap(MenusBeforeFilter);

export const menus = flattenFirstLevelChildren(MenusBeforeFilter);
