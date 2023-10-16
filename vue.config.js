const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false // 禁用生成源映射文件，从而防止在控制台中看到源码的详细信息
})
