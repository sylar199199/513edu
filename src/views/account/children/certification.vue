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
        · 若你的原手机号码不可用，你可以联系在线客服，提供身份证信息完成处理。
      </p>
    </div>
    <div class="reg-countdown">
      <span class="reg-countdown-span">已绑定号码：</span>
      <span class="reg-countdown-phone">
        {{ newOldPhone }}
      </span>
    </div>
    <div class="reg-countdown">
      <span class="reg-countdown-span">验证码：</span>
      <el-input
        v-model="code"
        ref="inputOne"
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
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      isDisabled: false,
      code: '',
      time: 60,
    }
  },
  computed: {
    ...mapState('login', {
      oldPhone: state => state.userInfo.mobile,
    }),
    newOldPhone() {
      return this.oldPhone.substr(0, 3) + '****' + this.oldPhone.substr(7)
    },
  },
  methods: {
    ...mapActions('login', ['sendCodeForOldMobile']),
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
      this.sendCodeForOldMobile(this.oldPhone)
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
  .el-input {
    width: 300px;
  }
  .reg-countdown-span {
    display: block;
    width: 100px;
    line-height: 40px;
    text-align: right;
  }
  .reg-countdown-phone {
    line-height: 40px;
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
