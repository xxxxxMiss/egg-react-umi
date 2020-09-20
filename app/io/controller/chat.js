const Controller = require('egg').Controller

class ChatController extends Controller {
  async index() {
    const message = this.ctx.args[0]
    console.log('chat :', message + ' : ' + process.pid)
    const say = await this.ctx.service.user.say()
    this.ctx.socket.emit('res', say)
  }
}

module.exports = ChatController
