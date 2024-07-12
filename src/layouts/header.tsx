import { useUserStore } from "@/stores/user";
import {
  GithubOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Divider, Dropdown, MenuProps, theme } from "antd";
import { ANTD_LOGO, VITE_APP_TITLE, VITE_LOGO } from "config/constant";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const { useToken } = theme;
const Header = () => {
  const { token } = useToken();
  const navigate = useNavigate();

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

  return (
    <div className="bg-primary w-screen flex h-16 px-6 text-white justify-between select-none">
      <div className="flex items-center font-comic text-xl">
        <Link to="/guider" className="flex items-center">
          <div className="relative -mt-1">
            <img src={"/favicon.png"} alt="logo" className="h-8" />
            <img
              src={VITE_LOGO}
              alt="logo"
              className="h-3 absolute -right-1 bottom-0"
            />
          </div>
          <h1 className="font-semibold ml-3">Ant Design 5</h1>
        </Link>
        <span className="opacity-50 text-base mx-6">|</span>
        <h3 className="font-semibold">{VITE_APP_TITLE}</h3>
      </div>
      <div className="h-full flex items-center">
        <Dropdown
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
      </div>
    </div>
  );
};

export default Header;
