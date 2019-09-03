const _import = require('./_import_' + process.env.VUE_APP_CURRENTMODE)
import store from '@store/modules/login/index'
import { $message } from '@/element'

export default {
  path: '/imported-materials',
  component: _import('imported-materials/index'),
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
      path: '/course-bulletin',
      component: _import('imported-materials/children/course-bulletin'),
    },
    {
      path: '/course-material',
      component: _import('imported-materials/children/course-material'),
    },
    {
      path: '/score-management',
      component: _import('imported-materials/children/score-management'),
    },
    {
      path: '/operational-analysis',
      component: _import('imported-materials/children/operational-analysis'),
    },
    {
      path: '/unit-testing',
      component: _import('imported-materials/children/unit-testing'),
    },
    {
      path: '/',
      redirect: '/course-bulletin',
    },
  ],
}
