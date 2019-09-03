<template>
  <div class="course-verview">
    <div class="course-bulletin-notice">
      <span class="course-bulletin-green"></span>
      <h2 class="course-bulletin-notice">
        课程概况
      </h2>
    </div>
    <div class="course-verview-setting">
      {{ courseInfoVo.courseDescribe }}
    </div>
    <div class="course-bulletin-notice">
      <span class="course-bulletin-green"></span>
      <h2 class="course-bulletin-notice">
        课程目标
      </h2>
    </div>
    <div class="course-verview-goal" v-html="courseInfoVo.courseNotice">
      {{ courseInfoVo.courseNotice }}
    </div>
    <div class="course-bulletin-notice">
      <span class="course-bulletin-green"></span>
      <h2 class="course-bulletin-notice">
        设计原则
      </h2>
    </div>
    <div class="course-verview-design">
      {{ courseInfoVo.knowledge }}
    </div>
    <div class="course-bulletin-notice">
      <span class="course-bulletin-green"></span>
      <h2 class="course-bulletin-notice">
        教师团队
      </h2>
    </div>
    <ul class="course-verview-list">
      <li
        class="course-verview-item"
        v-for="(item, key) in courseTeacherVoList"
        :key="key"
      >
        <div class="course-verview-top">
          <img class="course-verview-teacher" :src="item.teacherImage" alt="" />
          <div class="course-verview-name">
            <p class="course-verview-class">
              {{ item.teacherName }} · {{ item.schoolName }}
            </p>
            <p class="course-verview-class">
              {{ item.teacherTitle }}
            </p>
          </div>
        </div>
        <div class="course-verview-bottom">
          {{ item.introduction }}
        </div>
        <div class="course-verview-design"></div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('course-detail', {
      courseTeacherVoList: state => state.courseTeacherVoList,
      courseInfoVo: state => state.courseInfoVo,
    }),
  },
}
</script>

<style lang="less" scoped>
.course-verview-setting {
  margin-top: 15px;
  margin-bottom: 38px;
  font-size: 14px;
  font-family: SourceHanSansCN-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 30px;
}
.course-verview-goal {
  margin-top: 15px;
  margin-bottom: 38px;
  font-size: 14px;
  font-family: SourceHanSansCN-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 30px;
  .course-verview-goal-com {
    font-size: 14px;
    font-family: SourceHanSansCN-Regular;
    font-weight: 400;
    color: #666;
    line-height: 30px;
  }
}
.course-verview-design {
  margin-top: 15px;
  margin-bottom: 38px;
  font-size: 14px;
  font-family: SourceHanSansCN-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 30px;
}
.course-verview-list {
  margin-top: 20px;
  .course-verview-item {
    margin-bottom: 50px;
    .course-verview-top {
      display: flex;
      align-items: center;
      .course-verview-teacher {
        width: 120px;
        height: 120px;
        border-radius: 50%;
      }
      .course-verview-name {
        margin-left: 20px;
        .course-verview-class {
          font-size: 16px;
          font-family: SourceHanSansCN-Regular;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 24px;
          margin: 5px 0;
        }
      }
    }
    .course-verview-bottom {
      margin-top: 12px;
      font-size: 14px;
      font-family: SourceHanSansCN-Regular;
      font-weight: 400;
      color: #666;
      line-height: 30px;
      width: 675px;
    }
  }
}
</style>
