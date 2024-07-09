import { useUserStore } from '@/stores/user';
import { Avatar, Dropdown, Menu, MenuProps } from 'antd';
import { VITE_APP_LOGO, VITE_APP_TITLE } from 'config/constant';
import { Link } from 'react-router-dom';
const Header = () => {
  const user = useUserStore()
  const handleLogout = () => { }
  const items: MenuProps['items'] = [
    {
      key: '1',
      type: 'group',
      label: '退出登录',
    },
  ];

  return (
    <div className="bg-primary w-screen flex h-16 px-6 text-white">
      <div className="flex items-center">
        <Link to="/">
          <img
            src={VITE_APP_LOGO}
            alt="logo"
            className="h-8"
          />
        </Link>
        <span className="opacity-50 text-base mx-6">|</span>
        <h3 className="font-semibold">{VITE_APP_TITLE}</h3>
      </div>
      <div className="header-right">
        {user && <></>
          // <Dropdown
          //   menu={{ items }}
          //   placement="bottomRight"
          //   getPopupContainer={() => document.body}
          //   className="user-login-down"
          // >
          //   {/* {!businessUrl ? (
          //   <span className="user-detail">
          //     <Avatar size={36} src={user.avatar} />
          //     <span className="ml8">{user.nickname || user.username}</span>
          //   </span>
          // ) : (
          //   <span className="ml8">{`${user.nickname || user.username} - ${shopDetail?.agencyName || '-'}`}</span>
          // )} */}
          // </Dropdown>
        }
      </div>
    </div>
  );
}

export default Header;