import { useEffect, useRef } from 'react'
import { Form, Input } from 'antd'
import io from 'socket.io-client'

export default function Theme() {
  const ioRef = useRef(null)
  const styleTagRef = useRef(null)
  const [form] = Form.useForm()

  useEffect(() => {
    const socket = (ioRef.current = io('http://127.0.0.1:7001/theme', {
      transports: ['websocket'],
      reconnectionAttempts: 10,
    }))
    socket.on('reconnect_attempt', () => {
      socket.io.opts.transports = ['polling', 'websocket']
    })
    socket.on('compiledResult', styles => {
      if (!styleTagRef.current) {
        const styleTag = (styleTagRef.current = document.createElement('style'))
        styleTag.setAttribute('type', 'text/css')
        styleTag.setAttribute('id', 'compiled_style')
        styleTag.innerHTML = styles
        document.querySelector('head').appendChild(styleTag)
      } else {
        styleTagRef.current.innerHTML = styles
      }
    })

    return () => {
      socket.close()
    }
  }, [])

  const handleStyle = () => {
    const values = form.getFieldsValue()
    const socket = ioRef.current
    socket.emit('styleChange', values)
  }

  return (
    <div>
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
