// import { checkPhone } from '@utils/base-validators'
import phone_default_img from '@assets/icon/phone_default@2x.png'
import password_default_img from '@assets/icon/password_default@2x.png'
import wooden_default_img from '@assets/icon/wooden_default@2x.png'
import { checkPhone, checkPassword, checkCode } from '@utils/base-validators.js'

const formData = {
  phone: '15116216072',
  password: '',
  code: '',
}

const formHeaderConfig = {
  title: '登录',
  rightLink: {
    text: '免费注册',
    key: 'student',
  },
}

const submitConfig = {
  text: '登录',
}

const prefixImgStyle = {
  height: '16px',
}

const prefixIStyle = {
  verticalAlign: 'middle',
  marginLeft: '6px',
  lineHeight: '45px',
}

const suffixIStyle = {
  paddingLeft: '6px',
  height: '29px',
  display: 'inline-block',
  lineHeight: '29px',
  borderLeft: '1px solid #cccccc',
}

const suffixImgStyle = {
  cursor: 'pointer',
  height: '29px',
  verticalAlign: 'middle',
}

const formConfigs = context => {
  return {
    lineStyle: false,
    labelWidth: '0',
    formItemList: [
      {
        type: 'input',
        prop: 'phone',
        placeholder: '请输入手机号码',
        prefix: {
          imgSrc: phone_default_img,
          iStyle: prefixIStyle,
          imgStyle: prefixImgStyle,
        },
      },
      {
        type: 'input',
        prop: 'password',
        placeholder: '请输入密码',
        isPassword: true,
        prefix: {
          imgSrc: password_default_img,
          iStyle: prefixIStyle,
          imgStyle: prefixImgStyle,
        },
      },
      {
        type: 'input',
        prop: 'code',
        placeholder: '请输入验证码',
        prefix: {
          imgSrc: wooden_default_img,
          iStyle: prefixIStyle,
          imgStyle: prefixImgStyle,
        },
        suffix: {
          imgSrc: context.verifiCode,
          iStyle: suffixIStyle,
          imgStyle: suffixImgStyle,
          handleLoad() {
            window.URL.revokeObjectURL(context.verifiCode)
          },
          handleClcik() {
            context.getVerifiCode()
          },
          handleError() {
            context.$message.error('验证码获取失败，请稍后重试！')
          },
        },
      },
    ],
    operate: {
      groupStyle: {
        width: '100%',
      },
      buttonList: [
        {
          type: 'primary',
          handleClick() {
            context.handleSubmit()
          },
          style: {
            width: '100%',
          },
          name: '登录',
        },
      ],
    },
  }
}

const rules = {
  phone: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { validator: checkPhone, trigger: 'blur' },
  ], // change事件在这里有一些bug，使用blur防止change默认触发
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    // { validator: checkPassword, trigger: 'blur' },
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { validator: checkCode, trigger: 'blur' },
  ],
}

export { formConfigs, formHeaderConfig, formData, rules, submitConfig }
