const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  devServer: {
      proxy: {
        '/api': {
          target: 'http://124.93.196.45:10001', // 改成你的后端地址
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''  // 去掉/api前缀
          }
        }
      }
    }
})

