const _import = require('./_import_' + process.env.VUE_APP_CURRENTMODE)
import { $message } from '@/element'
import cookieUtils from '@utils/cookie'

export default {
  path: '/home/account',
  name: 'homeAccount',
  component: _import('account/index'),
  beforeEnter: (to, from, next) => {
    // 1 是否有cookie，存在直接进入，不存在，那么视为未登录
    const hasLoginCookie = cookieUtils.getCookie('isLogin')
    if (hasLoginCookie) {
      next()
    } else {
      $message.error('请登录')
      next({
        path: '/home',
      })
    }
  },
}
