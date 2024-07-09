import React from 'react';
import type { MenuProps } from 'antd';
import { Menu as AntdMenu } from 'antd';
import { menus } from '@/config/menu';

const Menu: React.FC = () => {
  const onClick: MenuProps['onClick'] = (e) => {
    console.log(e)
  };

  return (
    <div className="relative h-[calc(100% - 64px)] select-none">
      <AntdMenu
        onClick={onClick}
        style={{
          maxWidth: '200px',
          height: 'calc(100vh - 64px)',
          overflow: 'auto',
          scrollbarWidth: 'thin',
          textAlign: 'left',
        }}
        defaultSelectedKeys={['agency_list']}
        defaultOpenKeys={['agency_manage']}
        mode="inline"
        items={menus}
      />
    </div>
  );
};

export default Menu;