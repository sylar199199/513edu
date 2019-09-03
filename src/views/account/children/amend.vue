<template>
  <div>
    <div class="certification-text">
      <p class="certification-text-main">
        为确认是你本人操作，需要完成身份认证：
      </p>
      <p class="certification-text-main">
        · 若已绑定的手机号码还在使用，请获取短信验证码确认身份；
      </p>
      <p class="certification-text-main">
        · 若你的原手机号码不可用，你可以联系
      </p>
    </div>
    <div class="reg-countdown">
      <span class="reg-countdown-span">新手机号码：</span>
      <el-input placeholder="请输入内容" v-model="newPhone" clearable>
      </el-input>
    </div>
    <div class="reg-countdown">
      <span class="reg-countdown-span">验证码：</span>
      <el-input
        v-model="code"
        placeholder="请输入短信验证码"
        class="reg-bottom"
      ></el-input>

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
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      newPhone: '',
      isDisabled: false,
      code: '',
      time: 60,
    }
  },
  methods: {
    ...mapActions('login', ['sendCodeForNewMobile']),
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
      this.sendCodeForNewMobile(this.newPhone)
    },
  },
}
</script>

<style lang="less" scoped>
.certification-text {
  width: 890px;
  height: 80px;
  background: rgba(245, 245, 245, 1);
  margin: 65px auto;
  padding: 15px;
  .certification-text-main {
    font-size: 12px;
    font-family: SourceHanSansCN-Normal;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 18px;
  }
}
.reg-countdown {
  position: relative;
  width: 400px;
  margin-bottom: 30px;
  display: flex;
  .reg-countdown-span {
    display: block;
    width: 100px;
    line-height: 40px;
    text-align: right;
  }
  .reg-countdown-right {
    position: absolute;
    top: 1px;
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
</style>
