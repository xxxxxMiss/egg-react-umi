exports.isMobile = ctx => {
  const source = ctx.get('user-agent') || ''
  let isMobile = false
  if (/mobile|android|iphone|ipad|phone/i.test(source)) {
    isMobile = true
  }
  return isMobile
}

exports.parseCookie = ctx => {
  let cookies = ctx.get('cookie')
  if (!cookies) {
    return []
  }
  cookies = cookies.split(';')
  const res = {}
  for (const item of cookies) {
    const kv = item.split('=')
    if (kv && kv.length > 0) {
      res[kv[0].trim()] = decodeURIComponent(kv[1])
    }
  }
  return res
}

exports.parseNavLang = ctx => {
  // 服务端无法获取navigator.language，所以只能通过Accept-Language来判断浏览器语言。
  let navigatorLang
  const clientLang = ctx.get('Accept-Language')
  if (clientLang.startsWith('zh')) {
    navigatorLang = 'zh-CN'
  } else if (clientLang.startsWith('en')) {
    navigatorLang = 'en-US'
  }
  return navigatorLang
}

const readline = require('readline')
const fs = require('fs')
const path = require('path')
const antd = `
@import 'node_modules/antd/lib/style/themes/default.less';
@import 'node_modules/antd/dist/antd.less'; // 引入官方提供的 less 样式入口文件
`
exports.writeLessWithStream = ctx => {
  const ws = fs.createWriteStream(
    path.join(ctx.app.config.baseDir, 'webpack/index.less'),
  )
  const rl = readline.createInterface({
    output: ws,
    terminal: false,
  })
  rl.write(antd)
  const data = ctx.args[0]
  Object.keys(data).forEach(key => {
    rl.write(`@${key}: ${data[key]};`)
  })
  rl.close()
}

exports.getLessText = ctx => {
  const data = ctx.args[0]
  return Object.keys(data).reduce((less, key) => {
    less += `@${key}: ${data[key]};`
    return less
  }, antd)
}
