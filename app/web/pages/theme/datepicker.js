import { DatePicker, Space } from 'antd'

const { RangePicker } = DatePicker

export default function DatePickerTheme() {
  return (
    <div id="theme-picker">
      <Space direction="vertical" size={12}>
        <RangePicker />
        <RangePicker showTime />
        <RangePicker picker="week" />
        <RangePicker picker="month" />
        <RangePicker picker="year" />
      </Space>
    </div>
  )
}
