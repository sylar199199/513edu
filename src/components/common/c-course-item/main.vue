<template>
  <div>
    <router-link
      class="c-course-item"
      :to="{
        name: 'collegeCourseDetail',
        params: {
          id: course.courseSign,
          name: course.schoolName,
          judge: judge,
        },
        query: {
          sign: sign,
        },
      }"
    >
      <div class="img-box">
        <img :src="course.coursePicture" />
        <div class="course-wrapper">
          <div class="course-detail">
            <div class="school">学校：{{ course.schoolName }}</div>
            <div class="course_begin">学科：{{ course.courseTypeName }}</div>
            <!-- <div class="course-declare">说明：{{ course.course_declare }}</div> -->
          </div>
        </div>
      </div>
      <div class="course-info-content">
        <p class="course-name">
          {{ course.courseName }}
        </p>
        <div class="info-bar">
          <span class="info-author">
            <img :src="icons.iconTeacher" />
            {{ course.teacherName }}
          </span>
          <span class="info-course-duration">
            <img :src="icons.iconHour" />
            课时:{{ course.courseTime }}
          </span>
          <span class="info-credit">
            <img :src="icons.iconCredit" />
            学分:{{ course.courseScore }}
          </span>
        </div>
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'c-course-item',
  props: {
    icons: {
      type: Object,
      default: () => {},
    },
    course: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      judge: '',
      sign: '',
    }
  },
  created() {
    this.judge = this.$route.query.judge
    this.sign = this.$route.query.sign
  },
}
</script>
<style lang="less" scoped>
.c-course-item {
  display: block;
  border: 1px solid #cccccc;
  padding: 20px 10px;
  background-color: #fff;
  .img-box {
    height: 146px;
    position: relative;
    &:hover .course-wrapper {
      display: block;
    }
    .course-wrapper {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.8);
      color: #ffffff;
      border-radius: 3px;
      display: none;
      .course-detail {
        font-size: 14px;
        line-height: 24px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 170px;
        max-height: 126px;
      }
    }
    > img {
      width: 100%;
      height: 100%;
    }
  }
  .course-info-content {
    margin-top: 20px;
    .course-name {
      color: #333333;
      font-size: 16px;
      font-family: SourceHanSansCN-Regular;
      font-weight: 400;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .info-bar {
      display: flex;
      align-items: center;
      height: 18px;
      line-height: 18px;
      margin-top: 12px;
      > span {
        margin-right: 15px;
        color: #808080;
      }
      img {
        vertical-align: middle;
        height: 18px;
        transform: translateY(-1px);
      }
    }
  }
}
</style>
