const _import = require('./_import_' + process.env.VUE_APP_CURRENTMODE)

export default {
  path: '/home/changeMoblie',
  name: 'homeChangeMoblie',
  component: _import('account/children/changeMoblie'),
  children: [
    {
      path: 'certification',
      component: _import('account/children/certification'),
    },
    {
      path: 'amend',
      component: _import('account/children/amend'),
    },
    {
      path: 'prosperity',
      component: _import('account/children/prosperity'),
    },
    {
      path: '/',
      redirect: '/home/changeMoblie/certification',
    },
  ],
}
