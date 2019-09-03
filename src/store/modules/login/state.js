export default {
  verifiCode: null, // 验证码
  shuldLoginFormShow: false,
  loginFormType: 'login', // <'login'|'regist'|'authentication_student'|'authentication_teacher'|'authentication_company'>
  userInfo: {}, // 用户信息
  isShowSave: true,
  isLogin: false, // 是否登录
  mobilePhone: '', // 注册手机号码
  password: '', // 注册密码
  nextActiveone: false,
  nextActivetwo: false,
  attestationShow: true,
  headIsShow: false, //控制头像是否为编辑状态
  nameIsShow: false, //控制用户名是否为编辑状态
  sexIsShow: false, //控制性别是否为编辑状态
  accountStudent: {}, //实名认证的个人信息
  schoolTakeList: '',
  homeSchoolList: [],
  schoolimages: {},
}
