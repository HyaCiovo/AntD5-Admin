import { useUserStore } from "@/stores/user";
import { GithubOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Divider, Dropdown, MenuProps, theme } from "antd"
import React from "react";

const { useToken } = theme;
const User = () => {
  const { token } = useToken();
  const contentStyle: React.CSSProperties = {
    // width: 200,
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  const menuStyle: React.CSSProperties = {
    padding: 4,
    boxShadow: "none",
  };
  const { user, removeUser } = useUserStore();
  const handleLogout = () => {
    removeUser();
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Sign Out",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
    {
      key: "2",
      label: "Git Hub",
      icon: <GithubOutlined />,
      onClick: () => {
        location.href = "https://github.com/HyaCiovo/AntD5-Admin";
      },
    },
  ];
  return <Dropdown
    menu={{ items }}
    placement="bottomRight"
    getPopupContainer={() => document.body}
    dropdownRender={(menu) => (
      <div style={contentStyle}>
        <div className="p-4 font-comic">
          <div className="flex items-center mb-2">
            <Avatar
              size={36}
              icon={<UserOutlined />}
              src={user.avatar}
              className="cursor-pointer mr-2"
            >
              {user.username}
            </Avatar>
            <div>
              {user.username}
              <div>{user.role}</div>
            </div>
          </div>
          <div>Email: {user.email}</div>
          <div>Phone: {user.phone}</div>
        </div>
        <Divider style={{ margin: 0 }} />
        {React.cloneElement(menu as React.ReactElement, {
          style: menuStyle,
        })}
      </div>
    )}
  >
    <Avatar
      size={36}
      icon={<UserOutlined />}
      src={user.avatar}
      className="cursor-pointer"
    >
      {user.username}
    </Avatar>
  </Dropdown>
}

export default User;