const { Controller } = require('egg')

class HomeController extends Controller {
  async index() {
    const { ctx, app } = this
    global.host = `${ctx.request.protocol}://${ctx.request.host}`
    global.href = ctx.request.href
    console.log('============11111: ', ctx.helper.parseCookie(ctx))
    global._cookies = ctx.helper.parseCookie(ctx)
    global._navigatorLang = ctx.helper.parseNavLang(ctx)
    /**
     *  这里可以根据自己的环境配置修改，
     *  规则就是开发环境需要删除require缓存
     *  重新load文件
     *
     */
    const isDev = app.config.env != 'prod'
    let render
    if (isDev) {
      delete require.cache[require.resolve('../public/umi.server')]
      render = require('../public/umi.server')
    } else {
      render = require('../public/umi.server')
    }
    ctx.type = 'text/html'
    ctx.status = 200
    const { err, html } = await render({
      path: ctx.request.url,
      mode: 'stream',
    })

    if (err) {
      ctx.body = '404 Not Found'
      return
    }

    ctx.body = html
  }

  async user() {
    const { ctx } = this
    console.log('---client query: ', ctx.query)
    ctx.body = {
      errorCode: 0,
      result: {
        name: 'jack',
        age: 10,
      },
    }
  }
  modifyName() {
    const { ctx } = this
    ctx.logger.info('--client post data---', ctx.body)
    ctx.body = {
      errorCode: 0,
      result: true,
    }
  }

  getList() {
    const { ctx } = this
    ctx.body = {
      errorCode: 0,
      result: [
        {
          id: 1,
          name: 'Japan',
        },
        {
          id: 2,
          name: 'China',
        },
        {
          id: 3,
          name: 'USA',
        },
      ],
    }
  }

  fetchSnapshot() {
    const { ctx } = this

    ctx.body = {
      errorCode: 0,
      result: 'SNAPSHOT',
    }
  }
}

module.exports = HomeController
