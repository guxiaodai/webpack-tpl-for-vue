require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}
var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig =
  process.env.NODE_ENV === 'testing'
    ? require('./webpack.prod.conf')
    : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function(compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
// Object.keys(proxyTable).forEach(function (context) {
//   var options = proxyTable[context]
//   if (typeof options === 'string') {
//     options = { target: options }
//   }
//   app.use(proxyMiddleware(options.filter || context, options))
// })

var context = config.dev.context

// target: 'http://192.168.56.221:8080/', //dev
// target: 'http://mwdevelop.hearglobal.com/', //dev
// target:"http://192.168.56.107:8080/",   //dev 吕周洋
// target: 'http://test.mwoperation.meiweishenghuo.com/', //dev
// target: 'http://192.168.88.208:8080/', //dev
// target: 'http://192.168.56.70:8080/', //dev 培州
// target: 'http://192.168.56.193:8080/', //王立楠

switch (process.env.NODE_ENV) {
  case 'local':
    var proxypath = 'http://localhost:8001'
    break
  // case 'online': var proxypath = 'http://cangdu.org:8001'; break;
  //case 'online': var proxypath = 'http://47.95.232.160:8070'; break;  //测试
  case 'online':
    var proxypath = 'http://test.pin.meiweishenghuo.com'
    break //测试

  //case 'online': var proxypath = 'http://192.168.2.153:8080'; break;  // 立楠
  // case 'online':
  //     var proxypath = 'http://10.111.12.231:5566';
  //     break; // 培州
  // case 'online': var proxypath = 'http://192.168.2.135:8080'; break; // 辛宇
  //case 'online': var proxypath = 'http://192.168.2.131:8866'; break; // 公政
  // case 'online': var proxypath = 'http://192.168.2.235:5566'; break; // 春有
  // case 'online': var proxypath = 'http://192.168.2.249:8080'; break; // 鑫磊
  //case 'online': var proxypath = 'http://127.0.0.1:8080'; break; // 本地
  //case 'online': var proxypath = 'http://192.168.0.103:5566'; break; // 吴鹏
}
var options = {
  target: proxypath,
  changeOrigin: true
}
if (context.length) {
  app.use(proxyMiddleware(context, options))
}
// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(
  config.dev.assetsPublicPath,
  config.dev.assetsSubDirectory
)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port + '/index'

var _resolve
var readyPromise = new Promise((resolve) => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
