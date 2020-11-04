const { Controller } = require('egg')
const { Client } = require('ssh2')
const fs = require('fs')

class SSHController extends Controller {
  async index() {
    const { ctx } = this
    const conn = new Client()
    conn.on('ready', () => {
      conn.shell((err, stream) => {
        if (err) {
          ctx.logger.error(err)
          return
        }
        stream.on('data', () => {

        })
      })
    }).connect({
      host: '127.0.0.1',
      port: 22,
      privateKey: fs.readFileSync(path.join(ctx.app.baseDir(), '.dev.key'))
    })
  }
}

module.exports = SSHController
