const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('@components', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@assets', resolve('src/assets'))
      .set('@common', resolve('src/common'))
      .set('@api', resolve('src/api'))
      .set('@utils', resolve('src/utils'))
  }
}
