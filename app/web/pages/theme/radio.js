import { Radio } from 'antd'

const App = () => {
  const [value, setValue] = React.useState(1)

  const onChange = e => {
    console.log('radio checked', e.target.value)
    setValue(e.target.value)
  }

  return (
    <div id="theme-radio">
      <Radio.Group onChange={onChange} value={value}>
        <Radio value={1}>A</Radio>
        <Radio value={2}>B</Radio>
        <Radio value={3}>C</Radio>
        <Radio value={4}>D</Radio>
      </Radio.Group>
    </div>
  )
}

export default App
