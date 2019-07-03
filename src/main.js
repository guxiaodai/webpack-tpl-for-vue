import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store/'
import VueCookie from 'vue-cookie'
// import * as Sentry from '@sentry/browser'

// Sentry.init({
//   dsn: 'https://f3fede53cd074fb393ae8b5b6f21be54@sentry.nengkuai.me/2',
//   environment: process.env.NODE_ENV || 'development',
//   // BUILD_ID 是 Jenkins 提供的环境变量，开发时 undefined
//   release: process.env.BUILD_NUMBER || 'unreleased'
// })

Vue.config.productionTip = false

Vue.config.errorHandler = function(err, vm, info) {
  //   vm.$message({
  //     type: 'error',
  //     message:
  //       err.message || (err.error && err.error.message) || '出错了，请查看控制台'
  //   })
  console.error(err)
  //   if (process.env.NODE_ENV !== 'development') {
  //     Sentry.captureException(err)
  //   }
}

Vue.use(VueCookie)

new Vue({
  el: '#app',
  router,
  //   store,
  template: '<App/>',
  components: { App }
})
