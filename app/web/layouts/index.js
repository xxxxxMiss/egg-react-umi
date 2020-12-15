import React, { useState } from 'react'
import { Layout, Menu, Button } from 'antd'
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
import '../global.less'
import 'xterm/css/xterm.css'

const { Header, Content, Footer, Sider } = Layout

const AppRoot = props => {
  const [collapsed, setCollapsed] = useState(false)
  if (props.history.location.pathname.startsWith('/ssh')) {
    return <>{props.children}</>
  }
  return (
    <Layout style={{ paddingLeft: 580, height: '100%' }}>
      <Layout className="site-layout">
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
