'use strict'

module.exports = appInfo => {
  const config = (exports = {})

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1513765449219_5858'

  // add your config here
  config.middleware = []

  config.proxy = true

  config.security = {
    csrf: false,
    xframe: {
      enable: false,
    },
  }

  config.logger = {
    level: 'INFO',
  }

  config.io = {
    namespace: {
      '/': {
        connectionMiddleware: ['ssh'],
        packetMiddleware: [],
      },
    },
  }

  return config
}
