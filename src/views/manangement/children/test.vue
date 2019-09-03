<template>
  <div class="test">
    <div class="container">
      <div class="test-main">
        <div class="test-left">
          <div class="test-left-top">
            <h1>
              {{ byExaminationIdList.examinationName }}
            </h1>
            <p>
              <span
                >题目数量：
                {{ byExaminationIdList.num }}
              </span>
              <span
                >试卷总分：
                {{ byExaminationIdList.totalScore }}
              </span>
              <span
                >考试时长：
                {{ byExaminationIdList.examTime }}
                分钟</span
              >
            </p>
            <p>说明：{{ byExaminationIdList.attention }}</p>
          </div>
          <div class="test-left-bottom">
            <ul>
              <li
                v-for="(item, index) in newExaminationTwoList"
                :key="item.idSign"
              >
                <div>
                  <p>{{ index + 1 }}. 【选择题】（{{ item.score }}分）</p>
                  <p>
                    <el-rate :value="item.level" disabled></el-rate>
                  </p>
                </div>
                <div>
                  {{ item.subjectName }}
                </div>
                <div>
                  <p>
                    <el-radio-group v-model="radioCheck[index]">
                      <el-radio
                        v-for="child in item.examSubjectOptionVoList"
                        :key="child.optionId"
                        :label="child"
                        @change="getTOpicId(child, item.idSign)"
                      >
                        {{ child.optionName }}. {{ child.optionContent }}
                      </el-radio>
                    </el-radio-group>
                  </p>
                </div>
                <div v-if="$route.query.recordId">
                  <p>
                    【答案】
                  </p>
                  <p>
                    {{ item.answerType }}：<span>{{ item.answer }}</span>
                  </p>
                  <p>
                    【解析】
                  </p>
                  <p>
                    {{ item.analysis }}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="test-right" v-if="$route.query.recordId">
          <div class="test-fixed">
            <p class="test-fixed-huixian">
              提交时间：{{ byRecordIdLIst.endTime }}
            </p>
            <p class="test-fixed-huixian">
              成绩：<span>
                {{ byRecordIdLIst.score }}
              </span>
            </p>
            <p class="test-fixed-huixian">
              正确题数：<span>
                {{ byRecordIdLIst.correctNumber }}
              </span>
            </p>
            <p class="test-fixed-huixian">
              错误题数：<i>
                {{ byRecordIdLIst.incorrectNumber }}
              </i>
            </p>
            <p class="test-fixed-huixian test-fixed-fanhui">
              <el-button type="primary" @click="goToSHangYiJie">
                返回
              </el-button>
            </p>
          </div>
        </div>
        <div class="test-right" v-else-if="$route.query.roles"></div>
        <div class="test-right" v-else>
          <div class="test-fixed">
            <p>剩余时间</p>
            <input type="text" ref="timer" value="" disabled />
            <div class="hand-sublime">
              <el-button type="primary" :disabled="isShow" @click="getChecked">
                提 交
              </el-button>
            </div>
            <p class="test-fixed-tishi">
              提醒：请确保你的网络稳定，并规定时长内完成测试提交，若中途关闭退出则视为提交处理。
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- 确认提交 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="20%"
      :close-on-click-modal="false"
    >
      <span>
        确认提交吗，请仔细检查有没有填写所有的题目！
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitPaper">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      isShow: false,
      radio: '1',
      rateVal: null,
      radioCheck: [],
      dialogVisible: false,
    }
  },
  computed: {
    ...mapState('management', {
      examinationTwoList: state => state.examinationTwoList,
      byExaminationIdList: state => state.byExaminationIdList,
      addExaminationRecord: state => state.addExaminationRecord,
      byRecordIdLIst: state => state.byRecordIdLIst,
    }),
    newExaminationTwoList() {
      let list = this.examinationTwoList.map(item => {
        if (item.level) {
          item.level = parseInt(item.level)
        }
        return item
      })
      return list
    },
  },
  methods: {
    ...mapActions('management', [
      'getExaminationTwoList',
      'getByExaminationId',
      'getAddExaminationRecord',
      'getSubjectExam',
      'getExaminationThereList',
      'getByRecordId',
      'getAddExaminationPaper',
    ]),
    getChecked() {
      this.dialogVisible = true
    },
    // 确认提交试卷
    submitPaper() {
      this.dialogVisible = false
      let newRadioCheck = []
      this.radioCheck.map(item => {
        let radioCheckObj = {
          answer: item.optionName,
          subjectId: item.sign,
        }
        newRadioCheck.push(radioCheckObj)
      })
      let subjectExamReqObj = {
        answerList: newRadioCheck,
        examinationId: this.$route.query.idSign,
        recordId: this.addExaminationRecord,
      }
      if (this.getSubjectExam(subjectExamReqObj)) {
        this.$router.replace({
          path: '/course-management/unit-testing',
          query: {
            sign: this.$route.query.sign,
          },
        })
      }
    },
    // 单选框的change事件
    getTOpicId(val, idSign) {
      //let newVal = val
      val.sign = idSign
      // newVal.optionId = idSign
    },
    // 返回上一级
    goToSHangYiJie() {
      this.$router.push({
        path: '/course-management/unit-testing',
        query: {
          sign: this.$route.query.sign,
        },
      })
    },
  },
  async created() {
    if (this.$route.query.recordId) {
      let examinationSubjectReqObj = {
        examinationId: this.$route.query.idSign,
        recordId: parseInt(this.$route.query.recordId),
      }
      await this.getByExaminationId(this.$route.query.idSign)
      await this.getExaminationThereList(examinationSubjectReqObj)
      await this.getByRecordId(this.$route.query.recordId)
    } else if (this.$route.query.roles) {
      await this.getExaminationTwoList(this.$route.query.idSign)
      await this.getByExaminationId(this.$route.query.idSign)
    } else {
      await this.getAddExaminationRecord(this.$route.query.idSign)
      await this.getExaminationTwoList(this.$route.query.idSign)
      await this.getByExaminationId(this.$route.query.idSign)
      await this.$nextTick(function() {
        let _this = this
        let time = this.$refs.timer
        // 考试时长
        var box = this.byExaminationIdList.examTime * 60
        function fun() {
          if (box < 0) {
            time.value = '考试已结束'
            _this.isShow = true
            let newRadioCheck = []
            _this.radioCheck.map(item => {
              let radioCheckObj = {
                answer: item.optionName,
                subjectId: item.sign,
              }
              newRadioCheck.push(radioCheckObj)
            })
            let subjectExamReqObj = {
              answerList: newRadioCheck,
              examinationId: _this.$route.query.idSign,
              recordId: _this.addExaminationRecord,
            }
            if (_this.getSubjectExam(subjectExamReqObj)) {
              _this.$router.replace({
                path: '/course-management/unit-testing',
                query: {
                  sign: _this.$route.query.sign,
                },
              })
            }
            return
          }
          var t = parseInt(box / 60 / 60 / 24)
          var x = parseInt((box / 60 / 60 / 24 - t) * 24)
          var f = parseInt(((box / 60 / 60 / 24 - t) * 24 - x) * 60)
          var m = parseInt((((box / 60 / 60 / 24 - t) * 24 - x) * 60 - f) * 60)
          time.value = f + '分' + m + '秒'
        }
        fun()
        var cle = setInterval(function() {
          box--
          fun()
          if (box <= 0) {
            _this.isShow = true
            clearInterval(cle)
            time.value = '考试已结束'
            let newRadioCheck = []
            _this.radioCheck.map(item => {
              let radioCheckObj = {
                answer: item.optionName,
                subjectId: item.sign,
              }
              newRadioCheck.push(radioCheckObj)
            })
            let subjectExamReqObj = {
              answerList: newRadioCheck,
              examinationId: _this.$route.query.idSign,
              recordId: _this.addExaminationRecord,
            }
            if (_this.getSubjectExam(subjectExamReqObj)) {
              _this.$router.replace({
                path: '/course-management/unit-testing',
                query: {
                  sign: _this.$route.query.sign,
                },
              })
            }
          }
        }, 1000)
      })
    }
  },
}
</script>

<style lang="less" scoped>
.test {
  width: 100%;
  height: 100%;
  background: #eee;
  padding: 10px 0;
  .test-main {
    display: flex;
    min-height: calc(100vh - 368px);
    position: relative;
    .test-left {
      width: 885px;

      .test-left-top {
        background: #fff;
        min-height: 160px;
        overflow: hidden;
        h1 {
          font-size: 18px;
          text-align: center;
          margin-top: 20px;
          font-family: SourceHanSansCN-Regular;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
        p:nth-child(2) {
          margin: 18px 0;
          display: flex;
          justify-content: space-around;
          span {
            font-size: 14px;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgba(128, 128, 128, 1);
          }
        }
        p:nth-child(3) {
          padding: 0 60px;
          font-size: 14px;
          font-family: SourceHanSansCN-Regular;
          font-weight: 400;
          color: rgba(128, 128, 128, 1);
          line-height: 28px;
        }
      }
      .test-left-bottom {
        background: #fff;
        margin-top: 12px;
        min-height: calc(100vh - 580px);
        ul {
          overflow: hidden;
          li {
            margin-bottom: 30px;
            margin-top: 30px;
            padding: 0 30px;
            div:nth-child(1) {
              display: flex;
              justify-content: space-between;
              p {
                font-size: 16px;
                font-family: SourceHanSansCN-Regular;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
                cursor: pointer;
              }
            }
            div:nth-child(2) {
              font-size: 14px;
              font-family: SourceHanSansCN-Regular;
              font-weight: 400;
              color: rgba(51, 51, 51, 1);
              line-height: 30px;
              cursor: pointer;
              padding-left: 20px;
            }
            div:nth-child(3) {
              padding: 0 20px;
              p {
                line-height: 30px;
                font-size: 14px;
                font-family: SourceHanSansCN-Regular;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
                .el-radio-group {
                  display: flex;
                  flex-flow: column;
                  .el-radio {
                    margin-top: 13px;
                  }
                }
              }
            }
            div:nth-child(4) {
              margin-top: 20px;
              margin-left: 20px;
              background: #f0f0f0;
              padding: 15px;
              p {
                font-size: 14px;
                font-family: SourceHanSansCN-Regular;
                font-weight: 400;
                line-height: 30px;
                color: rgba(51, 51, 51, 1);
                span {
                  color: #58c6bd;
                }
              }
              p:nth-child(2) {
                width: 100%;
                border-bottom: 1px solid #e5e5e5;
              }
            }
          }
        }
      }
    }
    .test-right {
      width: 300px;
      height: 350px;
      margin-left: 15px;
      .test-fixed {
        position: fixed;
        top: 98px;
        width: 300px;
        height: 350px;
        background: #fff;
        p {
          margin-left: 30px;
          font-size: 18px;
          font-family: SourceHanSansCN-Regular;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 41px;
        }
        input:nth-child(2) {
          margin-top: 30px;
          margin-left: 85px;
          font-size: 18px;
          font-family: SourceHanSansCN-Regular;
          font-weight: 400;
          color: red;
          width: 130px;
          height: 50px;
          background: #fff;
          border: 1px #eee solid;
          line-height: 50px;
          text-align: center;
        }
        .hand-sublime {
          margin-top: 40px;
          padding-left: 115px;
        }
        .test-fixed-tishi {
          font-size: 12px;
          line-height: 20px;
          margin: 0 15px;
          margin-top: 40px;
        }
        .test-fixed-huixian {
          margin-top: 20px;
          padding-left: 20px;
          font-size: 14px;
          font-family: SourceHanSansCN-Regular;
          font-weight: 400;
          color: rgba(128, 128, 128, 1);
          line-height: 41px;
          span {
            color: #3ec053;
          }
          i {
            color: #eb452d;
          }
        }
        .test-fixed-fanhui {
          margin-left: 100px;
        }
      }
    }
  }
}
</style>
