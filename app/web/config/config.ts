import { defineConfig } from 'umi'

const env = process.env.NODE_ENV
const path = env === 'development' ? 'http://127.0.0.1:8000/' : '/public/'

export default defineConfig({
  extraBabelPlugins: ['babel-plugin-auto'],
  ssr: {
    devServerRender: true,
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
  publicPath: path,
  routes: [
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        {
          path: '/home',
          component: '@/pages/index',
        },
        {
          path: '/user',
          component: '@/pages/user/index',
        },
      ],
    },
  ],
})
