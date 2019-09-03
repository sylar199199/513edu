import Vue from 'vue'
import store from '@store'
import {
  SET_SHULD_LOGIN_FORM_SHOW,
  SET_LOGIN_FORM_TYPE,
} from '@store/modules/login/mutation-types'

// 全局登陆或者注册自定义指令
Vue.directive('login-in', {
  inserted: (el, bind) => {
    el.addEventListener('click', () => {
      store.commit(`login/${SET_LOGIN_FORM_TYPE}`, bind.value)
      store.commit(`login/${SET_SHULD_LOGIN_FORM_SHOW}`, {
        shuldLoginFormShow: true,
      })
    })
  },
})
