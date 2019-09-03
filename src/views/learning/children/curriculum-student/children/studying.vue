<template>
  <div class="studying">
    <ul class="studying-list">
      <li
        class="studying-item"
        v-for="item in courseStudyProgress"
        :key="item.courseId"
      >
        <div class="studying-one">
          <img :src="item.coursePicture" alt="" />
          <div class="studying-two">
            <p>
              {{ item.courseName }}
            </p>
            <p>
              <span> {{ item.courseScore }}学分 </span>
              <span> {{ item.courseTime }}课时 </span>
              <span> {{ item.teacherName }}【{{ item.schoolName }}】 </span>
            </p>
            <p>
              开课时间：{{ item.contractStartTime }} 至
              {{ item.contractEndTime }}
            </p>
            <div class="studying-two-progress">
              <el-progress
                :percentage="item.studyProgress"
                color="#FD8C68"
              ></el-progress>
              <span></span>
            </div>
          </div>
        </div>
        <div class="studying-three">
          <el-button type="primary" @click="goToDetail(item.courseId)">
            继续学习
          </el-button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  computed: {
    ...mapState('uploading', {
      courseStudyProgress: state => state.courseStudyProgress,
    }),
  },
  methods: {
    ...mapActions('uploading', ['getCourseStudyProgress']),
    goToDetail(courseId) {
      this.$router.push({
        path: '/course-management',
        query: { sign: courseId },
      })
    },
  },
  created() {
    this.getCourseStudyProgress()
  },
}
</script>

<style lang="less" scoped>
.studying {
  .studying-list {
    margin-top: 40px;
    .studying-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
      .studying-one {
        img {
          width: 210px;
          height: 118px;
          border-radius: 4px;
        }
        .studying-two {
          margin-left: 20px;
          display: inline-block;
          p:nth-child(1) {
            margin-top: 8px;
            font-size: 14px;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
          }
          p:nth-child(2) {
            margin: 20px 0;
            span {
              font-size: 14px;
              font-family: SourceHanSansCN-Regular;
              font-weight: 400;
              color: rgba(102, 102, 102, 1);
            }
            span:nth-child(2) {
              margin-left: 10px;
              margin-right: 30px;
            }
          }
          p:nth-child(3) {
            font-size: 14px;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
          }
          .studying-two-progress {
            margin-top: 10px;
          }
        }
      }
      .studying-three {
        margin-top: 40px;
        margin-right: 20px;
        a {
          display: block;
          width: 98px;
          height: 40px;
        }
      }
    }
  }
}
</style>
