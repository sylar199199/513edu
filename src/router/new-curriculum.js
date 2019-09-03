const _import = require('./_import_' + process.env.VUE_APP_CURRENTMODE)
import store from '@store/modules/login/index'
import { $message } from '@/element'

export default {
  path: '/new-curriculum',
  component: _import('new-curriculum/index'),
  beforeEnter: (to, from, next) => {
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
  },
  children: [
    {
      path: 'summary-Info',
      component: _import('new-curriculum/children/summary-Info'),
    },
    {
      path: 'team-teachers',
      component: _import('new-curriculum/children/team-teachers'),
    },
    {
      path: 'content-design',
      component: _import('new-curriculum/children/content-design'),
    },
    {
      path: 'assessment-criterion',
      component: _import('new-curriculum/children/assessment-criterion'),
    },
    {
      path: '/',
      redirect: '/new-curriculum/summary-Info',
    },
  ],
}
