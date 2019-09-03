<template>
  <div class="account-main">
    <div class="container">
      <div class="account-main-white">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="课程通知" name="course">
            <course-notice />
          </el-tab-pane>
          <el-tab-pane label="校内通知" name="notice">
            <school-notice />
          </el-tab-pane>
          <el-tab-pane label="系统通知" name="system">
            <System />
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import System from './children/system'
import schoolNotice from './children/school-notice'
import courseNotice from './children/course-notice'
export default {
  components: {
    System,
    'school-notice': schoolNotice,
    'course-notice': courseNotice,
  },
  data() {
    return {
      activeName: 'course',
    }
  },
  methods: {
    handleClick(tab, event) {},
  },
}
</script>

<style lang="less">
.account-main {
  background: #f0f0f0;
  overflow: hidden;
  .container {
    margin-top: 10px;
    margin-bottom: 10px;
    background: #fff;
    padding: 30px 0;
    .account-main-white {
      padding: 0 70px;
      min-height: calc(100vh - 348px);
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
