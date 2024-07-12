import { signOut } from "@/apis/mock/user";
import { useUserStore } from "@/stores/user";
import { GithubOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { Avatar, Divider, Dropdown, MenuProps, message, Modal, theme } from "antd"
import React, { useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";

const { useToken } = theme;
const User = () => {
  const [show, setShow] = React.useState(false);
  const { token } = useToken();
  const contentStyle: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  const menuStyle: React.CSSProperties = {
    padding: 4,
    boxShadow: "none",
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Sign Out",
      icon: <LogoutOutlined />,
      onClick: () => setShow(true),
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

  const { user, removeUser } = useUserStore();

  const navigate = useNavigate()

  const [messageApi, contextHolder] = message.useMessage();
  const { loading, run } = useRequest(signOut, {
    manual: true,
    onSuccess: () => {
      removeUser();
      setShow(false);
      messageApi.success("Sign out successful, you will be redirected to the login page soon.");
      setTimeout(() => {
        navigate("/login")
      }, 3000);
    },
    onError: (error) => {
      messageApi.error(error.message);
    },
  });

  return <>
    {contextHolder}
    <Modal
      title="Are you sure to sign out?"
      open={show}
      confirmLoading={loading}
      okText="Sign Out"
      cancelText="Cancel"
      onCancel={() => setShow(false)}
      onOk={run}
    />
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
  </>
}

export default User;