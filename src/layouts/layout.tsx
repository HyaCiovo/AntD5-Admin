import { Button, ConfigProvider, Layout } from 'antd';
import MyHeader from './header';
import React from 'react';
import MyMenu from './menu';
import { useMouse, useThrottle } from 'ahooks';
import { BtnProps, useHeaderBtnsStore } from '@/stores/header-btns';
import { useOnRoutesChange } from '@/hooks/useHeaderButtons';
import { Outlet } from 'react-router-dom';
import MyBreadcrumbs from './breadcrumbs';

const { Header, Content, Sider } = Layout;

const LayoutComponent = () => {
  const { headerBtns, setHeaderBtns } = useHeaderBtnsStore()
  const renderBtns = (btns: BtnProps[]) => {
    return btns.map(btn => {
      const { key, ...props } = btn
      return <Button key={key} {...props} />
    })
  }
  useOnRoutesChange(() => setHeaderBtns([])) // clear header buttons when routes change

  const controllerRef = React.useRef(null)
  const { elementX, elementY, elementW, elementH } = useMouse(controllerRef.current);

  const [collapsed, setCollapsed] = React.useState(false);

  const show = React.useMemo(() => {
    if (elementX >= 0 && elementY >= 0 && elementX <= elementW && elementY <= elementH)
      return true
    return false
  }, [elementX, elementY, elementW, elementH])

  const throttledShow = useThrottle(show, { wait: 500 })

  return (
    <ConfigProvider theme={{
      components: {
        Layout: { headerPadding: 0 },
        Menu: { collapsedWidth: 72 }
      }
    }}>
      <Layout>
        <Header className="flex items-center">
          <MyHeader />
        </Header>
        <Layout>
          <Sider width="200"
            breakpoint="lg"
            collapsedWidth="72"
            collapsed={collapsed}
          >
            <MyMenu />
            <div className="absolute top-0 bottom-0 w-4 right-0"
              ref={controllerRef}
            >
              <div className={`mt-48 ${!throttledShow && 'hidden'} cursor-pointer px-1 py-4 hover:bg-[#E7E9E8] bg-white
          border border-solid border-[#E7E9E8] rounded-lg shadow-md`}
                onClick={() => setCollapsed(value => !value)}>
                <div className={`border-[6px] border-solid border-transparent border-l-[#262626] 
               ${collapsed ? 'rotate-0 ml-[1px]' : 'rotate-180 -ml-[7px]'} inline-block self-center`} />
              </div>
            </div>
          </Sider>
          <Layout>
            <Header className="bg-white flex items-center justify-between p-4">
              <MyBreadcrumbs />
              <div className="flex justify-end">{headerBtns.length > 0 && renderBtns(headerBtns)}</div>
            </Header>
            <div className="p-4 h-[calc(100vh-128px)] overflow-auto">
              <Content className="p-4 rounded-lg bg-white min-h-[calc(100vh-160px)]">
                <Outlet />
              </Content>
            </div>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider >
  );
};

export default LayoutComponent;