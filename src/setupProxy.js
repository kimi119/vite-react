const proxy = require('http-proxy-middleware')

module.exports = function setupProxy(app) {
  const proxyTargetMap = {
    '/qaApis': 'https://admin-qa002.motalk.com.cn/apis/',
    '/localhost': 'http://localhost:8080/',
    '/dlkDev': 'http://123.57.141.235:61080/apis/',
    '/mcvu': 'https://www.mcvu.net/apis/'
  }

  const { REACT_APP_PROXY } = process.env

  app.use(
    proxy(REACT_APP_PROXY, {
      target: proxyTargetMap[REACT_APP_PROXY],
      changeOrigin: true,
      pathRewrite: {
        [`^${REACT_APP_PROXY}`]: ''
      }
    })
  )
}
