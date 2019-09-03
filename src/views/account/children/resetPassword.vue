<template>
  <div class="resetPassword">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="原密码：" prop="oldPassword">
        <el-input
          placeholder="输入旧密码"
          v-model="ruleForm.oldPassword"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码：" prop="pass">
        <el-input
          placeholder="输入新密码"
          v-model="ruleForm.pass"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="请确认：" prop="checkPass">
        <el-input
          placeholder="再次输入新密码"
          v-model="ruleForm.checkPass"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">
          提交
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { checkPhone, checkPassword, checkCode } from '@utils/base-validators.js'

export default {
  data() {
    return {
      ruleForm: {
        pass: '',
        checkPass: '',
        oldPassword: '',
      },
      rules: {
        pass: [{ validator: checkPassword, trigger: 'blur' }],
        checkPass: [{ validator: checkPassword, trigger: 'blur' }],
        oldPassword: [{ validator: checkPassword, trigger: 'blur' }],
      },
    }
  },
  computed: {
    ...mapState('login', {
      oldPassword: state => state.password,
    }),
  },
  methods: {
    ...mapActions('login', ['getUpdatePassword']),
    submitForm(formName) {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          if (await this.getUpdatePassword(this.ruleForm)) {
            this.$router.replace({
              path: '/home',
            })
            window.location.reload()
          } else {
          }
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>

<style lang="less" scoped>
.resetPassword {
  min-height: calc(100vh - 348px);
  width: 400px;
}
</style>
