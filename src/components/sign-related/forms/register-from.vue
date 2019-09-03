<template>
  <div id="test">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      class="demo-ruleForm"
    >
      <el-form-item label="" prop="phone">
        <el-input
          type="text"
          v-model="ruleForm.phone"
          autocomplete="off"
          placeholder="请输入手机号码"
        >
          <img
            src="../../../assets/icon/phone_default@2x.png"
            alt=""
            slot="prefix"
            class="slot-prefix-wooden"
          />
        </el-input>
      </el-form-item>
      <el-form-item label="" prop="pass">
        <el-input
          type="password"
          v-model="ruleForm.pass"
          autocomplete="off"
          placeholder="请输入密码"
          show-password
        >
          <img
            src="../../../assets/icon/password_default@2x.png"
            alt=""
            slot="prefix"
            class="slot-prefix-wooden"
          />
        </el-input>
      </el-form-item>

      <el-form-item label="" prop="code">
        <div class="reg-countdown">
          <el-input
            v-model="ruleForm.code"
            placeholder="请输入短信验证码"
            class="reg-bottom"
          >
            <img
              src="../../../assets/icon/wooden_default@2x.png"
              alt=""
              slot="prefix"
              class="slot-prefix-wooden"
            />
          </el-input>

          <div class="reg-countdown-right">
            <el-button
              @click="
                sendMsg()
                setCode()
              "
              :disabled="isDisabled"
              id="btn"
              class="reg-setVerification"
            >
              获取验证码
            </el-button>
          </div>
        </div>
      </el-form-item>
      <el-button type="primary" class="reg-btn" @click="getRegister(ruleForm)">
        注册
      </el-button>
    </el-form>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import { checkPhone, checkPassword, checkCode } from '@utils/base-validators.js'

export default {
  data() {
    return {
      phone: '',
      password: '',
      code: '',
      isDisabled: false,
      time: 60,
      ruleForm: {
        phone: '',
        pass: '',
        code: '',
      },
      rules: {
        phone: [{ validator: checkPhone, trigger: 'blur' }],
        pass: [{ validator: checkPassword, trigger: 'blur' }],
        code: [{ validator: checkCode, trigger: 'blur' }],
      },
    }
  },
  methods: {
    ...mapActions('login', ['register', 'sendCodeForMobile']),
    ...mapMutations('login', ['setMobilePhone', 'setRegAll']),
    sendMsg() {
      let me = this
      me.isDisabled = true
      let btn = document.getElementById('btn')
      let interval = window.setInterval(function() {
        btn.innerText = '请在' + me.time + '秒内输入'
        --me.time
        if (me.time < 0) {
          btn.innerText = '重新发送'
          me.time = 60
          me.isDisabled = false
          window.clearInterval(interval)
        }
      }, 1000)
    },
    setCode() {
      let mobilePhone = this.ruleForm.phone
      this.setMobilePhone(mobilePhone)
      this.sendCodeForMobile()
    },
    getRegister(formName) {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let password = this.ruleForm.pass
          let code = this.ruleForm.code
          this.setRegAll(password)
          this.register(code)
        } else {
          return false
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.reg-btn {
  width: 100%;
}
.reg-countdown {
  position: relative;
  .reg-countdown-right {
    position: absolute;
    top: 0px;
    right: 1px;
    .reg-halving {
      display: inline-block;
      width: 1px;
      height: 20px;
      background: #ccc;
    }
    .reg-setVerification {
      border: 0;
    }
  }
}
.slot-prefix-wooden {
  margin-top: 12px;
  margin-left: 6px;
  width: 16px;
  height: 16px;
}
</style>
