import { Button } from 'antd'

export default function ButtonTheme() {
  return (
    <div id="theme-btn">
      <Button type="primary">Primary Button</Button>
      <br />
      <Button type="text">Text Button</Button>
      <br />
      <Button type="primary" danger>
        Primary
      </Button>
      <Button type="primary" disabled>
        Primary(disabled)
      </Button>
      <br />
      <Button type="text">Text</Button>
      <Button type="text" disabled>
        Text(disabled)
      </Button>
      <br />
      <Button type="link" disabled>
        Link(disabled)
      </Button>
    </div>
  )
}
