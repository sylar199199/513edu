import * as types from './mutation-types'
import { $message } from '@/element'
import cookieUtils from '@utils/cookie'

export default {
  /**
   * login登陆
   * accountData {code:验证码, account:账户, password:密码}
   */
  async login({ commit, dispatch }, accountData) {
    const res = await this.$ajax.post(this.$apis.login, accountData)
    if (res.ok) {
      $message.success('登陆成功')
      // 关闭modal
      commit({
        type: types.SET_SHULD_LOGIN_FORM_SHOW,
        shuldLoginFormShow: false,
      })
      // 获取登陆用户信息
      dispatch('getLoginInfo')
    } else if (res.data && res.data.code === -1002) {
      // 重复登陆 -1002
      dispatch('getLoginInfo')
    }
  },

  // 忘记密码
  async resetLoginPassword({ commit }, resetLoginPwdReqObj) {
    const res = await this.$ajax.post(this.$apis.resetLoginPassword, {
      mobile: resetLoginPwdReqObj.mobile,
      mobileCode: resetLoginPwdReqObj.mobileCode,
      newPwd: resetLoginPwdReqObj.newPwd,
    })
    if (res.ok) {
      $message.success('密码重置成功')
      commit({
        type: types.SET_SHULD_LOGIN_FORM_SHOW,
        shuldLoginFormShow: false,
      })
    } else {
      $message.error(res.message)
    }
  },

  // 获取图形验证码
  async getVerifiCode({ commit }) {
    const res = await this.$ajax.getBlob(this.$apis.getVerifiCode, true, {
      throttle: 'verifiCode',
    })
    if (res.ok) {
      commit({
        type: types.SET_VERIFICODE,
        verifiCode: res.data,
      })
    }
  },

  // 获取用户信息
  async getLoginInfo({ commit }) {
    const res = await this.$ajax.get(this.$apis.getLoginInfo)
    if (res.ok) {
      // 更新cookie
      cookieUtils.setCookie('isLogin', 1, 30)
      commit({
        type: types.SET_USER_INFO,
        userInfo: res.data,
      })
      commit({
        type: types.SET_ISLOGIN,
        isLogin: true,
      })
    }
    return res
  },

  // 更新存储人脸识别头像
  async getUploadRecognitionPhoto({ dispatch }, photoPath) {
    const res = await this.$ajax.post(this.$apis.getUploadRecognitionPhoto, {
      photoPath,
    })
    if (res.ok) {
      $message.success('上传成功')
      dispatch('getLoginInfo')
    } else {
      $message.error('上传失败')
    }
  },

  // 登出
  async loginOut() {
    const res = await this.$ajax.get(this.$apis.loginOut)
    if (res.ok) {
      $message.success('成功登出，正在前往首页')
      cookieUtils.setCookie('isLogin', 0, -1)
      window.location.reload()
    }
  },

  // 获取手机验证码
  async sendCodeForMobile({ state, commit }) {
    const res = await this.$ajax.post(this.$apis.getCodeForMobile, {
      mobile: state.mobilePhone,
      type: 1,
    })
  },

  // 注册
  async register({ state, commit }, code) {
    const res = await this.$ajax.post(this.$apis.register, {
      mobile: state.mobilePhone,
      mobileCode: code,
      password: state.password,
    })
    if (res.ok) {
      $message.success('注册成功')
      // 关闭modal
      commit({
        type: types.SET_SHULD_LOGIN_FORM_SHOW,
        shuldLoginFormShow: false,
      })
    }
  },

  // 修改用户密码
  async getUpdatePassword({ commit }, ruleForm) {
    const res = await this.$ajax.post(this.$apis.getUpdatePassword, {
      confirmNewPwd: ruleForm.checkPass,
      newPassword: ruleForm.pass,
      password: ruleForm.oldPassword,
    })
    console.log(res)
    if (res.ok) {
      $message.success('密码修改成功')
      return true
    } else {
      $message.error(res.msg)
      return false
    }
  },

  // 更新用户名称
  async getUpdateUserName({ state, commit }, author) {
    const res = await this.$ajax.post(this.$apis.getUpdateUserName, {
      userName: author,
    })
    if (res.ok) {
      $message.success('修改成功')
      commit({
        type: types.SET_USERNAME,
        author: author,
        nameIsShow: false,
      })
    }
  },

  // 更换用户头像
  async getUploadUserPhoto({ state, commit }, updataUrl) {
    const res = await this.$ajax.post(this.$apis.getUploadUserPhoto, {
      photoPath: updataUrl,
    })
    if (res.ok) {
      $message.success('修改成功')
      commit({
        type: types.SET_HEAD,
        headIsShow: false,
      })
    }
  },

  // 更新用户性别
  async getUpdateSex({ commit, state }, newGender) {
    const res = await this.$ajax.post(this.$apis.getUpdateSex, {
      sex: newGender,
    })
    if (res.ok) {
      $message.success('修改成功')
      commit({
        type: types.SET_SEX,
        sexIsShow: false,
      })
    }
  },

  // 修改手机号验证旧手机
  async sendCodeForOldMobile({ state, commit }, oldPhone) {
    const res = await this.$ajax.post(this.$apis.getCodeForMobile, {
      mobile: oldPhone,
      type: 2,
    })
  },

  // 忘记密码发送验证码
  async forgetThePassword({ state, commit }, oldPhone) {
    const res = await this.$ajax.post(this.$apis.getCodeForMobile, {
      mobile: oldPhone,
      type: 4,
    })
  },

  // 验证修改手机号验证旧手机
  async getVerifyCodeForOldMobile({ state, commit }, oldCode) {
    const res = await this.$ajax.post(this.$apis.getVerifyCodeForMobile, {
      mobile: state.userInfo.mobile,
      mobileCode: oldCode,
      saveVerifyCache: true,
      type: 2,
    })
    if (res.ok) {
      $message.success('验证成功')
      commit({
        type: types.SET_SENDCODE_ACTIVE_ONE,
        nextActiveone: true,
      })
    }
    return res.ok
  },

  // 修改手机号换绑新手机;
  async sendCodeForNewMobile({ state, commit }, newPhone) {
    const res = await this.$ajax.post(this.$apis.getCodeForMobile, {
      mobile: newPhone,
      type: 3,
    })
  },

  // 验证修改手机号验证旧手机
  async getVerifyCodeForNewMobile({ state, commit }, obj) {
    const res = await this.$ajax.post(this.$apis.getVerifyCodeForMobile, {
      mobile: obj.phone,
      mobileCode: obj.code,
      saveVerifyCache: true,
      type: 3,
    })
    if (res.ok) {
      $message.success('验证成功')
      commit({
        type: types.SET_SENDCODE_ACTIVE_TWO,
        nextActivetwo: true,
      })
    }
    return res.ok
  },

  //更新手机号
  async getUpdateMobile({ commit }, newObj) {
    const res = await this.$ajax.post(this.$apis.getUpdateMobile, {
      mobile: newObj.phone,
      mobileCode: newObj.code,
    })
    if (res.ok) {
      $message.success('修改成功')
      commit({
        type: types.SET_SENDCODE_ACTIVE_TWO,
        nextActivetwo: true,
      })
    }
    return res.ok
  },

  // 学生认证
  async getIdentityAuth({ commit, state, dispatch }, attestationObj) {
    const res = await this.$ajax.post(this.$apis.getIdentityAuth, {
      code: attestationObj.code,
      identityId: attestationObj.studentId,
      name: attestationObj.realName,
      sourceSign: attestationObj.school,
      type: 1,
    })
    if (res.ok) {
      $message.success('认证成功')
      commit({
        type: types.SET_ATTESTATIONSHOW,
        attestationShow: false,
      })
      // 关闭modal
      commit({
        type: types.SET_SHULD_LOGIN_FORM_SHOW,
        shuldLoginFormShow: false,
      })
      dispatch('getFindUserRoleInfo')
    } else if (res.data.code === -5) {
      dispatch('getVerifiCode')
    } else {
      // 关闭modal
      commit({
        type: types.SET_SHULD_LOGIN_FORM_SHOW,
        shuldLoginFormShow: false,
      })
    }
  },

  // 老师认证
  async getTeacherIdentityAuth({ commit, state, dispatch }, attestationObj) {
    const res = await this.$ajax.post(this.$apis.getIdentityAuth, {
      code: attestationObj.code,
      identityId: attestationObj.studentId,
      name: attestationObj.realName,
      sourceSign: attestationObj.school,
      type: 2,
    })
    if (res.ok) {
      $message.success('认证成功')
      commit({
        type: types.SET_ATTESTATIONSHOW,
        attestationShow: false,
      })
      // 关闭modal
      commit({
        type: types.SET_SHULD_LOGIN_FORM_SHOW,
        shuldLoginFormShow: false,
      })
      dispatch('getFindUserRoleInfo')
    } else if (res.data.code === -5) {
      dispatch('getVerifiCode')
    } else {
      // 关闭modal
      commit({
        type: types.SET_SHULD_LOGIN_FORM_SHOW,
        shuldLoginFormShow: false,
      })
    }
  },

  //认证成功用户信息
  async getFindUserRoleInfo({ commit, state }) {
    const res = await this.$ajax.get(this.$apis.getFindUserRoleInfo)
    if (res.ok) {
      commit({
        type: types.SET_AFINDUSER_ROLEINFO,
        accountStudent: res.data,
        attestationShow: false,
      })
    }
  },

  // 院校课程首页
  async getSchoolTakeList({ commit, state }, sign) {
    const res = await this.$ajax.post(this.$apis.getSchoolTakeList, {
      sign: sign,
    })
    if (res.ok) {
      commit({
        type: types.SET_SCHOOL_TAKELIST,
        schoolTakeList: res.data,
      })
    }
  },

  // 院校课程首页
  async getSchoolList({ commit, state }, sign) {
    const res = await this.$ajax.post(this.$apis.getSchoolList, {
      sign: sign,
    })
    if (res.ok) {
      commit({
        type: types.SET_SCHOOL_HOMELIST,
        homeSchoolList: res.data.schoolVoList,
        schoolimages: res.data.schoolImages,
      })
    }
  },
}
