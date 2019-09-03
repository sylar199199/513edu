// 生产环境使用路由懒加载
const _import = require('./_import_' + process.env.VUE_APP_CURRENTMODE)
import NewsAdvisory from './advisory.js'
import Laerning from './learning.js'
import Account from './account.js'
import Message from './message.js'
import Class from './class.js'
import Member from './member.js'
import JobWanted from './job-wanted.js'
import AppDownload from './app-download.js'
import courseManagement from './course-management.js'
import importedMaterials from './imported-materials.js'
import newCurriculum from './new-curriculum.js'
import aboutUs from './about-us.js'
import {
  criticizesSystemOne,
  testOne,
  confirmOrder,
  onlinePayment,
  purchaseSucceeds,
  applyText,
} from './common.js'

const collegeRouterMaps = [
  NewsAdvisory,
  {
    path: '/home/news-advisory/:id',
    name: 'homeNewsAdvisoryDetail',
    component: _import('home/children/Detail'),
  },
  {
    path: '/home/hot-advisory/:id',
    name: 'homeHotsAdvisoryDetail',
    component: _import('home/children/hot-detail'),
  },
  Laerning,
  newCurriculum,
  {
    path: '/home/learning/:id',
    name: 'homeLearningDetail',
    component: _import('learning/children/detail'),
  },
  Account,
  Message,
  {
    path: '/home/changeMoblie',
    name: 'homeChangeMoblie',
    component: _import('account/children/changeMoblie'),
  },
  {
    path: '/home/uploading',
    name: 'homeUploading',
    component: _import('uploading/index'),
  },
  {
    path: '/college/master-courses',
    name: 'collegeMasterCourses',
    component: _import('college/master-courses'),
  },
  {
    path: '/college/optional-courses',
    name: 'collegeOptionalCourses',
    component: _import('college/optional-courses'),
  },
  {
    path: '/college/course-detail/:id',
    name: 'collegeCourseDetail',
    component: _import('college/course-detail'),
  },
  {
    path: '/college/course-video/:id',
    name: 'collegeCourseVideo',
    component: _import('college/course-video'),
  },
  {
    path: '/test',
    name: 'test',
    component: _import('manangement/children/test'),
  },
  {
    path: '/criticizes-system',
    name: 'criticizesSystem',
    component: _import('manangement/children/criticizes-system'),
  },
  confirmOrder,
  onlinePayment,
  purchaseSucceeds,
  applyText,
  criticizesSystemOne,
  testOne,
  Class,
  Member,
  JobWanted,
  AppDownload,
  courseManagement,
  importedMaterials,
  aboutUs,
]

// 默认的路由
export const defaultRouteMaps = [
  {
    path: '/home',
    name: 'homeIndex',
    component: _import('home/index'),
    meta: { noRefresh: true },
  },
  {
    path: '/',
    redirect: '/home',
  },
  ...collegeRouterMaps,
  {
    path: '*',
    name: 'notFound',
    component: _import('not-found/index'),
  },
]

// 所有的路由，需要进行匹配，后期会开发一个方法来动态输出对应用户权限的路由列表
export const extendRouterMap = [
  {
    path: '*',
    name: 'notFound',
    component: _import('not-found/index'),
  },
]
