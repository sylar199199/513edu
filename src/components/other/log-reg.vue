<template>
  <div class="log_reg">
    <span class="log_reg_a" v-login-in="'login'">登录</span>
    <div class="log_reg_span"></div>
    <span class="log_reg_a" v-login-in="'regist'">注册</span>
  </div>
</template>

<style lang="less" scoped>
.log_reg {
  margin-left: 21px;
  line-height: 70px;

  .log_reg_a {
    font-size: 16px;
    color: #fff;
    cursor: pointer;
  }
  .log_reg_a:hover {
    color: #55c6c2;
  }

  .log_reg_span {
    display: inline-block;
    color: #fff;
    margin: 0 10px;
    width: 1px;
    height: 17px;
    position: relative;
    top: 3px;
    border: 1px solid #fff;
  }
}
</style>
