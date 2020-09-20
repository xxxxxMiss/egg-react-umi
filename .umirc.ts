import { defineConfig } from 'umi'

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  extraBabelPlugins: ['babel-plugin-auto'],
})
