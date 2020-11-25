const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// webpack.config.js
const webpackConfig = {
  mode: 'development',
  entry: path.join(process.cwd(), 'webpack/index.less'),
  output: {
    filename: 'bundle.js',
    path: '/',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '/bundle.css',
    }),
  ],
  resolve: {
    symlinks: false,
  },
  cache: {
    type: 'memory',
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          // {
          //   loader: 'style-loader',
          // },
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              lessOptions: {
                // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。
                modifyVars: {
                  'primary-color': '#1DA57A',
                  'link-color': '#1DA57A',
                  'border-radius-base': '2px',
                },
                javascriptEnabled: true,
              },
            },
          },
        ],
        // ...other rules
      },
    ],
  },
  // ...other config
}

const webpack = require('webpack')
const { createFsFromVolume, Volume } = require('memfs')
const mfs = createFsFromVolume(new Volume())
const compiler = webpack(webpackConfig)
compiler.outputFileSystem = mfs
compiler.watch(
  {
    aggregateTimeout: 600,
    ignored: 'node_modules/**',
  },
  (err, stats) => {
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
  },
)
