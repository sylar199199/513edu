<template>
  <div class="course-bulletin-main">
    <header-top content="课程公告"></header-top>
    <ul class="course-bulletin-release">
      <li v-for="item in courseMsgList" :key="item.sign">
        <div>
          <p>
            {{ item.title }}
          </p>
          <p>
            <span> 发布于 {{ item.createTime }} </span>
          </p>
        </div>
        <div>
          {{ item.content }}
        </div>
      </li>
    </ul>
    <!-- 分页器 -->
    <div class="course-bulletin-pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="courseMsgTotal"
        :page-size="5"
        :hide-on-single-page="true"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import headerTop from '@/components/header-top/index'
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      ruleForm: {
        title: '',
        content: '',
      },
      page: 1,
    }
  },
  components: {
    'header-top': headerTop,
  },
  computed: {
    ...mapState('message', {
      courseMsgList: state => state.courseMsgList,
      courseMsgTotal: state => parseInt(state.courseMsgTotal),
    }),
    ...mapState('login', {
      userInfo: state => state.userInfo,
    }),
    userProfile() {
      let teacherOrStudent = this.userInfo.roleStr
        ? this.userInfo.roleStr.substr(7)
        : ''
      return teacherOrStudent
    },
  },
  methods: {
    ...mapActions('message', ['getCourseMsgList']),
    handleSizeChange(val) {
      let courseObj = {
        courseIdSign: this.$route.query.sign,
        page: 1,
        size: val,
      }
      this.getCourseMsgList(courseObj)
    },

    handleCurrentChange(val) {
      this.page = val
      let courseObj = {
        courseIdSign: this.$route.query.sign,
        page: val,
        size: 5,
      }
      this.getCourseMsgList(courseObj)
    },
  },
  created() {
    let courseObj = {
      courseIdSign: this.$route.query.sign,
      page: this.page,
      size: 5,
    }
    this.getCourseMsgList(courseObj)
  },
}
</script>

<style lang="less" scoped>
.course-bulletin-main {
  min-height: 722px;
  width: 994px;
  background: #fff;
  margin-left: 10px;
  float: left;
  .course-bulletin-release {
    margin-top: 40px;
    padding: 0 32px;
    min-height: 480px;
    li {
      border-bottom: 1px #e6e6e6 solid;
      padding-bottom: 20px;
      margin-bottom: 20px;
      div:nth-child(1) {
        display: flex;
        justify-content: space-between;
        p:nth-child(1) {
          font-size: 16px;
          font-family: SourceHanSansCN-Regular;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
        p:nth-child(2) {
          span {
            display: inline-block;
            font-size: 14px;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            cursor: pointer;
          }
          span:nth-child(1) {
            width: 200px;
            margin-right: 20px;
          }
          span:nth-child(2) {
            width: 200px;
          }
        }
      }
      div:nth-child(2) {
        margin-top: 10px;
        font-size: 14px;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: rgba(128, 128, 128, 1);
        line-height: 24px;
      }
    }
  }
  .course-bulletin-pagination {
    margin-top: 50px;
    text-align: center;
  }
}
</style>
