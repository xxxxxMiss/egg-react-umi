import { Switch } from 'antd'

function onChange(checked) {
  console.log(`switch to ${checked}`)
}

export default function SwitchTheme() {
  return (
    <div id="theme-switch">
      <Switch defaultChecked onChange={onChange} />
    </div>
  )
}
