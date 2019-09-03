const _import = require('./_import_' + process.env.VUE_APP_CURRENTMODE)

export default {
  path: '/class',
  component: _import('home-class/index'),
}
