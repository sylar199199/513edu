const _import = require('./_import_' + process.env.VUE_APP_CURRENTMODE)

export default {
  path: '/job-wanted',
  component: _import('job-wanted/index'),
}
