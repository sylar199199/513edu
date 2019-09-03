<template>
  <div class="team-test">
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
              <!-- <span>
                已交人数：55
              </span> -->
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
              <!-- <span>
                未交人数：20
              </span> -->
              <span> 考试时长：{{ item.examTime }}分钟 </span>
            </p>
          </div>
          <div class="team-test-left-img">
            <img
              src="../../../../assets/icon/amend @2x.png"
              alt=""
              @click="redactContent(item.idSign)"
            />
            <img
              src="../../../../assets/icon/delete111.png"
              alt=""
              @click="detelePage(item.idSign)"
            />
          </div>
        </div>
        <div class="team-test-right">
          <el-button
            v-if="item.releaseStatus === '已发布'"
            type="primary"
            @click="unpublish(item.idSign)"
          >
            取消发布
          </el-button>
          <el-button v-else type="primary" @click="publish(item.idSign)">
            发 布
          </el-button>
          <el-button
            type="primary"
            @click="criticizesSystem(item.idSign, item.examinationName)"
          >
            批卷
          </el-button>
          <el-button
            type="primary"
            @click="goTestManange(item.idSign, item.releaseStatus)"
          >
            管理
          </el-button>
          <el-button type="primary" @click="goToTest(item.idSign)">
            查看试卷
          </el-button>
        </div>
      </li>
    </ul>
    <!-- 编辑试卷 -->
    <el-dialog
      title="修改试卷"
      :visible.sync="testVisible"
      width="25%"
      :close-on-click-modal="false"
      :show-close="false"
    >
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="名称" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="时长" prop="time">
          <el-input v-model.number="form.time"></el-input>
        </el-form-item>
        <el-form-item label="总分" prop="score">
          <el-input v-model.number="form.score"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择考试类型">
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="考试开始时间"
              v-model="form.date1"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">
            -
          </el-col>
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="考试结束时间"
              v-model="form.date2"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="说明" prop="explain">
          <el-input type="textarea" v-model="form.explain"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="testVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRedact('form')">保 存</el-button>
      </span>
    </el-dialog>
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
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      page: 1,
      testVisible: false,
      form: {
        title: '',
        time: '',
        score: '',
        type: '',
        date1: '',
        date2: '',
        explain: '',
      },
      rules: {
        title: [{ required: true, message: '请填写考试名称', trigger: 'blur' }],
        explain: [
          { required: true, message: '请填写考试说明', trigger: 'blur' },
        ],
        time: [
          { required: true, message: '时长不能为空' },
          { type: 'number', message: '时长必须为数字值' },
        ],
        score: [
          { required: true, message: '总分不能为空' },
          { type: 'number', message: '总分必须为数字值' },
        ],
        type: [
          { required: true, message: '请选择考试类型', trigger: 'change' },
        ],
      },
      typeList: [
        {
          label: '单元测试',
          value: 1,
        },
        {
          label: '期末考试',
          value: 3,
        },
      ],
      idSign: '',
    }
  },
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
    ...mapActions('management', [
      'getDeleteExamination',
      'getByExaminationId',
      'getUpdateExamination',
      'getUpdateExamination',
      'getUpdateReleaseStatus',
    ]),
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

    // 点击编辑编辑当前信息
    async redactContent(idSign) {
      this.idSign = idSign
      this.testVisible = true
      await this.getByExaminationId(idSign)
      this.form.title = this.byExaminationIdList.examinationName
      this.form.time = this.byExaminationIdList.examTime
      this.form.score = this.byExaminationIdList.totalScore
      this.form.explain = this.byExaminationIdList.attention
      this.form.date1 = this.byExaminationIdList.startTime
      this.form.date2 = this.byExaminationIdList.endTime
      this.form.type = this.byExaminationIdList.type === '期末考试' ? 3 : 1
    },
    // 确认保存修改
    saveRedact(formName) {
      let updateExaminationReqObj = {
        attention: this.form.explain,
        courseIdSign: this.$route.query.sign,
        endTime:
          this.form.date2 ||
          this.form.date2.toLocaleDateString().replace(/\//g, '-'),
        examTime: this.form.time,
        examinationName: this.form.title,
        idSign: this.idSign,
        startTime:
          this.form.date1 ||
          this.form.date1.toLocaleDateString().replace(/\//g, '-'),
        totalScore: this.form.score,
        type: this.form.type === '期末考试' ? 3 : 1,
      }
      let courseTeacherReqObj = {
        courseIdSign: this.$route.query.sign,
        page: this.page,
        size: 4,
      }
      this.$refs[formName].validate(async valid => {
        if (valid) {
          await this.getUpdateExamination(updateExaminationReqObj)
          this.testVisible = false
          await this.getFindExamExaminationList(courseTeacherReqObj)
        } else {
          this.$message.error('请正确填写')
        }
      })
    },
    // 删除课程信息
    async detelePage(idSign) {
      await this.getDeleteExamination(idSign)
      let courseTeacherReqObj = {
        courseIdSign: this.$route.query.sign,
        page: this.page,
        size: 4,
      }
      await this.getFindExamExaminationList(courseTeacherReqObj)
    },
    // 取消发布
    async unpublish(idSign) {
      let baseStatusReqObj = {
        sign: idSign,
        status: false,
      }
      await this.getUpdateReleaseStatus(baseStatusReqObj)
      let courseTeacherReqObj = {
        courseIdSign: this.$route.query.sign,
        page: this.page,
        size: 4,
      }
      await this.getFindExamExaminationList(courseTeacherReqObj)
    },
    // 发布
    async publish(idSign) {
      let baseStatusReqObj = {
        sign: idSign,
        status: true,
      }
      await this.getUpdateReleaseStatus(baseStatusReqObj)
      let courseTeacherReqObj = {
        courseIdSign: this.$route.query.sign,
        page: this.page,
        size: 4,
      }
      await this.getFindExamExaminationList(courseTeacherReqObj)
    },

    // 点击管理跳转路由
    goTestManange(idSign, releaseStatus) {
      if (releaseStatus === '已发布') {
        let sign = this.$route.query.sign
        this.$router.push({
          path: '/test-manangement',
          query: {
            sign: sign,
            idSign: idSign,
            released: 'released',
          },
        })
      } else {
        let sign = this.$route.query.sign
        this.$router.push({
          path: '/test-manangement',
          query: {
            sign: sign,
            idSign: idSign,
          },
        })
      }
    },
    // 点击进入查看试卷页面
    goToTest(idSign) {
      let routeData = this.$router.resolve({
        path: '/test',
        query: {
          sign: this.$route.query.sign,
          idSign: idSign,
          roles: 'tea',
        },
      })
      window.open(routeData.href, '_blank')
    },
    // 点击进入批卷页面
    criticizesSystem(idSign, examinationName) {
      let sign = this.$route.query.sign
      let NewexaminationName = encodeURI(examinationName)
      this.$router.push({
        path: '/criticizes-system',
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
.team-test {
  ul {
    min-height: 528px;
    li {
      border-bottom: 1px #dedede solid;
      padding-bottom: 30px;
      padding-top: 20px;
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
</style>
