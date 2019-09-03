<template>
  <div class="unit-testing-main">
    <div class="team-test">
      <ul>
        <li v-for="(item, index) in findExamExaminationList" :key="item.idSign">
          <div class="team-test-left">
            <div class="team-test-left-right">
              <p>第{{ index + 1 }}章：{{ item.examinationName }}</p>
              <p>
                <span> 试卷总分：{{ item.totalScore }}分 </span>
                <span>
                  试卷状态：
                  <i
                    v-if="item.releaseStatus === '已发布'"
                    class="color-origin"
                    >{{ item.releaseStatus }}</i
                  >
                  <i v-else class="color-green">{{ item.releaseStatus }}</i>
                </span>
              </p>
              <p>
                <span> 题目数量：{{ item.num }}题 </span>
                <span> 考试时长：{{ item.examTime }}分钟 </span>
              </p>
            </div>
          </div>
          <div class="team-test-right">
            <el-button
              type="primary"
              @click="criticizesSystem(item.idSign, item.examinationName)"
            >
              批卷
            </el-button>
            <el-button type="primary" @click="goToTest(item.idSign)">
              查看试卷
            </el-button>
          </div>
        </li>
      </ul>
      <div class="team-test-pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="findExamExaminationTotal"
          :page-size="4"
          :hide-on-single-page="true"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  computed: {
    ...mapState('course-management', {
      findExamExaminationList: state => state.findExamExaminationList,
      findExamExaminationTotal: state =>
        parseInt(state.findExamExaminationTotal),
    }),
    ...mapState('management', {
      byExaminationIdList: state => state.byExaminationIdList,
    }),
  },
  methods: {
    ...mapActions('course-management', ['getFindExamExaminationList']),
    handleSizeChange(val) {
      let courseTeacherReqObj = {
        courseIdSign: this.$route.query.sign,
        page: 1,
        size: val,
      }
      this.getFindExamExaminationList(courseTeacherReqObj)
    },

    handleCurrentChange(val) {
      this.page = val
      let courseTeacherReqObj = {
        courseIdSign: this.$route.query.sign,
        page: val,
        size: 4,
      }
      this.getFindExamExaminationList(courseTeacherReqObj)
    },
    // 点击进入查看试卷页面
    goToTest(idSign) {
      let routeData = this.$router.resolve({
        path: '/test-one',
        query: {
          sign: this.$route.query.sign,
          idSign: idSign,
        },
      })
      window.open(routeData.href, '_blank')
    },
    // 点击进入批卷页面
    criticizesSystem(idSign, examinationName) {
      let sign = this.$route.query.sign
      let NewexaminationName = encodeURI(examinationName)
      this.$router.push({
        path: '/criticizes-system-one',
        query: {
          sign: sign,
          idSign: idSign,
          examinationName: NewexaminationName,
        },
      })
    },
  },
  created() {
    let courseTeacherReqObj = {
      courseIdSign: this.$route.query.sign,
      page: 1,
      size: 4,
    }
    this.getFindExamExaminationList(courseTeacherReqObj)
  },
}
</script>

<style lang="less" scoped>
.unit-testing-main {
  min-height: 722px;
  width: 994px;
  background: #fff;
  margin-left: 10px;
  float: left;
  .team-test {
    padding: 20px;
    ul {
      min-height: 528px;
      li {
        border-bottom: 1px #dedede solid;
        padding: 20px 10px 30px 10px;
        display: flex;
        justify-content: space-between;
        .team-test-left {
          display: flex;
          .team-test-left-left {
            width: 90px;
            height: 90px;
            text-align: center;
            background: rgba(255, 220, 209, 1);
            border-radius: 50%;
            overflow: hidden;
            margin-right: 20px;
            p:nth-child(1) {
              margin-top: 20px;
              font-size: 28px;
              font-family: SourceHanSansCN-Normal;
              font-weight: 400;
              color: rgba(253, 140, 104, 1);
            }
            p:nth-child(2) {
              font-size: 14px;
              font-family: SourceHanSansCN-Normal;
              font-weight: 400;
              color: rgba(253, 140, 104, 1);
            }
          }
          .team-test-left-right {
            max-width: 300px;
            p:nth-child(1) {
              font-size: 16px;
              font-family: SourceHanSansCN-Regular;
              font-weight: 400;
              color: rgba(51, 51, 51, 1);
              line-height: 41px;
              cursor: pointer;
              max-width: 300px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            p:nth-child(2) {
              span {
                font-size: 14px;
                font-family: SourceHanSansCN-Regular;
                font-weight: 400;
                color: rgba(153, 153, 153, 1);
                margin-right: 58px;
                cursor: pointer;
                .color-origin {
                  color: #58c6bd;
                }
                .color-green {
                  color: #fd8c68;
                }
              }
              span:last-child {
                margin-right: 0;
              }
            }
            p:nth-child(3) {
              margin-top: 10px;
              span {
                font-size: 14px;
                font-family: SourceHanSansCN-Regular;
                font-weight: 400;
                color: rgba(153, 153, 153, 1);
                margin-right: 58px;
                cursor: pointer;
              }
              span:last-child {
                margin-right: 0;
              }
            }
          }
          .team-test-left-img {
            display: none;
            margin-left: 15px;
            margin-top: 10px;
            img {
              width: 25px;
              height: 25px;
              margin-left: 6px;
            }
          }
        }
      }
      li:hover {
        background: #f0f0f0;
        .team-test-left-img {
          display: block;
        }
      }
    }
    .team-test-pagination {
      margin-top: 35px;
      margin-bottom: 35px;
      text-align: center;
    }
  }
}
</style>
