import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import qs from 'qs'
import axios from 'axios'

import { sync } from 'vuex-router-sync'

// import '@plugins/filters'
import '@/directive/global'
// reset.css
import '@assets/reset/index.css'
import '@assets/less/global.less'
import '@/element'
import '@components'

import { imgUrl } from '@/utils/img-url.js'
Vue.prototype.$imgUrl = imgUrl

sync(store, router, { moduleName: 'route' })

Vue.prototype.$qs = qs

axios.defaults.withCredentials = true

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
