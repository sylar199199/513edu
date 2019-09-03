import * as types from './mutation-types'

export default {
  // 验证码
  [types.SET_VERIFICODE](state, { verifiCode }) {
    state.verifiCode = window.URL.createObjectURL(verifiCode)
  },

  [types.SET_ISLOGIN](state, { isLogin }) {
    state.isLogin = isLogin
  },
  // modal框判定
  [types.SET_SHULD_LOGIN_FORM_SHOW](state, { shuldLoginFormShow }) {
    state.shuldLoginFormShow = shuldLoginFormShow
  },
  // 登陆表单类型
  [types.SET_LOGIN_FORM_TYPE](state, loginFormType) {
    state.loginFormType = loginFormType
  },
  // 登陆用户信息
  [types.SET_USER_INFO](state, { userInfo }) {
    state.userInfo = userInfo
  },

  // 更改仓库中的手机号码mobilePhone
  setMobilePhone(state, newMobilePhone) {
    state.mobilePhone = newMobilePhone
  },

  // 更改仓库中的手机号码，密码
  setRegAll(state, newPassword) {
    state.password = newPassword
  },

  // 控制用户名编辑状态为true
  getNameTrueCompile(state) {
    state.nameIsShow = true
  },

  // 控制用户名编辑状态为false
  getNameFalseCompile(state) {
    state.nameIsShow = false
  },

  // 控制头像编辑状态为true
  getHeadTrueCompile(state) {
    state.headIsShow = true
  },

  // 控制头像编辑状态为false
  getHeadFalseCompile(state) {
    state.headIsShow = false
  },

  // 控制性别编辑状态为true
  getSexrueCompile(state) {
    state.sexIsShow = true
  },

  // 更新用户名称
  [types.SET_USERNAME](state, { author }) {
    state.userInfo.name = author
    state.isShowSave = false
    state.nameIsShow = false
  },

  // 更新用户头像
  [types.SET_HEAD](state) {
    state.headIsShow = false
  },

  // 更新用户性别
  [types.SET_SEX](state) {
    state.sexIsShow = false
  },

  // 验证active为1是是否可以进入下一步
  [types.SET_SENDCODE_ACTIVE_ONE](state) {
    state.nextActiveone = true
  },

  // 验证active为2是是否可以进入下一步
  [types.SET_SENDCODE_ACTIVE_TWO](state) {
    state.nextActivetwo = true
  },

  // 控制基本信息中实名认证的显示隐藏
  [types.SET_ATTESTATIONSHOW](state) {
    state.attestationShow = false
  },

  // 控制基本信息中实名认证的显示隐藏
  setattestationhide(state) {
    state.attestationShow = true
  },

  // 获取基本信息中实名认证的信息
  [types.SET_AFINDUSER_ROLEINFO](state, { accountStudent }) {
    ;(state.accountStudent = accountStudent), (state.attestationShow = false)
    /* state.accountStudent = newAccountStudent,
    state.attestationShow = false */
  },

  // 院校选修课程
  [types.SET_SCHOOL_TAKELIST](state, { schoolTakeList }) {
    state.schoolTakeList = schoolTakeList
  },

  // 院校课程首页
  [types.SET_SCHOOL_HOMELIST](state, { homeSchoolList, schoolimages }) {
    state.homeSchoolList = homeSchoolList
    state.schoolimages = schoolimages
  },
}
