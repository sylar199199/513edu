<template>
  <div class="uploading">
    <div class="container">
      <div class="uploading-mian">
        <el-steps
          :active="active"
          finish-status="success"
          process-status="process"
          class="uploading-nav"
        >
          <el-step title="概要信息"></el-step>
          <el-step title="教师团队"></el-step>
          <el-step title="内容设计"></el-step>
          <el-step title="考核标准"></el-step>
        </el-steps>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: parseInt(localStorage.getItem('active')) || 1,
    }
  },
}
</script>

<style lang="less">
.uploading {
  width: 100%;
  background: #eee;
  overflow: hidden;
  .uploading-mian {
    background: #fff;
    min-height: calc(100vh - 368px);
    margin: 10px 0;
    overflow: hidden;
    .uploading-nav {
      width: 485px;
      margin: 0 auto;
      margin-top: 40px;
    }
    .uploading-net-pre {
      margin-bottom: 50px;
      margin-top: 60px;
      margin-left: 400px;
    }
  }
}
</style>
