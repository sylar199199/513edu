<template>
  <div class="content-design">
    <div class="content-design-description">
      <p class="content-design-description-p">
        内容设计说明：
      </p>
      <ul class="content-design-description-list">
        <li class="content-design-description-item">
          设计课程目录内容需要至少1章内容，每一章内容至少需要1个小节；
        </li>
        <li class="content-design-description-item">
          每一小节教学内容，必须包含一段视频课程内容，时长由教师自定；
        </li>
        <li class="content-design-description-item">
          在每章内容之后，需要提供单元测试题，期末结束需要有期末考试题。
        </li>
      </ul>
    </div>
    <!-- <div class="Import-catalog">
      <el-button type="primary" plain class="Import-catalog-btn">
        导入课程目录
      </el-button>
    </div> -->
    <div class="content-design-catalogue">
      <el-tabs type="border-card" class="content-design-catalogue-table">
        <el-tab-pane label="课程目录">
          <CourseCatalogue />
        </el-tab-pane>
        <!-- <el-tab-pane label="本课资源库">
          <ResourceLibrary />
        </el-tab-pane> -->
      </el-tabs>
    </div>
    <div class="content-design-button">
      <el-button @click="handlePrevious">
        上一步
      </el-button>
      <el-button @click="handleNext">
        下一步
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import CourseCatalogue from './course-catalogue'
//import ResourceLibrary from './resource-library'
export default {
  components: {
    CourseCatalogue,
    //ResourceLibrary,
  },
  methods: {
    ...mapMutations('uploading', ['handleStep', 'handlePre']),
    // 点击上一步
    handlePrevious() {
      this.handlePre(2)
      if (this.$route.query.id) {
        this.$router.push({
          path: '/new-curriculum/team-teachers',
          query: {
            courseIdSign: this.$route.query.courseIdSign,
            id: this.$route.query.id,
          },
        })
      } else {
        this.$router.push({
          path: '/new-curriculum/team-teachers',
          query: {
            courseIdSign: this.$route.query.courseIdSign,
          },
        })
      }
    },
    // 点击下一步
    handleNext() {
      this.handleStep(4)
      if (this.$route.query.id) {
        this.$router.push({
          path: '/new-curriculum/assessment-criterion',
          query: {
            courseIdSign: this.$route.query.courseIdSign,
            id: this.$route.query.id,
          },
        })
      } else {
        this.$router.push({
          path: '/new-curriculum/assessment-criterion',
          query: { courseIdSign: this.$route.query.courseIdSign },
        })
      }
    },
  },
}
</script>

<style lang="less" scoped>
.content-design-description {
  width: 891px;
  height: 100px;
  background: rgba(245, 245, 245, 1);
  margin: 60px auto 40px;
  padding: 15px;
  .content-design-description-p {
    font-size: 12px;
    font-family: SourceHanSansCN-Normal;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 18px;
  }
  .content-design-description-list {
    margin-left: 15px;
    .content-design-description-item {
      font-size: 12px;
      font-family: SourceHanSansCN-Normal;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 18px;
      list-style: disc;
    }
  }
}
.Import-catalog {
  width: 891px;
  height: 40px;
  margin: 0 auto 20px;
  position: relative;
  .Import-catalog-btn {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 999;
  }
}
.content-design-catalogue {
  width: 890px;
  margin: 0 auto;
  .content-design-catalogue-table {
    min-height: 568px;
  }
}
.content-design-button {
  margin: 100px 0 50px 460px;
}
</style>
