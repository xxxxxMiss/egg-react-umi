const { Controller } = require('egg')
const { Client } = require('ssh2')
const fs = require('fs')
const path = require('path')

const conn = new Client()

class SSHController extends Controller {
  async data() {
    const { ctx } = this
    const privateKey = fs.readFileSync(path.join(ctx.app.baseDir, '.dev.key'))
    conn
      .on('ready', () => {
        conn.shell((err, stream) => {
          if (err) {
            console.error(err)
            ctx.logger.error(err)
            return
          }
          stream.write(ctx.args[0])
          stream.on('data', msg => {
            ctx.socket.emit('data', msg.toString('utf8'))
            console.log(msg.toString('utf8'))
          })
        })
      })
      .connect({
        host: '172.17.3.128',
        port: 22,
        username: 'cjd',
        privateKey,
      })
  }
}

module.exports = SSHController
