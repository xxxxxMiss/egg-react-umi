const { Controller } = require('egg')
const less = require('less')
class ThemeController extends Controller {
  async compileStyle() {
    const { ctx } = this
    console.log(ctx.args)
    const lessContent = ctx.helper.getLessText(ctx)
    // root = less.parse(lessContent)
    const start = Date.now()
    less
      .render(lessContent, {
        javascriptEnabled: true,
      })
      .then(output => {
        console.log(`[Less compiled]: ${(Date.now() - start) / 1000}s`)
        ctx.socket.emit('compiledResult', output.css)
      })
  }
}

module.exports = ThemeController
