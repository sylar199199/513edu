<template>
  <div class="drop-down-father">
    <Logreg v-if="!isLogin" />
    <el-dropdown class="dropdown" v-else>
      <Portrait />
      <el-dropdown-menu slot="dropdown" class="drop-down-list">
        <router-link to="/home/learning" target="_blank">
          <el-dropdown-item class="moveGet">
            学习中心
          </el-dropdown-item>
        </router-link>
        <router-link to="/home/message">
          <el-dropdown-item class="moveGet">
            消息中心
          </el-dropdown-item>
        </router-link>
        <router-link to="/home/account">
          <el-dropdown-item class="moveGet">
            账号管理
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item>
          <span
            @click="
              loginOut()
              replaceRouter()
            "
          >
            退出账号
          </span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import Logreg from './log-reg'
import Portrait from './portrait'
import { mapState, mapActions } from 'vuex'
import cookieUtils from '@utils/cookie'
export default {
  components: {
    Logreg,
    Portrait,
  },
  data() {
    return {
      isShow: false,
    }
  },
  computed: {
    ...mapState('login', {
      isLogin: state => state.isLogin,
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
.drop-down-father {
  height: 100%;
  .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
    position: relative;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .drop-down-list {
    top: 60px !important;
    left: 1440px !important;
    .moveGet:hover a {
      background-color: #e6e6e6;
      color: #55c6c2;
    }
    span {
      display: block;
      width: 100%;
      height: 100%;
    }
    .el-dropdown-menu__item:hover,
    .el-dropdown-menu__item:focus {
      background-color: #e6e6e6;
      color: #55c6c2;
    }
  }
}
</style>
