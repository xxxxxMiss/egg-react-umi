const { Controller } = require('egg')
const fs = require('fs')
const path = require('path')

class ThemeController extends Controller {
  async download() {
    const { ctx } = this
    const { type } = ctx.query
    if (type === 'js') {
      ctx.body = fs.createReadStream(
        path.join(ctx.app.config.baseDir, 'app/data/theme.js'),
      )
    }
    if (type === 'css') {
      ctx.body = fs.createReadStream(
        path.join(ctx.app.config.baseDir, 'app/data/theme.css'),
      )
    }
  }
}

module.exports = ThemeController
