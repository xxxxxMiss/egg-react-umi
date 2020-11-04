'use strict'

const { Client } = require('ssh2')
const fs = require('fs')
const path = require('path')

const conn = new Client()

module.exports = () => {
  return async (ctx, next) => {
    const privateKey = fs.readFileSync(path.join(ctx.app.baseDir, '.dev.key'))
    conn
      .on('ready', () => {
        conn.shell((err, stream) => {
          if (err) {
            ctx.logger.error(err)
            return
          }
          ctx.socket.on('data', data => {
            stream.write(data)
          })
          stream.on('data', msg => {
            ctx.socket.emit('data', msg.toString('utf8'))
          })
        })
      })
      .connect({
        host: '172.17.3.128',
        port: 22,
        username: 'cjd',
        privateKey,
      })

    await next()
  }
}
