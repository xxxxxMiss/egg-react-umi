'use strict'

const Controller = require('egg').Controller

class DefaultController extends Controller {
  async ping() {
    const {ctx, app} = this
    const message = ctx.args[0]
    await ctx.socket.emit('res', `hi, i got you message: ${message}`)
  }
}

module.exports = DefaultController
