import { defineConfig } from 'umi'
import path from 'path'

const env = process.env.NODE_ENV
const publicPath = env === 'development' ? 'http://127.0.0.1:8000/' : '/public/'

const getPath = (...paths) => path.join(process.cwd(), `app/web/${paths.join('/')}`)

export default defineConfig({
  ssr: {
    devServerRender: false,
    forceInitial: true,
  },
  locale: {
    default: 'zh-CN',
    antd: false,
    title: false,
    baseNavigator: true,
    baseSeparator: '-',
  },
  dva: {
    immer: true,
    // hmr: false,
  },
  nodeModulesTransform: {
    type: 'none',
  },
  outputPath: '../public/',
  publicPath,
  alias: {
    'pages': getPath('pages'),
    'assets': getPath('assets')
  },
  //routes: [
    //{
      //path: '/',
      //component: '@/layouts/index',
      //routes: [
        //{
          //path: '/home',
          //component: '@/pages/index',
        //},
        //{
          //path: '/user',
          //component: '@/pages/user/index',
        //},
      //],
    //},
  //],
})
