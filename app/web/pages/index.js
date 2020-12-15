import React from 'react'
import { useIntl, getLocale, setLocale, useHistory } from 'umi'
import { Card } from 'antd'
import { Link } from 'umi'

const { Meta } = Card

const Home = props => {
  const history = useHistory()
  const { title } = props
  const changeLangs = () => {
    const lang = getLocale()
    const change = lang === 'zh-CN' ? 'en-US' : 'zh-CN'
    setLocale(change, false)
  }
  const intl = useIntl()

  return (
    <div>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={
          <img
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          />
        }
      >
        <Link to="/theme">
          <Meta
            title="自定义主题"
            description="通过修改antd less变量，生成一套自定义主题。"
          />
        </Link>
      </Card>
    </div>
  )
}

export default Home
