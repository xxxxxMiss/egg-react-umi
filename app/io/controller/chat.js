const Controller = require('egg').Controller

class ChatController extends Controller {
  async msg() {
    const message = this.ctx.args[0]
    console.log(this.ctx.args, '------------args')
    const say = await this.ctx.service.user.say()
    this.ctx.socket.emit('data', say)
  }
}

module.exports = ChatController
