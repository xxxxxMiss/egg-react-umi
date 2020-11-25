import { Button } from 'antd'

export default function ButtonTheme() {
  return (
    <div id="theme-btn">
      <Button type="primary">Primary Button</Button>
      <Button>Default Button</Button>
      <Button type="dashed">Dashed Button</Button>
      <br />
      <Button type="text">Text Button</Button>
      <Button type="link">Link Button</Button>
      <br />
      <Button type="primary" danger>
        Primary
      </Button>
      <Button danger>Default</Button>
      <Button type="dashed" danger>
        Dashed
      </Button>
      <Button type="text" danger>
        Text
      </Button>
      <Button type="link" danger>
        Link
      </Button>
      <Button type="primary">Primary</Button>
      <Button type="primary" disabled>
        Primary(disabled)
      </Button>
      <br />
      <Button>Default</Button>
      <Button disabled>Default(disabled)</Button>
      <br />
      <Button type="dashed">Dashed</Button>
      <Button type="dashed" disabled>
        Dashed(disabled)
      </Button>
      <br />
      <Button type="text">Text</Button>
      <Button type="text" disabled>
        Text(disabled)
      </Button>
      <br />
      <Button type="link">Link</Button>
      <Button type="link" disabled>
        Link(disabled)
      </Button>
      <br />
      <Button danger>Danger Default</Button>
      <Button danger disabled>
        Danger Default(disabled)
      </Button>
      <br />
      <Button danger type="text">
        Danger Text
      </Button>
      <Button danger type="text" disabled>
        Danger Text(disabled)
      </Button>
      <br />
      <Button type="link" danger>
        Danger Link
      </Button>
      <Button type="link" danger disabled>
        Danger Link(disabled)
      </Button>
    </div>
  )
}
