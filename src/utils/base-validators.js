// 手机号
export const checkPhone = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('手机号不能为空'))
  } else {
    const reg = /^1[3-9]\d{9}$/
    if (reg.test(value)) {
      callback()
    } else {
      return callback(new Error('请输入正确的手机号'))
    }
  }
}

// 密码校验
export const checkPassword = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('密码不能为空'))
  } else {
    const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/
    if (reg.test(value)) {
      callback()
    } else {
      return callback(new Error('密码必须是6-12位字母或数字'))
    }
  }
}

// 手机验证码校验
export const checkCode = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('验证码不能为空'))
  } else {
    //const reg = /^[0-9]{6}$/
    if (value.length <= 6 && value.length >= 4) {
      callback()
    } else {
      return callback(new Error('请输入正确的验证码'))
    }
  }
}

// 姓名校验
export const checkName = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('姓名不能为空'))
  } else {
    if (value.length < 20) {
      callback()
    } else {
      return callback(new Error('姓名过长'))
    }
  }
}

// 工号校验
export const checkWorkers = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('工号不能为空'))
  } else {
    if (value.length <= 10) {
      callback()
    } else {
      return callback(new Error('工号不能超过10位'))
    }
  }
}
