<template>
  <div>
    <base-form
      :form-data="formData"
      :form-configs="_formConfigs"
      :rules="rules"
      ref="baseForm"
    />
    <div class="forget-password" v-login-in="'forget_password'">
      忘记密码？
    </div>
  </div>
</template>
<script>
import BaseForm from '@components/base/base-form'
import {
  formData,
  rules,
  formConfigs,
} from '@components/sign-related/configs/login-form'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'login-form',
  components: {
    'base-form': BaseForm,
  },
  data() {
    return {
      formData,
      rules,
      formConfigs,
    }
  },
  computed: {
    ...mapState('login', {
      verifiCode: state => state.verifiCode,
    }),
    _formConfigs() {
      return formConfigs(this)
    },
  },
  methods: {
    ...mapActions('login', ['getVerifiCode', 'login']),
    // 登陆
    handleSubmit() {
      const baseFormComp = this.$refs.baseForm
      baseFormComp.validate(data => {
        // validate成功发送请求
        this.login(data)
      })
    },
  },
  created() {
    this.getVerifiCode()
  },
}
</script>
<style lang="less" scoped>
.forget-password {
  margin-top: 15px;
  margin-left: 270px;
  cursor: pointer;
}
</style>
