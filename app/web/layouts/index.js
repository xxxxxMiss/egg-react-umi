import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons'
import { connect } from 'umi'
import axios from 'axios'

const { Header, Content, Footer, Sider } = Layout

const AppRoot = props => {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            nav 1
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            nav 2
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            nav 3
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, color: 'white' }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: () => setCollapsed(prev => !prev),
            },
          )}
          <span>{props.userData.username}</span>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  )
}

AppRoot.getInitialProps = async ({ store }) => {
  const res = await axios.get('http://127.0.0.1:7001/api/user')
  await store.dispatch({
    type: 'user/setUsername',
    payload: {
      ...res.data.result,
    },
  })
  return {
    userData: res.data.result,
  }
}

export default connect(state => {
  return {
    userData: state.user,
  }
})(AppRoot)
