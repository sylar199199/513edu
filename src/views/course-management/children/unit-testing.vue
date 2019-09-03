<template>
  <div class="unit-testing-main">
    <div v-if="userProfile === 'teacher'">
      <div class="unit-testing-list">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="单元测试" name="first">
            <team-test ref="teamTest" />
          </el-tab-pane>
          <el-tab-pane label="题库" name="second">
            <question-bank ref="question" />
          </el-tab-pane>
        </el-tabs>
        <el-button
          type="primary"
          class="unit-testing-button"
          @click="addTestPaper"
        >
          {{ btnContent }}
        </el-button>
      </div>
    </div>
    <div v-else>
      <unit-testing-student />
    </div>
    <!-- 新建选择题 -->
    <choice-question
      :new-visible="newVisible"
      @closeChoice="closeChoice"
      :choice-from="choiceFrom"
      :page-num="pageNum"
    />
    <!-- 新建试卷 -->
    <el-dialog
      title="添加试卷"
      :visible.sync="testVisible"
      width="25%"
      :close-on-click-modal="false"
    >
      <el-form ref="form" :model="form" label-width="80px" :rules="rulesPaper">
        <el-form-item label="名称" prop="title">
          <el-input
            v-model="form.title"
            placeholder="请输入课程名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="时长" prop="time">
          <el-input
            v-model.number="form.time"
            placeholder="请输入课程时长"
          ></el-input>
        </el-form-item>
        <el-form-item label="总分" prop="score">
          <el-input
            v-model.number="form.score"
            placeholder="请输入课程总分"
          ></el-input>
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
        <el-form-item label="时间" prop="date1">
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
        <el-button type="primary" @click="saveTest('form')">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import questionBank from './unit-testing/question-bank'
import teamTest from './unit-testing/team-test'
import unitTestingStudent from '../../manangement/unit-testing-student'
import choiceQuestion from '@/components/Dialog/choice-question'
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      activeName: 'first',
      btnContent: '添加试卷',
      titleMsg: '添加题目',
      newVisible: false,
      choiceFrom: {
        typeValue: '1',
        options: [
          {
            value: '1',
            label: '选择题',
          },
        ],
        numericalVal: '',
        scoreVal: '',
        difficultyVal: null,
        titleVal: '',
        domains: [
          {
            optionContent: '',
            optionName: 'A',
          },
          {
            optionContent: '',
            optionName: 'B',
          },
          {
            optionContent: '',
            optionName: 'C',
          },
          {
            optionContent: '',
            optionName: 'D',
          },
        ],
        analysisVal: '',
        radio: '1',
      },
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
      rulesPaper: {
        title: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        time: [
          { required: true, message: '请输入课程时长' },
          { type: 'number', message: '课程时长必须为数字值' },
        ],
        score: [
          { required: true, message: '请输入课程总分' },
          { type: 'number', message: '课程总分必须为数字值' },
        ],
        type: [
          { required: true, message: '请输入课程类型', trigger: 'change' },
        ],
        date1: [{ required: true, message: '请输入课程时间', trigger: 'blur' }],
        explain: [
          { required: true, message: '请输入课程说明', trigger: 'blur' },
        ],
      },
      pageNum: '',
    }
  },
  watch: {
    activeName: function() {
      if (this.activeName === 'first') {
        this.btnContent = '添加试卷'
      } else {
        this.btnContent = '添加题目'
      }
    },
  },
  computed: {
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
  components: {
    'question-bank': questionBank,
    'team-test': teamTest,
    'unit-testing-student': unitTestingStudent,
    'choice-question': choiceQuestion,
  },
  methods: {
    ...mapActions('course-management', [
      'getAddExamSubjectChoices',
      'getFindExamSubjectChoicesList',
      'getAddExamination',
      'getFindExamExaminationList',
    ]),
    handleClick(tab) {
      if (tab.label === '题库') {
        let numSizeObj = {
          pageNum: this.pageNum,
          size: 5,
        }
        this.getFindExamSubjectChoicesList(numSizeObj)
      }
    },
    // 点击关闭新增选择题
    closeChoice() {
      this.newVisible = false
    },
    // 添加题目
    addTestPaper() {
      if (this.btnContent === '添加题目') {
        this.newVisible = true
        this.pageNum = this.$refs.question.pageNum
      } else if (this.btnContent === '添加试卷') {
        this.testVisible = true
      }
    },
    // 添加试卷
    // 确认添加试卷
    saveTest(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          this.testVisible = false
          let addExaminationReqObj = {
            attention: this.form.explain,
            courseIdSign: this.$route.query.sign,
            endTime: this.form.date2.toLocaleDateString().replace(/\//g, '-'),
            examTime: this.form.time,
            examinationName: this.form.title,
            startTime: this.form.date1.toLocaleDateString().replace(/\//g, '-'),
            totalScore: this.form.score,
            type: this.form.type,
          }
          await this.getAddExamination(addExaminationReqObj)
          let courseTeacherReqObj = {
            courseIdSign: this.$route.query.sign,
            page: this.$refs.teamTest.page,
            size: 4,
          }
          await this.getFindExamExaminationList(courseTeacherReqObj)
        } else {
          this.$message.error('请正确填写')
        }
      })
    },
    // 分值变化时
    handDifficulty(val) {
      this.difficultyVal = val
    },
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
  .unit-testing-list {
    padding: 0 30px;
    margin-top: 32px;
    position: relative;
    .unit-testing-button {
      position: absolute;
      top: -15px;
      right: 30px;
    }
  }
  .question-bank-right-answers {
    display: flex;
    margin-bottom: 20px;
    p {
      margin-right: 10px;
    }
  }
}
</style>
