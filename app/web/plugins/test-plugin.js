const axios = require('axios')
const fs = require('fs')
const path = require('path')
const stream = require('stream')

class AssetPathTransformWebpackPlguin {
  constructor(options) {
    this.options = options
  }
  apply(compiler) {
    compiler.hooks.compilation.tap('MyTrasnformPath', compilation => {
      compilation.hooks.moduleIds.tap('MyTrasnformPath', (_, __) => {})
    })
    compiler.hooks.done.tap('MyTrasnformPath', () => {
      const { output, mode } = compiler.options
      if (mode != 'production') return
      const files = fs.readdirSync(output.path)
      for (let file of files) {
        if (/\.map$/.test(file)) {
          const optionsBuffer = Buffer.from(
            JSON.stringify(this.options) + '<@@@>',
          )
          const dataBuffer = fs.readFileSync(path.join(output.path, file))
          axios.post(
            this.options.host + '/error/save-sourcemap',
            {
              data: Buffer.concat([optionsBuffer, dataBuffer]),
            },
            {
              maxContentLength: Infinity,
              maxBodyLength: Infinity,
            },
          )
        }
      }
    })
  }
}

module.exports = AssetPathTransformWebpackPlguin
