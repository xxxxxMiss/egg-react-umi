const { Controller } = require('egg')
const webpack = require('webpack')
const webpackConfig = require('../../webpack/webpack.config')
const { createFsFromVolume, Volume } = require('memfs')
const mfs = createFsFromVolume(new Volume())
const lessOptions = webpackConfig.module.rules[0].use[2].options.lessOptions

class ThemeController extends Controller {
  async compileStyle() {
    const { ctx } = this
    console.log(ctx.args)
    lessOptions.modifyVars = ctx.args[0]
    console.log(webpackConfig)
    const compiler = webpack(webpackConfig)
    compiler.outputFileSystem = mfs
    compiler.run((err, stats) => {
      if (err || stats.hasErrors()) {
        console.log(
          err ||
            stats.toString({
              colors: true,
            }),
        )
        return
      }
      console.log(
        stats.toString({
          colors: true,
        }),
      )
      const content = mfs.readFileSync('/bundle.css', 'utf8')
      ctx.socket.emit('compiledResult', content)
    })
  }
}

module.exports = ThemeController
