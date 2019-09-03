<template>
  <div class="course-management-head">
    <div v-if="userProfile === 'teacher'">
      <img :src="filterHeadList ? filterHeadList.coursePicture : ''" alt="" />
      <p>
        {{ filterHeadList ? filterHeadList.courseName : '' }}
      </p>
      <p>
        {{ filterHeadList ? filterHeadList.teacherName : '' }}
        【{{ filterHeadList ? filterHeadList.schoolName : '' }}】
      </p>
      <p>
        <span>
          {{ filterHeadList ? filterHeadList.courseScore : '' }}学分
        </span>
        <span> {{ filterHeadList ? filterHeadList.courseTime : '' }}课时 </span>
        <span
          v-if="filterHeadList ? filterHeadList.coursePrice === '免费' : ''"
        >
          {{ filterHeadList ? filterHeadList.coursePrice : '' }}
        </span>
        <span v-else>
          ￥{{ filterHeadList ? filterHeadList.coursePrice : '' }}
        </span>
      </p>
      <el-button type="success" plain @click="goDetail()">
        开始学习
      </el-button>
    </div>
    <div v-else>
      <img
        :src="filterHeadStudentList ? filterHeadStudentList.coursePicture : ''"
        alt=""
      />
      <p>
        {{ filterHeadStudentList ? filterHeadStudentList.courseName : '' }}
      </p>
      <p>
        {{ filterHeadStudentList ? filterHeadStudentList.teacherName : '' }}
        【{{ filterHeadStudentList ? filterHeadStudentList.schoolName : '' }}】
      </p>
      <p>
        <span>
          {{
            filterHeadStudentList ? filterHeadStudentList.courseScore : ''
          }}学分
        </span>
        <span>
          {{
            filterHeadStudentList ? filterHeadStudentList.courseTime : ''
          }}课时
        </span>
      </p>
      <el-button type="success" plain @click="goDetail()">
        开始学习
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      headList: {},
    }
  },
  computed: {
    // 判断登录身份
    ...mapState('login', {
      userInfo: state => state.userInfo,
    }),
    userProfile() {
      let teacherOrStudent = this.userInfo.roleStr
        ? this.userInfo.roleStr.substr(7)
        : ''
      return teacherOrStudent
    },
    // 老师身份
    ...mapState('myCourse', {
      byMeCourseList: state => state.byMeCourseList,
    }),
    filterHeadList() {
      let sign = this.$route.query.sign
      let newHeadList = this.byMeCourseList.find(item => {
        if (item.sign == sign) {
          return item
        }
      })
      return newHeadList
    },
    // 学生或者普通用户
    ...mapState('uploading', {
      courseStudyProgress: state => state.courseStudyProgress,
    }),
    filterHeadStudentList() {
      let sign = this.$route.query.sign
      let newHeadList = this.courseStudyProgress.find(item => {
        if (item.courseId == sign) {
          return item
        }
      })
      return newHeadList
    },
  },
  methods: {
    ...mapActions('myCourse', ['getByMeCourseList']),
    ...mapActions('uploading', ['getCourseStudyProgress']),
    goDetail() {
      this.$router.push({
        name: 'collegeCourseDetail',
        params: {
          id: this.$route.query.sign,
        },
      })
    },
  },
  created() {
    this.headList = this.$route.query.list
    if (this.userProfile === 'teacher') {
      let pageSizeObj = {
        page: 1,
        size: 8,
      }
      this.getByMeCourseList(pageSizeObj)
    } else {
      this.getCourseStudyProgress()
    }
  },
}
</script>

<style lang="less" scoped>
.course-management-head {
  height: 280px;
  padding: 10px 10px 0;
  img {
    width: 175px;
    height: 98px;
    border-radius: 4px;
  }
  p {
    margin-top: 8px;
    font-size: 14px;
    font-family: SourceHanSansCN-Normal;
    font-weight: 400;
    overflow: hidden;
  }
  p:nth-child(2) {
    width: 173px;
    height: 37px;
    color: rgba(51, 51, 51, 1);
    line-height: 20px;
  }
  p:nth-child(3) {
    width: 100%;
    color: rgba(153, 153, 153, 1);
    line-height: 20px;
  }
  p:nth-child(4) {
    width: 100%;
    span {
      font-size: 14px;
      font-family: SourceHanSansCN-Normal;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      margin-right: 4px;
    }
    span:nth-child(3) {
      color: #e92d08;
    }
  }
  button {
    margin-left: 35px;
    margin-top: 18px;
  }
}
</style>
