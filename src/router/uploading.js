const _import = require('./_import_' + process.env.VUE_APP_CURRENTMODE)

export default {
  path: '/home/uploading',
  component: _import('uploading/index'),
  children: [
    {
      path: 'summaryInfo',
      component: _import('uploading/page/summary-Info'),
    },
    {
      path: '/',
      redirect: '/home/uploading/summaryInfo',
    },
  ],
}
