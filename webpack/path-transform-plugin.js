const axios = require('axios')
const fs = require('fs')
const path = require('path')

class AssetPathTransformWebpackPlguin {
  constructor(options) {
    this.options = options
  }
  apply(compiler) {
    compiler.hooks.done.tap('MyTrasnformPath', () => {
      const { output, mode } = compiler.options
      if (mode != 'production') return
      const files = fs.readdirSync(output.path)
      for (let file of files) {
        if (/\.map$/.test(file)) {
          const dataBuffer = fs.readFileSync(path.join(output.path, file))
          axios.post(
            this.options.host + '/error/save-sourcemap',
            {
              data: dataBuffer,
              options: { ...this.options, version: 'v1', filename: file },
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
