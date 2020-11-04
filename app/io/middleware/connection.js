module.exports = app => {
  return async (ctx, next) => {
    ctx.socket.emit('data', 'connected!')
    await next()
    console.log('disconected!')
  }
}
