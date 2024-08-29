'use client';

import React from 'react';
import { Layout } from 'antd';
import LogoutButton from './ProfileAvatar';

const { Header, Content, Footer } = Layout;

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {    
  return (
    <Layout className="min-h-screen">
      <Header className="bg-white flex items-center justify-between">
        <div className="text-xl uppercase">ini logo</div>
        <LogoutButton/>
      </Header>
      <Content className="p-6">
        <div className="bg-white p-6 min-h-[280px]">
          {children}
        </div>
      </Content>
      <Footer className="text-center">
        @rzkiypratama ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};

export default AppLayout;