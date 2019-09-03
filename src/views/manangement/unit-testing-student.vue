<template>
  <div class="unit-testing-student">
    <header-top content="单元测试">
      <el-select v-model="selectVal" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </header-top>
    <div>
      <ul>
        <li v-for="(item, index) in findExamExaminationList" :key="item.idSign">
          <div class="team-test-left">
            <!-- <div class="team-test-left-left">
            <p>54</p>
            <p>待批卷</p>
          </div> -->
            <div class="team-test-left-right">
              <p>第{{ index + 1 }}章：{{ item.examinationName }}</p>
              <p>
                <span> 试卷总分：{{ item.totalScore }}分 </span>
                <span> 测试时长：{{ item.examTime }}分钟 </span>
              </p>
              <p>
                <span> 题目数量：{{ item.num }}题 </span>
                <span> 考试截止：{{ item.endTime }}</span>
              </p>
            </div>
          </div>
          <div class="team-test-right">
            <el-button
              type="primary"
              v-if="item.recordId === null"
              @click="goToTest(item.idSign, item.endTime)"
            >
              开始考试
            </el-button>
            <el-button
              v-else
              type="warning"
              class="team-test-right-button"
              @click="checkPaper(item.recordId, item.idSign)"
            >
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
    <!-- 考试逾期 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="20%"
      :close-on-click-modal="false"
      :show-close="false"
      center
    >
      <span>该考试以逾期！暂不能考试！</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import headerTop from '@components/header-top/index'
import { mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      options: [
        {
          value: '1',
          label: '全部',
        },
        {
          value: '2',
          label: '未开始',
        },
        {
          value: '3',
          label: '已完成',
        },
      ],
      selectVal: '',
      dialogVisible: false,
    }
  },
  components: {
    'header-top': headerTop,
  },
  computed: {
    ...mapState('course-management', {
      findExamExaminationList: state => state.findExamExaminationList,
      findExamExaminationTotal: state =>
        parseInt(state.findExamExaminationTotal),
    }),
  },
  methods: {
    ...mapActions('course-management', ['getFindExamExaminationList']),
    ...mapActions('management', ['getAddExaminationRecord']),
    handleSizeChange(val) {
      let courseTeacherReqObj = {
        courseIdSign: this.$route.query.sign,
        page: 1,
        size: val,
      }
      this.getFindExamExaminationList(courseTeacherReqObj)
    },

    handleCurrentChange(val) {
      let courseTeacherReqObj = {
        courseIdSign: this.$route.query.sign,
        page: val,
        size: 4,
      }
      this.getFindExamExaminationList(courseTeacherReqObj)
    },
    // 点击进去考试页面
    goToTest(idSign, endTime) {
      let oldDate = new Date(endTime)
      let oldNum = oldDate.getTime()
      let newDate = new Date()
      let newNum = newDate.getTime()
      if (oldNum < newNum) {
        this.dialogVisible = true
      } else {
        this.$router.push({
          path: '/test',
          query: {
            sign: this.$route.query.sign,
            idSign: idSign,
          },
        })
      }
    },
    // 点击进入查看考试页面
    checkPaper(recordId, idSign) {
      this.$router.push({
        path: '/test',
        query: {
          sign: this.$route.query.sign,
          idSign: idSign,
          recordId: recordId,
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
.unit-testing-student {
  ul {
    padding: 0 35px;
    li {
      border-bottom: 1px #dedede solid;
      padding-bottom: 30px;
      margin-top: 30px;
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
          p:nth-child(1) {
            font-size: 16px;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            line-height: 41px;
            cursor: pointer;
          }
          p:nth-child(2) {
            span {
              font-size: 14px;
              font-family: SourceHanSansCN-Regular;
              font-weight: 400;
              color: rgba(153, 153, 153, 1);
              margin-right: 58px;
              cursor: pointer;
              i:nth-child(1) {
                color: #58c6bd;
              }
              i:nth-child(2) {
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
      }
    }
  }
  .team-test-pagination {
    margin-top: 35px;
    margin-left: 340px;
  }
}
</style>
