const _import = require('./_import_' + process.env.VUE_APP_CURRENTMODE)
import store from '@store'
import { $message } from '@/element'
import cookieUtils from '@utils/cookie'

// 验证登录
let verificationLogin = (to, from, next) => {
  // 1 是否有cookie，存在直接进入，不存在，那么视为未登录
  const hasLoginCookie = cookieUtils.getCookie('isLogin')
  if (hasLoginCookie) {
    next()
  } else {
    $message.error('请登录')
    store.dispatch('login/getLoginInfo')
  }
}

// 验证老师
let verificationTeacher = (to, from, next) => {
  let roleStr = store.config.state.userInfo.roleStr
  if (roleStr) {
    let authentication = roleStr.substr(7)
    if (authentication === 'teacher') {
      next()
    } else {
      $message.error('身份错误')
      next({
        path: '/home',
      })
    }
  } else {
    $message.error('请先登录')
    next({
      path: '/home',
    })
  }
}

export const criticizesSystemOne = {
  path: '/criticizes-system-one',
  component: _import('imported-materials/children/criticizes-system-one'),
  beforeEnter: verificationTeacher,
}

export const testOne = {
  path: '/test-one',
  component: _import('imported-materials/children/test-one'),
  beforeEnter: verificationTeacher,
}

export const confirmOrder = {
  path: '/confirm-order',
  component: _import('pay-pages/confirm-order'),
  beforeEnter: verificationLogin,
}

export const onlinePayment = {
  path: '/online-payment',
  component: _import('pay-pages/online-payment'),
  beforeEnter: verificationLogin,
}

export const purchaseSucceeds = {
  path: '/purchase-succeeds',
  component: _import('pay-pages/purchase-succeeds'),
  beforeEnter: verificationLogin,
}

export const applyText = {
  path: '/apply-text',
  component: _import('pay-pages/apply-text'),
  beforeEnter: verificationLogin,
}
