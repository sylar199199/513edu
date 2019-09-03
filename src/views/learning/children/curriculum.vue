<template>
  <div class="curriculum">
    <div v-if="userProfile === 'teacher'">
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
        class="curriculum-el-tabs"
      >
        <el-tab-pane label="自创课程" name="first">
          <div class="new-curriculum">
            <el-button type="primary" @click="goToCurriculum">
              新 建
            </el-button>
          </div>
          <div class="cut-off" />
          <ul class="curriculum-list clearfix">
            <li
              class="curriculum-item"
              v-for="item in byMeCourseList"
              :key="item.sign"
            >
              <div class="curriculum-imgMain">
                <img class="curriculum-img" :src="item.coursePicture" alt="" />
                <div
                  class="curriculum-text"
                  v-if="item.releaseStatus === '已发布'"
                >
                  {{ item.releaseStatus }}
                </div>
                <div class="curriculum-green" v-else>
                  {{ item.releaseStatus }}
                </div>
                <div class="curriculum-audit">
                  {{ item.auditStatus }}
                </div>
              </div>
              <p class="curriculum-title">
                {{ item.courseName }}
              </p>
              <p class="curriculum-school">
                {{ item.teacherName }}【{{ item.schoolName }}】
              </p>
              <div class="curriculum-xiangxi">
                <span class="curriculum-credit"
                  >{{ item.courseScore }}学分</span
                >
                <span class="curriculum-credit">{{ item.courseTime }}课时</span>
                <span
                  class="curriculum-price curriculum-credit"
                  v-if="item.coursePrice !== '免费'"
                >
                  ￥{{ item.coursePrice }}
                </span>
                <span class="curriculum-price curriculum-credit" v-else>
                  {{ item.coursePrice }}
                </span>
              </div>
              <div class="curriculum-icon">
                <router-link
                  :to="{
                    name: 'collegeCourseDetail',
                    params: {
                      id: item.sign,
                    },
                    query: { sign: userInfo.schoolId },
                  }"
                >
                  <img
                    :src="$imgUrl + '/learn/list_icon_preview%402x.png'"
                    alt=""
                    class="curriculum-icon-img"
                  />
                </router-link>
                <router-link
                  target="_blank"
                  :to="{
                    path: '/new-curriculum',
                    query: { id: item.sign },
                  }"
                  class="curriculum-router"
                >
                  <img
                    :src="$imgUrl + '/learn/list_icon_redact%20%402x.png'"
                    alt=""
                    class="curriculum-icon-img"
                  />
                </router-link>
                <img
                  :src="$imgUrl + '/learn/list_icon_delete%402x.png'"
                  alt=""
                  class="curriculum-icon-img"
                  @click="deleteChapter(item.sign)"
                />
                <img
                  src="../../../assets/icon/list_icon_course@2x.png"
                  alt=""
                  v-if="item.releaseStatus === '已发布'"
                  class="curriculum-icon-ziliao"
                  @click="goManagement(item.sign)"
                />
              </div>
            </li>
          </ul>
          <el-dialog
            title="确认删除吗！！！！"
            :visible.sync="dialogVisible"
            width="30%"
          >
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="affirmDeleteChapter"
                >确 定</el-button
              >
            </span>
          </el-dialog>
          <div class="curriculum-system-pagination">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="byMeCourseTotal"
              :page-size="8"
              :hide-on-single-page="true"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="引进课程" name="second">
          <Introduction-course />
        </el-tab-pane>
      </el-tabs>
    </div>
    <div v-else>
      <curriculum-student />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import CurriculumStudent from './curriculum-student/curriculum-student'
import IntroductionCourse from './Introduction-course'
import cookieUtils from '@utils/cookie'

export default {
  data() {
    return {
      dialogVisible: false,
      sign: '',
      page: 1,
      size: 8,
      activeName: 'first',
    }
  },
  components: {
    'curriculum-student': CurriculumStudent,
    'Introduction-course': IntroductionCourse,
  },
  computed: {
    ...mapState('myCourse', {
      byMeCourseList: state => state.byMeCourseList,
      byMeCourseTotal: state => parseInt(state.byMeCourseTotal),
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
    ...mapActions('myCourse', [
      'getByMeCourseList',
      'getDeleteCourse',
      'getByMeCourseList',
      'getSchoolTeacherList',
    ]),
    // 分页器
    handleSizeChange(val) {
      this.size = val
      let pageSizeObj = {
        page: this.page,
        size: this.size,
      }
      this.getByMeCourseList(pageSizeObj)
    },

    handleCurrentChange(val) {
      this.page = val
      let pageSizeObj = {
        page: this.page,
        size: this.size,
      }
      this.getByMeCourseList(pageSizeObj)
    },
    deleteChapter(sign) {
      this.sign = sign
      this.dialogVisible = true
    },
    async affirmDeleteChapter() {
      this.dialogVisible = false
      await this.getDeleteCourse(this.sign)
      //await this.getByMeCourseList()
    },
    goManagement(sign) {
      let routeData = this.$router.resolve({
        path: '/course-management',
        query: { sign: sign },
      })
      window.open(routeData.href, '_blank')
    },
    // 点击新建课程
    goToCurriculum() {
      let routerData = this.$router.resolve({
        path: '/new-curriculum',
      })
      window.open(routerData.href, '_blank')
    },
    handleClick(tab, event) {
      if (tab.label === '引进课程') {
        let basePage = {
          page: 1,
          size: 8,
        }
        this.getSchoolTeacherList(basePage)
      }
    },
  },
  created() {
    let pageSizeObj = {
      page: this.page,
      size: this.size,
    }
    this.getByMeCourseList(pageSizeObj)
    if (this.$route.path === '/home/learning/curriculum') {
      localStorage.removeItem('active')
      localStorage.removeItem('speaker')
      localStorage.removeItem('courseIdSign')
    }
  },
}
</script>

<style lang="less" scoped>
.curriculum {
  width: 994px;
  height: 722px;
  background: rgba(255, 255, 255, 1);
  margin-left: 10px;
  margin-top: 10px;
  float: left;
  padding: 0 32px;
  position: relative;
  .curriculum-el-tabs {
    margin-top: 30px;
    .new-curriculum {
      margin-top: 20px;
      position: absolute;
      top: -85px;
      right: 30px;
    }
    .curriculum-list {
      min-height: 544px;
      .curriculum-item {
        width: 210px;
        height: 240px;
        background: rgba(245, 245, 245, 1);
        border: 1px solid rgba(230, 230, 230, 1);
        margin-bottom: 30px;
        float: left;
        margin-right: 27px;
        .curriculum-imgMain {
          position: relative;
          .curriculum-img {
            width: 210px;
            height: 118px;
          }
          .curriculum-text {
            position: absolute;
            bottom: 2px;
            right: 0;
            width: 62px;
            height: 28px;
            background: #58c6bd;
            opacity: 0.8;
            border-radius: 8px 0px 0px 0px;
            font-size: 12px;
            font-family: SourceHanSansCN-Normal;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            text-align: center;
            line-height: 28px;
          }
          .curriculum-green {
            position: absolute;
            bottom: 2px;
            right: 0;
            width: 62px;
            height: 28px;
            background: rgba(252, 204, 106, 1);
            opacity: 0.8;
            border-radius: 8px 0px 0px 0px;
            font-size: 12px;
            font-family: SourceHanSansCN-Normal;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            text-align: center;
            line-height: 28px;
          }
          .curriculum-audit {
            position: absolute;
            bottom: 40px;
            right: 0;
            width: 62px;
            height: 28px;
            background: #fd8c68;
            opacity: 0.8;
            border-radius: 8px 0px 0px 0px;
            font-size: 12px;
            font-family: SourceHanSansCN-Normal;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            text-align: center;
            line-height: 28px;
          }
        }
        .curriculum-title {
          font-size: 14px;
          font-family: SourceHanSansCN-Regular;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          margin-top: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding: 0 10px;
        }
        .curriculum-school {
          font-size: 12px;
          font-family: SourceHanSansCN-Regular;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          margin-top: 8px;
          padding: 0 10px;
        }
        .curriculum-xiangxi {
          margin-top: 8px;
          .curriculum-credit {
            font-size: 12px;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            margin-left: 10px;
          }
          .curriculum-price {
            color: rgba(51, 177, 110, 1);
          }
        }
        .curriculum-icon {
          margin-top: 14px;
          a {
            display: inline-block;
            width: 22px;
            height: 22px;
          }
          .curriculum-icon-img {
            width: 22px;
            height: 22px;
            margin-left: 6px;
            cursor: pointer;
          }
          .curriculum-router {
            display: inline-block;
            width: 22px;
            height: 22px;
            margin-right: 10px;
            margin-left: 10px;
            .curriculum-icon-img {
              width: 22px;
              height: 22px;
              margin-left: 6px;
              cursor: pointer;
            }
          }
          .curriculum-icon-ziliao {
            margin-left: 10px;
            cursor: pointer;
          }
        }
      }
      .curriculum-item:nth-child(4n + 4) {
        margin-right: 0;
      }
    }
    .curriculum-system-pagination {
      text-align: center;
    }
  }
}
</style>
