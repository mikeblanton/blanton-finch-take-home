import React, { useState } from 'react';
import { Layout, Flex, theme, Typography } from 'antd';
import CreateConnection from '../components/createConnection';
import Company from '../components/company';
import Directory from '../components/directory';
import NoData from '../components/noCustomer';
import NoEmployee from '../components/noEmployee';

const { Content, Sider } = Layout;
const {Text, Title} = Typography;

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={300} style={{padding: 16}} trigger={null}>
        <Flex vertical gap={'large'}>
          <CreateConnection />
          <Company />
          <Directory />
        </Flex>
      </Sider>
      <Layout style={{ padding: '24px' }}>
        <Content>
          <Flex style={{height: 'calc(100vh - 48px)', background: colorBgContainer, borderRadius: borderRadiusLG, padding: 24}}>
            <NoData />
            <NoEmployee />
          </Flex>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
