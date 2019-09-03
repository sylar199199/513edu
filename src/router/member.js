const _import = require('./_import_' + process.env.VUE_APP_CURRENTMODE)

export default {
  path: '/member',
  component: _import('member/index'),
}
