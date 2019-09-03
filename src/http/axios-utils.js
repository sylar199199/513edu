import { $message } from '@/element'
import cookieUtils from '@utils/cookie'
import store from '@store'
import {
  SET_SHULD_LOGIN_FORM_SHOW,
  SET_LOGIN_FORM_TYPE,
} from '@store/modules/login/mutation-types'

class AxiosUtils {
  constructor($commit) {
    this.commit = $commit
    // http code
    this.httpErrorCode = {}
    // service code
    this.serviceErrorCode = new Map([
      [-1001, '请登录！'],
      [-6, '您没有权限访问!'],
      [-1, '请求失败，请稍后重试'],
      [-2, '校验未通过'],
      [-3, '插入数据异常'],
      [-4, '请勿重复提交'],
      [-5, '验证码错误!'],
      [-9999, '系统繁忙,请稍后重试!'],
    ])
    // 截流池
    this.throttleKeyArr = []
    // 设置接触初始限制
    this.throttleCountCeil = 3
  }
  // 节流处理
  throttle = params => {
    const throttleFound = this.throttleKeyArr.find(
      item => item.key === params.throttle,
    )
    // 不存在节流key
    if (!throttleFound) {
      this.throttleKeyArr.push({
        key: params.throttle,
        time: +new Date(),
        times: 0,
      })
    } else {
      const now_time = +new Date()
      const { time, times } = throttleFound
      if (times >= this.throttleCountCeil && now_time - time < 1000) {
        return Promise.reject({
          msg: '您的请求过于频繁，请稍后重试',
          data: null,
          throttle: true,
        })
      }
      // 更新节流数组匹配数据的时间
      throttleFound.time = now_time
      if (times < this.throttleCountCeil) throttleFound.times += 1
    }
    delete params.throttle
    return Promise.resolve({ ...params })
  }

  netWorkError = error => {
    // 断网 或者 请求超时 或者是节流 状态
    if (!error.response) {
      let msg = ''
      const message = error.hasOwnProperty('message')
        ? error.message
        : error.msg
      if (error.throttle) {
        msg += message
      } else if (message.includes('timeout')) {
        msg += '请求超时，请检查网络是否连接正常'
      } else {
        msg += '请求失败，请检查网络是否已连接'
      }
      return Promise.reject({
        msg,
        data: null,
      })
    }
    const responseCode = error.response.code
    //响应错误处理
    console.log('error', 'code:' + responseCode)
    console.log(error)
    console.log(JSON.stringify(error))

    // TODO: 暂时先不处理其它的http错误 400等错误
    // ......
    // ......
    // ......
    return Promise.reject(error)
  }

  requestProcessing = async (res, type) => {
    const code = res.data.code
    if (code === -1001) {
      // 删除cookie
      cookieUtils.setCookie('isLogin', 0, -1)
    }
    switch (code) {
      case 1:
        return Promise.resolve({
          ok: true,
          data: res.data.data,
        })
        break
      case -1001:
        // 1: store 存在userInfo 刷新
        $message.error(this[type].get(code))
        // 添加刷新的cookie 用于刷新之后进行判断是否已经刷新
        cookieUtils.setCookie('hasRefresh', 1, 1)
        //TODO: 清除user、permission以及菜单路由
        const { isLogin, userInfo } = store.state.login
        if (isLogin && userInfo.hasOwnProperty('name')) {
          window.location.reload()
        } else {
          // 之前未登录，调出modal
          this.commit(`login/${SET_LOGIN_FORM_TYPE}`, 'login')
          this.commit(`login/${SET_SHULD_LOGIN_FORM_SHOW}`, {
            shuldLoginFormShow: true,
          })
        }
        return Promise.reject(res)
        break
      // 重复登陆关闭modal框
      case -1002:
        this.commit(`login/${SET_SHULD_LOGIN_FORM_SHOW}`, {
          shuldLoginFormShow: false,
        })
      default:
        return Promise.reject(res)
        break
    }
  }

  allResponseErrorProcessing = error => {
    const message =
      (this._isObject(error) && error.hasOwnProperty('data') && error.msg) ||
      error.data.msg ||
      '请求失败，请稍后重试'
    $message.error(message)
    return {
      ok: false,
      data: error.data,
      message,
    }
  }

  /**
   * 判断是否是对象
   *
   * @param {*} obj 判断的对象
   * @returns
   */
  _isObject = obj => {
    return obj && typeof obj === 'object'
  }
}

export default AxiosUtils
