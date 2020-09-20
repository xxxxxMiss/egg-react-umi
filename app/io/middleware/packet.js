module.exports = app => {
  return async(ctx, next) => {
    ctx.socket.emit('res', 'packet recevied')
    console.log('packet', ctx.packet)
    await next()
  }
}
