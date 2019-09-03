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
              id="yzmBtn"
              class="reg-setVerification"
            >
              获取验证码
            </el-button>
          </div>
        </div>
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
      <el-button type="primary" class="reg-btn" @click="getRegister(ruleForm)">
        确认
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
      isDisabled: false,
      goTime: 60,
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
    ...mapActions('login', ['forgetThePassword', 'resetLoginPassword']),
    ...mapMutations('login', ['setMobilePhone']),
    sendMsg() {
      let daojishi = this
      daojishi.isDisabled = true
      let yzmBtn = document.getElementById('yzmBtn')
      let timer = window.setInterval(function() {
        yzmBtn.innerText = '请在' + daojishi.goTime + '秒内输入'
        --daojishi.goTime
        if (daojishi.goTime < 0) {
          yzmBtn.innerText = '重新发送'
          daojishi.goTime = 60
          daojishi.isDisabled = false
          window.clearInterval(timer)
        }
      }, 1000)
    },
    setCode() {
      let mobilePhone = this.ruleForm.phone
      this.setMobilePhone(mobilePhone)
      this.forgetThePassword(mobilePhone)
    },
    getRegister(formName) {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let newPwd = this.ruleForm.pass
          let mobileCode = this.ruleForm.code
          let mobile = this.ruleForm.phone
          let resetLoginPwdReqObj = {
            newPwd,
            mobileCode,
            mobile,
          }
          this.resetLoginPassword(resetLoginPwdReqObj)
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
.reg-yanzheng-mobie {
  position: relative;
  p {
    position: absolute;
    top: 44px;
    left: 15px;
    color: red;
  }
}
.reg-countdown {
  position: relative;
  p {
    position: absolute;
    left: 10px;
    top: 44px;
    color: red;
  }
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
.reg-yanzheng-password {
  position: relative;
  p {
    color: red;
    position: absolute;
    top: 44px;
    left: 10px;
  }
}
.slot-prefix-wooden {
  margin-top: 12px;
  margin-left: 6px;
  width: 16px;
  height: 16px;
}
</style>
