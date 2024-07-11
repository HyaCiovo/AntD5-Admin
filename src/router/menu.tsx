import { HomeOutlined, SettingOutlined, TeamOutlined } from "@ant-design/icons";
import { ReactNode } from "react";

/**
 * 根据路径查找菜单项的键。
 * 
 * @param path 要查找的菜单项的路径。
 * @returns 匹配菜单项的键，如果没有找到匹配项，则返回空字符串。
 */
export const findKeyByPath = (path: string): string => {
  for (const [key, value] of Object.entries(MenusMap)) {
    if (value.path === path) {
      return key;
    }
  }
  return "";
};

const flattenFirstLevelChildren = (menus: any[]): any[] => {
  return menus.map(menu => {
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
}

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
    const breadcrumbs = [...parentBreadcrumbs, item.label];
    /* 创建当前菜单项的映射条目，包括label和breadCrumbs。 */
    const entry: any = {
      label: item.label,
      breadcrumbs,
    };

    /* 如果当前菜单项有path，则添加到entry中。 */
    if ('path' in item) {
      entry.path = item.path;
    }

    /* 将当前菜单项的映射条目存储到map中。 */
    map[item.key] = entry;

    /* 如果当前菜单项有子菜单，则递归处理子菜单。 */
    if (Array.isArray(item.children)) {
      item.children.forEach((subItem: any) => buildBreadcrumbs(subItem, breadcrumbs));
    }
  }

  /* 遍历菜单列表，调用buildBreadcrumbs处理每个菜单项。 */
  list.forEach(item => buildBreadcrumbs(item));

  /* 返回转换后的菜单映射对象。 */
  return map;
};

/**
 * 创建一个菜单项对象。
 * 
 * @param key 菜单项的唯一标识符。用于在代码中引用这个菜单项。
 * @param label 菜单项的显示文本。这是用户在界面上看到的文本。
 * @param children 菜单项的子项。可选参数，用于创建多级菜单结构。
 * @returns 返回一个包含菜单项信息的对象。
 */
const setMenuItem = (key: string, label: ReactNode, children?: any[]) => {
  return {
    key,
    path: key,
    label,
    children,
  };
};

/**
 * 创建子菜单项的配置对象。
 * 
 * @param key 菜单项的唯一标识符。用于在代码中引用或选择特定的菜单项。
 * @param label 菜单项的显示文本。这是用户界面中实际显示的文本。
 * @param icon 菜单项的图标。这个图标通常与菜单项的功能或类型相关联。
 * @param children 可选参数，表示当前菜单项下的子菜单项。这是一个数组，每个元素都是一个子菜单项的配置对象。
 * @returns 返回一个包含菜单项配置的对象。这个对象可以直接用于渲染菜单或作为菜单结构的一部分。
 */
const setSubMenuItem = (key: string, label: ReactNode, icon: ReactNode, children?: any[]) => {
  return {
    key,
    label,
    icon,
    children,
  };
};

export const MenusBeforeFilter = [
  setSubMenuItem("home", "首页", <HomeOutlined />),
  setSubMenuItem("user", "用户管理", <TeamOutlined />, [
    setMenuItem("/role", "角色管理", [
      setMenuItem("/role/add", "添加角色"),
      setMenuItem("/role/edit", "编辑角色"),
    ]),
    setMenuItem("/permission", "权限管理"),
  ]),
  setSubMenuItem("config", "应用配置", <SettingOutlined />, [
    setMenuItem("/route_config", "路由配置"),
    setMenuItem("/picture_config", "图片配置", [
      setMenuItem("/picture_upload", "图片上传"),
      setMenuItem("/picture_list", "图片列表"),
    ]),
  ]),
];

export const MenusMap = menuListToMap(MenusBeforeFilter);

export const menus = flattenFirstLevelChildren(MenusBeforeFilter);
