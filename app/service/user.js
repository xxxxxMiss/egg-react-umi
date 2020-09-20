const Service = require('egg').Service

class UserService extends Service {
   async say() {
      return 'Hello Man!';
    }
}

module.exports = UserService

