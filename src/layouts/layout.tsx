import { Button, ConfigProvider, Flex, Layout } from "antd";
import MyHeader from "./header";
import React, { useEffect } from "react";
import SiderMenu from "./sider-menu";
import { useMouse, useThrottle } from "ahooks";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import MyBreadcrumbs from "./breadcrumbs";
import { useLayoutStore, BtnProps } from "@/stores/layout";
import { User, useUserStore } from "@/stores/user";

const { Header, Content, Sider } = Layout;

const LayoutComponent = () => {
  const { collapsed, setCollapsed, headerBtns } = useLayoutStore();
  const { setUser, user } = useUserStore();

  const loaderData = useLoaderData() as Partial<User>;

  useEffect(() => {
    setUser(loaderData)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const navigate = useNavigate();
  const renderBtns = (btns: BtnProps[]) => {
    return btns.map((btn) => {
      const { key, url, onClick, ...props } = btn;
      const handleClick = (e: any) => {
        url && navigate(url);
        onClick && onClick(e);
      };
      return <Button
        key={key}
        onClick={handleClick}
        {...props} />;
    });
  };

  const controllerRef = React.useRef(null);
  const { elementX, elementY, elementW, elementH } = useMouse(
    controllerRef.current
  );

  const show = React.useMemo(() => {
    if (
      elementX >= 0 &&
      elementY >= 0 &&
      elementX <= elementW &&
      elementY <= elementH
    )
      return true;
    return false;
  }, [elementX, elementY, elementW, elementH]);

  const throttledShow = useThrottle(show, { wait: 500 });

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: { headerPadding: 0 },
          Menu: { collapsedWidth: 72 },
        },
      }}
    >
      <Layout>
        <Header className="flex items-center">
          <MyHeader />
        </Header>
        <Layout>
          <Sider
            width="200"
            breakpoint="lg"
            collapsedWidth="72"
            collapsed={collapsed}
          >
            <SiderMenu />
            <div
              className="absolute top-0 bottom-0 w-4 right-0"
              ref={controllerRef}
            >
              <div
                className={`mt-48 ${!throttledShow && "hidden"
                  } cursor-pointer px-1 py-4 hover:bg-[#E7E9E8] bg-white
          border border-solid border-[#E7E9E8] rounded-lg shadow-md`}
                onClick={() => setCollapsed(!collapsed)}
              >
                <div
                  className={`border-[6px] border-solid border-transparent border-l-[#262626] 
               ${collapsed ? "rotate-0 ml-[1px]" : "rotate-180 -ml-[7px]"
                    } inline-block self-center`}
                />
              </div>
            </div>
          </Sider>
          <Layout>
            <Header className="bg-white flex items-center justify-between p-4">
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
