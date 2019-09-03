<template>
  <div class="study-analysis-main">
    学习分析
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('login', {
      userInfo: state => state.userInfo,
    }),
  },
  async created() {
    let teacherOrStudent = this.userInfo.roleStr
      ? this.userInfo.roleStr.substr(7)
      : ''
    if (teacherOrStudent === 'student') {
    } else {
      this.$message.error('身份不正确')
      this.$router.push('/home')
    }
  },
}
</script>

<style lang="less" scoped>
.study-analysis-main {
  min-height: 722px;
  width: 994px;
  background: #fff;
  margin-left: 10px;
  float: left;
}
</style>
