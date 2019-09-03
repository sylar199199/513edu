import axios from 'axios'
import apis from '@/http/apis.js'
import Ajax from '@/http/ajax.js'

const base_configs = {
  baseURL: process.env.VUE_APP_BASE_URL, // api的base_url
  timeout: 5000, // 请求超时时间
}

export default store => {
  store.$apis = apis
  store.$ajax = new Ajax(store.commit, axios, base_configs)
  return store
}
