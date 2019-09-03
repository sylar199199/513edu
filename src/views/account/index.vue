<template>
  <div class="account-main">
    <div class="container">
      <div class="account-main-white">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="基本信息" name="first">
            <Essential />
          </el-tab-pane>
          <el-tab-pane label="修改密码" name="second">
            <ResetPassword />
          </el-tab-pane>
        </el-tabs>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import Essential from './children/essential'
import ResetPassword from './children/resetPassword'
export default {
  components: {
    Essential,
    ResetPassword,
  },
  data() {
    return {
      activeName: 'first',
    }
  },
  methods: {
    handleClick(tab, event) {
      //console.log(tab, event)
    },
  },
}
</script>

<style lang="less">
.account-main {
  background: #f0f0f0;
  overflow: hidden;
  .container {
    margin-top: 5px;
    background: #fff;
    padding: 30px 0;
    .account-main-white {
      padding: 0 70px;
      .el-tabs {
        border: 1px #eee solid;
        .el-tabs__header .el-tabs__nav {
          border-top: none !important;
          border-radius: 0;
        }
        .el-tabs__header .el-tabs__nav:first-child {
          border-left: 0;
        }
      }
    }
  }
}
</style>
