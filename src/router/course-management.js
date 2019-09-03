const _import = require('./_import_' + process.env.VUE_APP_CURRENTMODE)
import store from '@store/modules/login/index'
import { $message } from '@/element'
import cookieUtils from '@utils/cookie'

export default {
  path: '/course-management',
  component: _import('course-management/index'),
  beforeEnter: (to, from, next) => {
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
      $message.error('请先登录')
      next({
        path: '/home',
      })
    }
  },
  children: [
    {
      path: 'course-bulletin',
      component: _import('course-management/children/course-bulletin'),
    },
    {
      path: 'course-material',
      component: _import('course-management/children/course-material'),
    },
    {
      path: 'unit-testing',
      component: _import('course-management/children/unit-testing'),
    },
    {
      path: 'operational-analysis',
      component: _import('course-management/children/operational-analysis'),
    },
    {
      path: 'score-management',
      component: _import('course-management/children/score-management'),
    },
    {
      path: 'study-analysis',
      component: _import('course-management/children/study-analysis'),
    },
    {
      path: 'trainees-management',
      component: _import('course-management/children/trainees-management'),
    },
    {
      path: '/test-manangement',
      component: _import('manangement/test-manangement'),
    },
    {
      path: '/single-questions',
      component: _import('manangement/single-questions'),
    },
    {
      path: '/',
      redirect: '/course-management/course-bulletin',
    },
  ],
}
