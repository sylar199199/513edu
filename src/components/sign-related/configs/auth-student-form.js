// import { checkPhone } from '@utils/base-validators'
import school_default_img from '@assets/icon/school_default@2x.png'
import teacher_default_img from '@assets/icon/teacher_icon@2x.png'
import number_default_img from '@assets/icon/number_default@2x.png'
import wooden_default_img from '@assets/icon/wooden_default@2x.png'
import { checkName, checkWorkers, checkCode } from '@utils/base-validators.js'

const formData = {
  school: '',
  realName: '',
  studentId: '', //TODO: Number or String
  code: '',
}

const formHeaderConfig = {
  title: '我要认证',
  rightLink: {
    text: '在校学生认证',
    key: 'student',
  },
}

const submitConfig = {
  text: '认证',
}

const prefixImgStyle = {
  height: '14px',
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
        type: 'select',
        prop: 'school',
        placeholder: '请选择所在学校',
        default: '',
        optList: context.allSchool,
        prefix: {
          imgSrc: school_default_img,
          iStyle: prefixIStyle,
          imgStyle: prefixImgStyle,
        },
        style: {
          width: '100%',
        },
      },
      {
        type: 'input',
        prop: 'realName',
        placeholder: '请输入真实姓名',
        prefix: {
          imgSrc: teacher_default_img,
          iStyle: prefixIStyle,
          imgStyle: prefixImgStyle,
        },
      },
      {
        type: 'input',
        prop: 'studentId',
        placeholder: '请输入学生学号',
        prefix: {
          imgSrc: number_default_img,
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
          name: '认证',
        },
      ],
    },
  }
}

const rules = {
  school: [{ required: true, message: '请选择所在学校', trigger: 'blur' }], // change事件在这里有一些bug，使用blur防止change默认触发
  realName: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { validator: checkName, trigger: 'blur' },
  ],
  studentId: [
    { required: true, message: '请输入学号', trigger: 'blur' },
    { validator: checkWorkers, trigger: 'blur' },
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { validator: checkCode, trigger: 'blur' },
  ],
}

export { formConfigs, formHeaderConfig, formData, rules, submitConfig }
