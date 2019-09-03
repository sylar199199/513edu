<template>
  <div class="portrait-main">
    <img :src="userInfo.photo" class="login-portrait" />
    <span class="user-name">
      {{ userInfo.name }}
    </span>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('login', {
      userInfo: state => state.userInfo,
    }),
  },
  methods: {
    ...mapActions('login', ['loginOut']),
    replaceRouter() {
      this.$router.replace('/home')
    },
  },
}
</script>

<style lang="less" scoped>
.portrait-main {
  height: 80px;
  line-height: 80px;
  position: relative;
  img {
    width: 34px;
    height: 34px;
    background: #fff;
    border-radius: 50%;
    overflow: hidden;
    position: absolute;
    top: 50%;
    left: 15px;
    transform: translate(-50%, -50%);
    margin-right: 10px;
  }
  .user-name {
    color: #fff;
    margin-left: 40px;
    display: inline-block;
    width: 70px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    cursor: pointer;
  }
}
.moveGet:hover a {
  color: #55c6c2;
}
</style>
