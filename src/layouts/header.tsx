import { useUserStore } from '@/stores/user';
import { Avatar, Dropdown, MenuProps } from 'antd';
import { VITE_APP_LOGO, VITE_APP_TITLE } from 'config/constant';
import { Link } from 'react-router-dom';
const Header = () => {
  const user = useUserStore()
  const url = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg';
  const handleLogout = () => { }
  const items: MenuProps['items'] = [
    {
      key: '0',
      label: '用户名',
      type: 'group'
    },
    {
      key: '1',
      label: '退出登录',
      onClick: handleLogout,
    },
  ];

  return (
    <div className="bg-primary w-screen flex h-16 px-6 text-white justify-between select-none">
      <div className="flex items-center font-comic text-xl">
        <Link to="/" className="flex items-center">
          <img
            src={VITE_APP_LOGO}
            alt="logo"
            className="h-8"
          />
          <h1 className="font-semibold ml-2">Ant Design 5</h1>
        </Link>
        <span className="opacity-50 text-base mx-6">|</span>
        <h3 className="font-semibold">{VITE_APP_TITLE}</h3>
      </div>
      <div className="h-full flex items-center">
        <Dropdown
          menu={{ items }}
          placement="bottomRight"
          getPopupContainer={() => document.body}
        >
          <Avatar size={32} src={url} className="cursor-pointer" />
        </Dropdown>
      </div>
    </div>
  );
}

export default Header;