import { Pagination } from 'antd'

export default function PaginationTheme() {
  function onShowSizeChange(current, pageSize) {
    console.log(current, pageSize)
  }
  function onChange(pageNumber) {
    console.log('Page: ', pageNumber)
  }
  return (
    <div id="theme-pagination">
      <Pagination defaultCurrent={6} total={500} />
      <br />
      <Pagination
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
        defaultCurrent={3}
        total={500}
      />
      <br />
      <Pagination
        showQuickJumper
        defaultCurrent={2}
        total={500}
        onChange={onChange}
        disabled
      />
    </div>
  )
}
