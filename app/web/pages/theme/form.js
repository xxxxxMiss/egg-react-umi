import { Form, Input } from 'antd'

export default function FormTheme() {
  const [form] = Form.useForm()
  const handleStyle = () => {}
  return (
    <div id="theme-form">
      <Form form={form}>
        <Form.Item name="label-required-color" label="label-required-color">
          <Input onBlur={handleStyle} placeholder="校验失败的颜色值" />
        </Form.Item>
        <Form.Item name="label-color" label="label-color">
          <Input onBlur={handleStyle} placeholder="label的色值" />
        </Form.Item>
        <Form.Item name="form-warning-input-bg" label="form-warning-input-bg">
          <Input onBlur={handleStyle} placeholder="警告输入的颜色值" />
        </Form.Item>
        <Form.Item
          name="form-item-margin-bottom"
          label="form-item-margin-bottom"
        >
          <Input onBlur={handleStyle} placeholder="每个form-item的底部外边距" />
        </Form.Item>
        <Form.Item
          name="form-item-label-font-size"
          label="form-item-label-font-size"
        >
          <Input onBlur={handleStyle} placeholder="label字体大小" />
        </Form.Item>
        <Form.Item name="form-item-label-height" label="form-item-label-height">
          <Input onBlur={handleStyle} placeholder="label的高度" />
        </Form.Item>
      </Form>
    </div>
  )
}
