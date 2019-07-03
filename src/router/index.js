import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const payConfirm = (r) =>
  require.ensure([], () => r(require('../pages/payConfirm')), 'payConfirm')

const routes = [
  // {
  //   path: '*', // 匹配所有未找到的路径
  //   component: NotFoundComponent
  // },
  {
    path: '/',
    component: payConfirm
  },
  {
    path: '/index',
    component: payConfirm
  },
  {
    path: '/payConfirm',
    component: payConfirm
  }
]

export default new Router({
  mode: 'history',
  base: '/youxuan/',
  routes,
  strict: process.env.NODE_ENV !== 'production'
})
