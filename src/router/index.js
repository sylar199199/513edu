import Vue from 'vue'
import Router from 'vue-router'
import { defaultRouteMaps as routes } from '@/router/route'
import store from '@store'
import cookieUtils from '@utils/cookie'

Vue.use(Router)

const blackRouterRule = /^\/teacher/
const whiteList = ['/home', '/class', '/app-download', '/about-us']

const router = new Router({
  routes,
  // mode:process.env.VUE_APP_CURRENTMODE === 'PRODUCTION'? 'history':'hash'
  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return { x: 0, y: 0 }
  },
})

router.beforeEach(async (to, from, next) => {
  // 1 是否有cookie，存在直接进入，不存在，那么视为未登录
  const hasLoginCookie = cookieUtils.getCookie('isLogin')
  const { isLogin, userInfo } = store.state.login
  if (+hasLoginCookie) {
    if (!isLogin || !userInfo.hasOwnProperty('roleStr')) {
      const res = await store.dispatch('login/getLoginInfo')
      if (res.ok) {
        // 更新路由
        // to
        next({
          ...to,
        })
      }
    } else {
      // 不需要校验的路由直接放行
      if (!blackRouterRule.test(to.path)) {
        next()
      } else {
        // 进入需要权限校验的地方
        if (
          userInfo.roleStr
            ? userInfo.roleStr.indexOf('school:teacher') !== -1
            : ''
        ) {
          next()
        } else {
          next({
            path: '/home',
          })
        }
      }
    }
  } else {
    if (isLogin) {
      // 没有cookie 曾经登录过并且保留一些信息
      window.location.reload()
    } else {
      // 没有cookie 以及 残存的登录状态
      blackRouterRule.test(to.path) ? next('/notFound') : next()
    }
  }
})

export default router
