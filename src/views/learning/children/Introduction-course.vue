<template>
  <div class="introduction-course">
    <ul class="clearfix">
      <li v-for="item in schoolTeacherList" :key="item.courseSign">
        <img
          :src="item.coursePicture"
          alt=""
          class="introduction-course-banner"
        />
        <div class="introduction-course-main">
          <p>
            {{ item.courseName }}
          </p>
          <p>
            <span>
              {{ item.teacherName }}
            </span>
            <span
              >【
              {{ item.schoolName }}
              】</span
            >
          </p>
          <p>
            <span>{{ item.courseScore }}学分</span>
            <span>{{ item.courseTime }}课时</span>
            <span>
              <span v-if="item.coursePrice !== '免费'">
                ￥
              </span>
              {{ item.coursePrice }}
            </span>
          </p>
        </div>
        <div class="introduction-course-icon">
          <img
            :src="$imgUrl + 'learn/list_icon_preview%402x.png'"
            alt=""
            @click="handleGoDetail(item.courseSign)"
          />
          <img
            src="../../../assets/icon/list_icon_course@2x.png"
            alt=""
            @click="handleGoMain(item.courseSign)"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data() {
    return {
      page: 1,
      size: 8,
    }
  },
  computed: {
    ...mapState('myCourse', {
      schoolTeacherList: state => state.schoolTeacherList,
      schoolTeacherTotal: state => state.schoolTeacherTotal,
    }),
    ...mapState('login', {
      userInfo: state => state.userInfo,
    }),
  },
  methods: {
    // 点击进入详情页
    handleGoDetail(sign) {
      this.$router.push({
        name: 'collegeCourseDetail',
        params: {
          id: sign,
        },
        query: { sign: this.userInfo.schoolId },
      })
    },
    // 点击进入主要页面
    handleGoMain(sign) {
      let RouterData = this.$router.resolve({
        path: '/imported-materials',
        query: { sign: sign },
      })
      window.open(RouterData.href, '_blank')
    },
  },
}
</script>

<style lang="less" scoped>
ul {
  min-height: 550px;
  li {
    width: 210px;
    height: 240px;
    background: #f5f5f5;
    border: 1px solid #e6e6e6;
    margin-bottom: 30px;
    float: left;
    margin-right: 27px;
    .introduction-course-banner {
      width: 210px;
      height: 118px;
    }
    .introduction-course-main {
      p:nth-child(1) {
        font-size: 14px;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: #333333;
        margin-top: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 0 10px;
      }
      p:nth-child(2) {
        margin-top: 8px;
        padding: 0 10px;
        span {
          font-size: 12px;
          font-family: SourceHanSansCN-Regular;
          font-weight: 400;
          color: #666666;
        }
      }
      p:nth-child(3) {
        margin-top: 8px;
        span {
          font-size: 12px;
          font-family: SourceHanSansCN-Regular;
          font-weight: 400;
          color: #999999;
          margin-left: 10px;
        }
        span:nth-child(3) {
          color: #33b16e;
          span {
            color: #33b16e;
          }
        }
      }
    }
    .introduction-course-icon {
      margin-top: 14px;
      text-align: right;
      img {
        width: 22px;
        height: 22px;
        margin-right: 10px;
      }
    }
  }
  li:nth-child(4n + 4) {
    margin-right: 0;
  }
}
</style>
