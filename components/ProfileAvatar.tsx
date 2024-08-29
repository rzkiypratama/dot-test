'use client';

import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, MenuProps, Space } from 'antd';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  const items: MenuProps['items'] = [
    {
      label: (
        <div className='flex items-center gap-3' onClick={handleLogout}>
          <LogoutOutlined className='text-red-500' />Logout
        </div>
      ),
      key: '2',
    },
  ];

  return (
    <Dropdown menu={{ items }}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <Avatar icon={<UserOutlined />} />
        </Space>
      </a>
    </Dropdown>
  );
}