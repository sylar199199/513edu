import Vue from 'vue'
import Vuex from 'vuex'
import createStoreWithAjax from '@/http'
import storeModules from '@store/storeMap.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    ...storeModules,
  },
})

// 将axios apis挂载到store实例上面
export default createStoreWithAjax(store)
