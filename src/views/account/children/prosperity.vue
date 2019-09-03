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
    <div
      class="certification-img"
      :style="{ backgroundImage: `url(${certificationImgUrl})` }"
    ></div>
    <div class="certification-succes-text">
      更换成功，你可以使用新手机号码+密码登录系统！
    </div>
    <div class="certification-goback">
      <router-link to="/home/account" class="certification-btnGoback">
        <span @click="reloadPage">
          点击返回
        </span>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      certificationImgUrl: this.$imgUrl + '/account/succeed%20%402x.png',
    }
  },
  methods: {
    ...mapActions('login', ['getLoginInfo']),
    reloadPage() {
      this.getLoginInfo()
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
.certification-img {
  width: 74px;
  height: 74px;
  margin: 0 auto;
}
.certification-succes-text {
  font-size: 14px;
  font-family: SourceHanSansCN-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  text-align: center;
  margin: 30px 0 18px;
}
.certification-goback {
  text-align: center;
  .certification-btnGoback {
    font-size: 14px;
    font-family: SourceHanSansCN-Regular;
    font-weight: 400;
    color: rgba(88, 198, 189, 1);
    span {
      font-size: 14px;
      font-family: SourceHanSansCN-Regular;
      font-weight: 400;
      color: rgba(88, 198, 189, 1);
    }
  }
}
</style>
