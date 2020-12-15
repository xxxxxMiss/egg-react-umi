import { useEffect, useRef, useState } from 'react'
import { Drawer, Divider, Button } from 'antd'
import ButtonTheme from './button'
import FormTheme from './form'
import MenuTheme from './menu'
import PaginationTheme from './pagination'
import DatePickerTheme from './datepicker'
import RadioTheme from './radio'
import TransferTheme from './transfer'
import InputTheme from './input'
import io from 'socket.io-client'
import ReactJson from 'react-json-view'
import { getThemeVariables } from 'antd/dist/theme'
import { COMPONENTS, getCategorys } from 'assets/js/utils'
import styles from './index.less'
import SwitchTheme from './switch'
import SelectTheme from './select'
import StepsTheme from './steps'
import TableTheme from './table'

export default function Theme() {
  const ioRef = useRef(null)
  const styleTagRef = useRef(null)
  const categoryRef = useRef(null)
  const [vars, setVars] = useState({})
  const [drawerVisible, setDrawerVisible] = useState(true)
  const [filterVisible, setFilterVisible] = useState(false)
  const [jsonObject, setJsonObject] = useState(getThemeVariables())

  useEffect(() => {
    if (!ioRef.current) {
      ioRef.current = io('http://127.0.0.1:7001/theme', {
        transports: ['websocket'],
        reconnectionAttempts: 10,
      })
    }
    const socket = ioRef.current
    socket.on('reconnect_attempt', () => {
      socket.io.opts.transports = ['polling', 'websocket']
    })
    return () => {
      socket.close()
    }
  }, [])

  useEffect(() => {
    const socket = ioRef.current
    if (!socket || !Object.keys(vars).length) return
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
    socket.emit('styleChange', vars)
  }, [vars])

  useEffect(() => {
    categoryRef.current = getCategorys(jsonObject)
  }, [])

  const targetScrollIntoView = name => {
    const prefix = name.split('-')[0]
    const target = document.querySelector(`#theme-${prefix}`)
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }
  const onJsonEdit = edit => {
    targetScrollIntoView(edit.name)
    if (edit.new_value != edit.existing_value) {
      setVars(prev => {
        return { ...prev, [edit.name]: edit.new_value }
      })
      setJsonObject(prev => {
        return { ...prev, ...edit.updated_src }
      })
    }
  }

  return (
    <div>
      <div className={styles.actions}>
        <Button onClick={() => setFilterVisible(true)}>筛选</Button>
        <Button href="/download?type=js" download="theme.js">
          下载JS
        </Button>
        <Button href="/download?type=css" download="theme.css">
          下载完整CSS
        </Button>
      </div>
      <ReactJson
        src={jsonObject}
        onEdit={onJsonEdit}
        displayDataTypes={false}
        enableClipboard={false}
        displayObjectSize={false}
        theme="monokai"
      />
      <Drawer
        placement="right"
        placement="right"
        visible={filterVisible}
        mask={false}
        width={300}
        onClose={() => setFilterVisible(false)}
        className={styles.filter}
      >
        {Object.keys(COMPONENTS).map(key => (
          <Button
            key={key}
            onClick={() => {
              let jsonObj = categoryRef.current.get(key)
              if (key === 'all') {
                jsonObj = getThemeVariables()
              }
              setJsonObject(jsonObj)
              setFilterVisible(false)
            }}
          >
            {COMPONENTS[key]}
          </Button>
        ))}
      </Drawer>
      <Drawer
        width={540}
        placement="left"
        closable={false}
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
        mask={false}
      >
        <ButtonTheme />
        <Divider />
        <FormTheme />
        <Divider />
        <MenuTheme />
        <Divider />
        <PaginationTheme />
        <Divider />
        <DatePickerTheme />
        <Divider />
        <RadioTheme />
        <Divider />
        <TransferTheme />
        <Divider />
        <InputTheme />
        <Divider />
        <SwitchTheme />
        <Divider />
        <SelectTheme />
        <Divider />
        <StepsTheme />
        <Divider />
        <TableTheme />
      </Drawer>
    </div>
  )
}
