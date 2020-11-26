export const COMPONENTS = {
  all: '全部',
  btn: '按钮',
  checkbox: '多选框',
  descriptions: '描述列表',
  dropdown: '下拉菜单',
  radio: '单选框',
  layout: '布局',
  form: '表单',
  input: '输入框',
  select: '选择器',
  cascader: '级联选择',
  anchor: '锚点',
  tooltip: '文字提示',
  popover: '气泡卡片',
  modal: '对话框',
  progress: '进度条',
  menu: '导航菜单',
  spin: '加载中',
  table: '表格',
  tag: '标签',
  picker: '日期选择器',
  calendar: '日历',
  badge: '徽标数',
  rate: '评分',
  card: '卡片',
  comment: '评论',
  tabs: '标签页',
  back: '回到顶部',
  avatar: '头像',
  switch: '开关',
  pagination: '分页',
  'page-header': '页头',
  breadcrumb: '面包屑',
  slider: '滑动输入条',
  tree: '树选择',
  collapse: '折叠面板',
  skeleton: '骨架屏',
  transfer: '穿梭框',
  message: '全局提示',
  alert: '警告提示',
  list: '列表',
  drawer: '抽屉',
  timeline: '时间轴',
  typography: '排版',
  steps: '步骤条',
  notification: '通知提醒框',
  result: '结果',
  image: '图片',
}

export const getCategorys = themeJson => {
  const categorys = new Map()
  for (let [lessVar, value] of Object.entries(themeJson)) {
    const prefix = lessVar.split('-')[0]
    if (categorys.has(prefix)) {
      categorys.get(prefix)[lessVar] = value
    } else {
      categorys.set(prefix, { [lessVar]: value })
    }
  }
  return categorys
}
