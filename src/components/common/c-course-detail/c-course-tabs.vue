<template>
  <div class="c-course-tabs">
    <el-tabs class="tabs" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="课程概况" name="course-verview">
        <c-course-verview />
      </el-tab-pane>
      <!--  <el-tab-pane label="课程公告" name="course-bulletin">
        <c-course-bulletin />
      </el-tab-pane> -->
      <el-tab-pane label="课程章节" name="course-section">
        <c-course-section />
      </el-tab-pane>
      <el-tab-pane label="在线问答" name="course-quora">
        <c-course-quora />
      </el-tab-pane>
      <!-- <el-tab-pane label="单元考试" name="course-examination">
        <c-course-examination />
      </el-tab-pane> -->
      <el-tab-pane label="考核标准" name="course-assessment">
        <c-course-assessment />
      </el-tab-pane>
      <el-tab-pane label="跨境电商实训" name="course-commerce">
        <c-course-commerce />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import CCourseVerview from '@components/common/c-course-detail/c-course-verview/c-course-verview'
// import CCourseBulletin from '@components/common/c-course-detail/c-course-bulletin/c-course-bulletin'
import CCourseSection from '@components/common/c-course-detail/c-course-section'
import CCourseQuora from '@components/common/c-course-detail/c-course-quora/c-course-quora'
// import CCourseExamination from '@components/common/c-course-detail/c-course-examination/c-course-examination'
import CCourseAssessment from '@components/common/c-course-detail/c-course-assessment/c-course-assessment'
import CCourseCommerce from '@components/common/c-course-detail/c-course-commerce/c-course-commerce'
import { mapActions } from 'vuex'
export default {
  name: 'c-course-tabs',
  components: {
    'c-course-verview': CCourseVerview,
    //'c-course-bulletin': CCourseBulletin,
    'c-course-section': CCourseSection,
    'c-course-quora': CCourseQuora,
    //'c-course-examination': CCourseExamination,
    'c-course-assessment': CCourseAssessment,
    'c-course-commerce': CCourseCommerce,
  },
  data() {
    return {
      activeName: 'course-verview',
    }
  },
  methods: {
    ...mapActions('course-detail', [
      'getCourseCatalog',
      'getByInspectionStandardId',
    ]),
    handleClick(tab, event) {
      let coursectionId = this.$route.params.id
      if (tab.label === '课程章节') {
        this.getCourseCatalog(coursectionId)
      }
      if (tab.label === '考核标准') {
        this.getByInspectionStandardId(coursectionId)
      }
    },
  },
}
</script>
<style lang="less">
.c-course-tabs {
  margin-top: 70px;
  position: relative;
  .is-active {
    color: #55c6c1 !important;
  }
  .amazon-link {
    position: absolute;
    top: 15px;
    right: 20px;
    color: #f00;
    font-size: 14px;
  }
}
</style>
