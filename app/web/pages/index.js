import React, { useState } from 'react'
import { connect, useIntl, getLocale, setLocale, useHistory } from 'umi'
import { Button } from 'antd'
import useSWR from 'swr'
import axios from 'axios'

const Home = props => {
  const history = useHistory()
  const { title } = props
  const [list, setList] = useState([])
  const changeLangs = () => {
    const lang = getLocale()
    const change = lang === 'zh-CN' ? 'en-US' : 'zh-CN'
    //     // 刷新页面
    // setLocale('zh-TW', true);
    // // 不刷新页面
    setLocale(change, false)
  }
  const intl = useIntl()
  useSWR('/api/user', async url => {
    const res = await axios.get(url, {
      params: {
        userid: '84939',
      },
    })
  })
  async function modifyName() {
    const res = await axios.post('/api/modify-name', {
      userid: '84939',
      name: 'PGOne',
    })
  }
  async function test() {
    const res = await axios.get('/api/getlist')
    console.log('=====list: ', res.data)
    setList(res.data.result)
  }

  const gotoUserPage = () => {
    history.push('/user')
  }

  return (
    <div>
      <h1>这是页面获取到的标题：{title}</h1>
      <h2>
        {intl.formatMessage({
          id: 'umi',
        })}
      </h2>
      <h3>{props.snapshot}</h3>
      <Button onClick={changeLangs}>切换语言按钮</Button>
      <Button onClick={modifyName}>fetch data</Button>
      <Button onClick={test}>hello world and data</Button>
      <Button onClick={gotoUserPage}>go to user page</Button>
      <Button onClick={() => history.push('/chat')}>chat</Button>
      <ul>
        {list.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  )
}
Home.getInitialProps = async ({ store, isServer, history, match, route }) => {
  return {}
  // console.log(ctx);
  if (!isServer) {
    return
  }
  const res = await axios.get('http://127.0.0.1:7001/api/fetchSnapshot')
  await store.dispatch({
    type: 'test/test',
    payload: { snapshot: res.data.result },
  })
  const { test } = store.getState()
  console.log('=====getInitialProps===', res.data)
  return { test, snapshot: res.data.result }
}

export default connect(({ test }) => ({
  title: test.title,
  snapshot: test.snapshot,
}))(Home)
