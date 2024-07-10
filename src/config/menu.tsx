import { TeamOutlined } from "@ant-design/icons";

export const menus = [
  {
    label: "用户管理",
    icon: <TeamOutlined />,
    key: "user_manage",
    children: [
      {
        label: "角色管理",
        key: "role_manage",
        path: "/role",
      },
      {
        label: "权限管理",
        key: "permission_manage",
        path: "/auth",
      },
    ],
  },
];

const convertMenusToMap = (menus: any[]) => {
  const map: Record<string, { path?: string; label: string }> = {};

  menus.forEach((menu) => {
    if (menu.children) {
      menu.children.forEach((child: any) => {
        map[child.key] = { path: child.path, label: child.label };
      });
    }
    map[menu.key] = { path: menu.path, label: menu.label };
  });

  return map;
};

export const MenusMap = convertMenusToMap(menus);

/**
 * 根据路径查找对应的 key
 * @param path 要查找的路径
 * @returns 对应的 key 或者 undefined 如果未找到
 */
export const findKeyByPath = (path: string): string => {
  for (const [key, value] of Object.entries(MenusMap)) {
    if (value.path === path) {
      return key;
    }
  }
  return "";
};

/**
 * 根据路径生成包含所有父级key和自身key的数组
 * @param path 要查找的路径
 * @returns 包含所有父级key和自身key的数组
 */
export function generateKeysByPath(path: string): string[] {
  const keys: string[] = [];
  let currentKey = findKeyByPath(path);

  while (currentKey) {
    keys.push(currentKey);
    const parent = getParentKey(currentKey);
    if (!parent) break;
    currentKey = parent;
  }

  return keys.reverse();
}

/**
 * 根据子菜单的key找到其父菜单的key
 * @param key 子菜单的key
 * @returns 父菜单的key 或 undefined 如果没有父菜单
 */
function getParentKey(key: string): string | undefined {
  for (const menu of menus) {
    if (menu.children && menu.children.some((child) => child.key === key)) {
      return menu.key;
    }
  }
  return undefined;
}
