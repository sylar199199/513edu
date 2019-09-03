const _import = require('./_import_' + process.env.VUE_APP_CURRENTMODE)

export default {
  path: '/home/news-advisory',
  component: _import('home/news-advisory'),
  children: [
    {
      path: 'business',
      component: _import('home/children/Business'),
    },
    {
      path: 'industry',
      component: _import('home/children/Industry'),
    },
    {
      path: '/',
      redirect: '/home/news-advisory/business',
    },
  ],
}
