<template>
  <el-dialog
    :visible.sync="show"
    :width="dialogConfigs.width"
    center
    @close="close"
    :close-on-click-modal="false"
    :show-close="LoginShow"
  >
    <div class="form-content">
      <p class="form-header">
        <span class="form-title">
          {{
            formType === 'login'
              ? '登录'
              : formType === 'regist'
              ? '注册'
              : formType === 'authentication_student'
              ? '学生认证'
              : formType === 'authentication_teacher'
              ? '老师认证'
              : '找回密码'
          }}
        </span>
        <el-link
          class="login-or-Regist"
          :underline="false"
          type="primary"
          @click="changeLoginType"
        >
          {{
            formType === 'login'
              ? '免费注册'
              : formType === 'regist'
              ? '已有账号,去登录'
              : formType === 'authentication_student'
              ? '在职教师认证'
              : formType === 'authentication_teacher'
              ? '在校学生认证'
              : '去登录'
          }}
        </el-link>
      </p>
      <login-form v-show="formType === 'login'" ref="login" />
      <span v-show="formType === 'regist'" ref="regist">
        <!-- TODO -->
        <register-from />
      </span>
      <auth-student-form
        v-show="formType === 'authentication_student'"
        ref="authentication_student"
      />
      <auth-teacher-form
        v-show="formType === 'authentication_teacher'"
        ref="authentication_teacher"
      />
      <forget-password-from
        v-show="formType === 'forget_password'"
        ref="forget_password"
      />
    </div>
  </el-dialog>
</template>

<script>
import LoginForm from '@components/sign-related/forms/login-form'
import RegisterFrom from '@components/sign-related/forms/register-from'
import AuthStudentForm from '@components/sign-related/forms/auth-student-form'
import AuthTeacherForm from '@components/sign-related/forms/auth-teacher-form'

import ForgetPassword from '@components/sign-related/forms/forget-password'

import { mapState, mapMutations, mapActions } from 'vuex'
import {
  SET_SHULD_LOGIN_FORM_SHOW,
  SET_LOGIN_FORM_TYPE,
} from '@store/modules/login/mutation-types'
import formCongifs from '@components/sign-related/configs'

export default {
  name: 'Login-related-modal',
  components: {
    'login-form': LoginForm,
    'register-from': RegisterFrom,
    'auth-student-form': AuthStudentForm,
    'auth-teacher-form': AuthTeacherForm,
    'forget-password-from': ForgetPassword,
  },
  data() {
    return {
      dialogConfigs: {
        width: '464px',
      },
      show: false,
      formCongifs,
      LoginShow: true,
    }
  },

  computed: {
    ...mapState('login', {
      _show: state => state.shuldLoginFormShow,
      formType: state => state.loginFormType,
    }),
  },
  watch: {
    _show(cur) {
      this.show = cur
    },
  },
  methods: {
    ...mapMutations('login', [SET_SHULD_LOGIN_FORM_SHOW, SET_LOGIN_FORM_TYPE]),
    ...mapActions('login', ['test_login']),
    changeLoginType() {
      this[SET_LOGIN_FORM_TYPE](
        this.formType === 'login'
          ? 'regist'
          : this.formType === 'regist'
          ? 'login'
          : this.formType === 'authentication_student'
          ? 'authentication_teacher'
          : this.formType === 'authentication_teacher'
          ? 'authentication_student'
          : 'login',
      )
    },
    submitForm() {
      const ref_base_form = this.$refs[this.formType].$refs.baseForm
      ref_base_form.$refs.form.validate(valid => {
        if (valid) {
          const formData = ref_base_form.formData
          if (this.formType === 'login') {
            this.test_login(formData)
          } else {
            // TODO: regist 尚未完成
            this.test_login(formData)
          }
        } else {
          return
        }
      })
    },
    handleClose() {
      // window.location.reload()
    },
    close() {
      this[SET_SHULD_LOGIN_FORM_SHOW]({ shuldLoginFormShow: false })
    },
  },
}
</script>
<style lang="less" scoped>
.form-content {
  padding: 0 33px 28px;
}
.form-header {
  display: flex;
  justify-content: space-between;
  .form-title {
    color: #333333;
    font-size: 20px;
    line-height: 41px;
    font-weight: 500;
  }
}
.login-button {
  width: 100%;
}
</style>
