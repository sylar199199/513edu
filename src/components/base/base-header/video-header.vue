<template>
  <div class="video-header">
    <span class="video-name">
      跨境电商平台分析
    </span>
    <el-button class="button-back" icon="el-icon-arrow-left" @click="back">
      返回课程主页
    </el-button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'video-header',
  methods: {
    ...mapActions('myCourse', ['getAddStudyInfo']),
    back() {
      let sign = this.$route.params.id
      let studyTime = parseInt(localStorage.getItem(sign)) || 0
      let videoIdSign = this.$route.params.target
      let courseIdSign = this.$route.query.courseIdSign
      let addCourseStudyReqObj = {
        courseIdSign,
        studyTime,
        videoIdSign,
      }
      this.getAddStudyInfo(addCourseStudyReqObj)
      //TODO:暂时不做判断，全部跳转到college下面的课程
      const { path, query } = this.$route
      const { from } = query
      this.$router.push({
        path: `/college/course-detail/${from}`,
      })
    },
  },
}
</script>

<style lang="less" scoped>
.video-header {
  height: 88px;
  background-color: #292929;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  color: #ffffff;
  .button-back {
    background-color: #555555;
    color: #ffffff;
    border-color: #555555;
  }
}
</style>
