const _import = require('./_import_' + process.env.VUE_APP_CURRENTMODE)
import store from '@store/modules/login/index'
import { $message } from '@/element'
import cookieUtils from '@utils/cookie'

export default {
  path: '/home/learning',
  component: _import('learning/index'),
  beforeEnter: (to, from, next) => {
    const hasLoginCookie = cookieUtils.getCookie('isLogin')
    if (hasLoginCookie) {
      let roleStr = store.config.state.userInfo.roleStr
      if (roleStr) {
        let authentication = roleStr.substr(7)
        if (
          authentication === 'teacher' ||
          authentication === 'student' ||
          roleStr === 'normal'
        ) {
          next()
        } else {
          $message.error('身份错误')
          next({
            path: '/home',
          })
        }
      } else {
        $message.error('身份错误')
        next({
          path: '/home',
        })
      }
    } else {
      $message.error('请登录')
      next({
        path: '/home',
      })
    }
  },
  children: [
    {
      path: 'curriculum',
      component: _import('learning/children/curriculum'),
      meta: { tabNumber: 0 },
    },
    {
      path: 'account',
      component: _import('learning/children/account'),
      meta: { tabNumber: 2 },
    },
    {
      path: 'regulate',
      component: _import('learning/children/regulate'),
      meta: { tabNumber: 3 },
    },
    {
      path: 'analyze',
      component: _import('learning/children/analyze'),
      meta: { tabNumber: 4 },
    },
    {
      path: '/',
      redirect: '/home/learning/curriculum',
    },
  ],
}
