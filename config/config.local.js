'use strict'

module.exports = appInfo => {
  const config = (exports = {})

  config.assets = {
    publicPath: '/public/',
    devServer: {
      debug: true,
      command: 'umi dev',
      port: 8000,
      env: {
        APP_ROOT: process.cwd() + '/app/web',
        BROWSER: 'none',
        ESLINT: 'none',
        SOCKET_SERVER: 'http://127.0.0.1:8000',
        PUBLIC_PATH: 'http://127.0.0.1:8000',
      },
    },
  }

  config.logger = {
    level: 'NONE',
    consoleLevel: 'DEBUG',
  }
  return config
}
