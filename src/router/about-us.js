const _import = require('./_import_' + process.env.VUE_APP_CURRENTMODE)

export default {
  path: '/about-us',
  component: _import('about-us/index'),
}
