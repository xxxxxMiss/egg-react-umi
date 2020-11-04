module.exports = app => {
  return async(ctx, next) => {
    ctx.socket.emit('data', 'packet recevied')
    console.log('----packet----', ctx.packet, ctx.args)
    await next()
  }
}
