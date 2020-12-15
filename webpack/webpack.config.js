const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PathTransformPlugin = require('./path-transform-plugin')
// webpack.config.js
const webpackConfig = {
  mode: 'production',
  entry: path.join(process.cwd(), 'webpack/index.js'),
  output: {
    filename: 'bundle.js',
    path: __dirname,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '/bundle.css',
    }),
    new PathTransformPlugin({
      host: 'http://localhost:3000',
    }),
  ],
  resolve: {
    symlinks: false,
  },
  cache: {
    type: 'memory',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          // {
          //   loader: 'style-loader',
          // },
          // MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              modifyVars: {
                'primary-color': '#1DA57A',
                'link-color': '#1DA57A',
                'border-radius-base': '2px',
              },
              javascriptEnabled: true,
              // lessOptions: {
              //   // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。
              // },
            },
          },
        ],
        // ...other rules
      },
      {
        test: /\.(png|jpe?g|svg)$/,
        loader: 'url-loader',
      },
    ],
  },
  // ...other config
}

const webpack = require('webpack')
const { createFsFromVolume, Volume } = require('memfs')
const mfs = createFsFromVolume(new Volume())
const compiler = webpack(webpackConfig)
// compiler.outputFileSystem = mfs
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
  // const content = mfs.readFileSync('/bundle.css', 'utf8')
})
