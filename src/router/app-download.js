const _import = require('./_import_' + process.env.VUE_APP_CURRENTMODE)

export default {
  path: '/app-download',
  component: _import('app-download/index'),
}
