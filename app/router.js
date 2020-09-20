'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, io } = app
  router.get('/api/user', controller.home.user)
  router.post('/api/modify-name', controller.home.modifyName)
  router.get('/api/getlist', controller.home.getList)
  router.get('/api/fetchSnapshot', controller.home.fetchSnapshot)
  router.get('*', controller.home.index)

   // app.io.of('/')
  io.route('chat', app.io.controller.chat.index);

  // app.io.of('/chat')
  io.of('/chat').route('chat', app.io.controller.chat.index);
}
