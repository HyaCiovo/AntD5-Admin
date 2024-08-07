import { App, Button, ConfigProvider, Flex, Layout } from "antd";
import MyHeader from "./header";
import { useEffect, useRef, useState } from "react";
import SiderMenu from "./sider-menu";
import { useMouse } from "ahooks";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import MyBreadcrumbs from "./breadcrumbs";
import {
  useLayoutStore,
  BtnProps,
  useNormalLayoutStore,
} from "@/stores/layout";
import { User, useUserStore } from "@/stores/user";
import { CaretLeftOutlined } from "@ant-design/icons";
import styles from "./layout.module.less";

const { Header, Content, Sider } = Layout;

const LayoutComponent = () => {
  const { collapsed, setCollapsed } = useLayoutStore();
  const { headerBtns } = useNormalLayoutStore();
  const [show, setShow] = useState(false);
  const { setUser } = useUserStore();
  const { message } = App.useApp()

  const loaderData = useLoaderData() as Partial<User>;

  useEffect(() => {
    setUser(loaderData);
    loaderData.username && message.success(`Welcome back, ${loaderData.username}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();
  const renderBtns = (btns: BtnProps[]) => {
    return btns.map((btn) => {
      const { key, url, onClick, iconPosition = "end", ...props } = btn;
      const handleClick = (e: any) => {
        url && navigate(url);
        onClick && onClick(e);
      };
      return (
        <Button
          key={key}
          iconPosition={iconPosition}
          onClick={handleClick}
          {...props}
        />
      );
    });
  };

  const controllerRef = useRef(null);
  const { elementX, elementY, elementW, elementH } = useMouse(
    controllerRef.current
  );
  useEffect(() => {
    if (
      elementX >= 0 &&
      elementY >= 0 &&
      elementX <= elementW &&
      elementY <= elementH
    )
      return setShow(true);
    setShow(false);
  }, [elementX, elementY, elementW, elementH]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: { headerPadding: 0 },
          Menu: {
            collapsedWidth: 72,
          },
        },
      }}
    >
      <Layout className={styles.layout}>
        <Header className="flex items-center">
          <MyHeader />
        </Header>
        <Layout>
          <Sider
            width="220"
            breakpoint="lg"
            collapsedWidth="72"
            collapsed={collapsed}
          >
            <SiderMenu />
            <div
              className={`fixed top-16 z-[99999] bottom-0 w-4 left-[212px] ${collapsed ? "-translate-x-[148px]" : "translate-x-0"
                }`}
              ref={controllerRef}
            >
              {show && (
                <Button
                  className="mt-40 rounded-md w-3 h-12"
                  icon={
                    <CaretLeftOutlined
                      className={`${collapsed ? "rotate-180" : "rotate-0"}`}
                    />
                  }
                  onClick={() => {
                    setShow(false);
                    setCollapsed(!collapsed);
                  }}
                />
              )}
            </div>
          </Sider>
          <Layout>
            <Header className="bg-white flex items-center justify-between p-4 border-b border-b-solid border-b-[#f0f0f0]">
              <MyBreadcrumbs />
              <Flex gap="small" align="end">
                {headerBtns.length > 0 && renderBtns(headerBtns)}
              </Flex>
            </Header>
            <div className="p-4 h-[calc(100vh-128px)] overflow-auto">
              <Content className="p-4 rounded-lg bg-white min-h-[calc(100vh-160px)]">
                <Outlet />
              </Content>
            </div>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default LayoutComponent;
