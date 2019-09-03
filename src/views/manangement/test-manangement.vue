<template>
  <div class="test-manangement">
    <div class="test-manangement-title">
      试卷题目管理
    </div>
    <div class="test-manangement-table">
      <el-table
        :data="newAllExaminationSubject"
        height="400"
        border
        style="width: 100%"
        :header-cell-style="{ background: '#F0F0F0', color: '#333333' }"
      >
        <el-table-column type="index" label="序号" width="60" align="center">
        </el-table-column>
        <el-table-column prop="subjectName" label="题目名称" align="center">
          <template slot-scope="scope">
            <div class="el-table-slot-title">
              {{ scope.row.subjectName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="score" label="分值" width="60" align="center">
        </el-table-column>
        <el-table-column prop="level" label="难度" width="160" align="center">
          <template slot-scope="scope">
            <el-rate :value="scope.row.level" disabled></el-rate>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="180"
          align="center"
          v-if="!$route.query.released"
        >
          <template slot-scope="scope">
            <span @click="redactTopic(scope.row.idSign)">编辑</span>
            <span @click="deleteTopic(scope.row.idSign)">移除</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center" v-else>
          <template slot-scope="scope">
            <span @click="detailTopic(scope.row.idSign)">详情</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="test-manangement-new" v-if="!$route.query.released">
      <el-button type="primary" @click="goSingleQuestions">
        从题库选填
      </el-button>
      <el-button type="warning" @click="newTopic">
        新建题目
      </el-button>
    </div>
    <div class="test-manangement-save">
      <el-button @click="goBack">
        返 回
      </el-button>
    </div>
    <!-- 新建选择题 -->
    <el-dialog
      title="添加题目"
      :visible.sync="newVisible"
      width="30%"
      :close-on-click-modal="false"
    >
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        label-width="100px"
        :rules="rules"
      >
        <el-form-item required label="类型：">
          <el-col :span="9">
            <el-form-item>
              <el-select
                v-model="ruleForm.typeValue"
                placeholder="请选择"
                disabled
                class="question-bank-numerical-input"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">
            -
          </el-col>
          <el-col class="line" :span="3">
            序号：
          </el-col>
          <el-col :span="9">
            <el-form-item prop="numericalVal">
              <el-input
                v-model.number="ruleForm.numericalVal"
                placeholder="请输入内容"
                class="question-bank-numerical-input"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item required label="分值：">
          <el-col :span="9">
            <el-form-item prop="scoreVal">
              <el-input
                v-model.number="ruleForm.scoreVal"
                placeholder="请输入内容"
                class="question-bank-numerical-input"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">
            -
          </el-col>
          <el-col class="line" :span="4">
            难度：
          </el-col>
          <el-col :span="9">
            <el-form-item prop="difficultyVal">
              <el-rate
                v-model.number="ruleForm.difficultyVal"
                class="question-bank-difficulty"
                @change="handDifficulty"
              ></el-rate>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="题目名称：" prop="titleVal">
          <el-input
            placeholder="请输入题目名称"
            v-model="ruleForm.titleVal"
            type="textarea"
            autosize
          ></el-input>
        </el-form-item>
        <el-form-item
          v-for="(domain, index) in ruleForm.domains"
          :label="'选项' + (index + 1) + '：'"
          :key="domain.key"
          :prop="'domains.' + index + '.optionContent'"
          class="el-form-dynamic-state"
          :rules="{
            required: true,
            message: '题目不能为空',
            trigger: 'blur',
          }"
        >
          <el-input
            v-model="domain.optionContent"
            class="form-dynamic-state-input"
            type="textarea"
            autosize
          ></el-input>
          <el-button @click.prevent="removeDomain(domain)">
            删除
          </el-button>
        </el-form-item>
        <el-form-item label="正确答案：" prop="radio">
          <el-radio v-model="ruleForm.radio" label="A"></el-radio>
          <el-radio v-model="ruleForm.radio" label="B"></el-radio>
          <el-radio v-model="ruleForm.radio" label="C"></el-radio>
          <el-radio v-model="ruleForm.radio" label="D"></el-radio>
          <el-radio v-model="ruleForm.radio" label="E"></el-radio>
        </el-form-item>
        <el-form-item label="解析：" prop="analysisVal">
          <el-input
            placeholder="请输入题目解析："
            v-model="ruleForm.analysisVal"
            type="textarea"
            autosize
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDomain">新增选项</el-button>
        <el-button @click="newVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveTopic('ruleForm')"
          >保 存</el-button
        >
        <el-button type="primary" :disabled="isShow" @click="saveBinAdd"
          >保存并添加</el-button
        >
      </span>
    </el-dialog>
    <!-- 编辑选择题 -->
    <administration-redact
      :redact-visible="redactVisible"
      @redactCloseDiaLog="redactCloseDiaLog"
      @setDomains="setDomains"
      :rule-form="ruleFormEdit"
      :redact-topic-id="redactTopicId"
    />
    <!-- 选择题详情 -->
    <Detail-Dialog
      :details-visible="detailsVisible"
      @closeDialog="closeDialog"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import DetailDialog from '@components/Dialog/DetailDialog'
import administrationRedact from '@components/Dialog/administration-redact/index'

export default {
  data() {
    return {
      isShow: true,
      newVisible: false,
      ruleForm: {
        typeValue: '1',
        numericalVal: '',
        scoreVal: '',
        difficultyVal: null,
        titleVal: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        optionE: '',
        radio: '1',
        analysisVal: '',
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
      },
      num: 3,
      rules: {
        titleVal: [
          { required: true, message: '请输入题目名称', trigger: 'blur' },
        ],
        analysisVal: [
          { required: true, message: '请输入题目解析', trigger: 'blur' },
        ],
        numericalVal: [
          { required: true, message: '序号不能为空' },
          { type: 'number', message: '序号必须为数字值' },
        ],
        scoreVal: [
          { required: true, message: '分值不能为空' },
          { type: 'number', message: '分值必须为数字值' },
        ],
        radio: [
          { required: true, message: '请选择题目正确答案', trigger: 'change' },
        ],
        difficultyVal: [
          { required: true, message: '请选择题目难度', trigger: 'change' },
        ],
      },
      options: [
        {
          value: '1',
          label: '选择题',
        },
      ],
      numericalVal: '',
      redactVisible: false,
      ruleFormEdit: {
        typeOneValue: '1',
        optionsOne: [
          {
            value: '1',
            label: '选择题',
          },
        ],
        numericalOneVal: '',
        scoreOneVal: '',
        difficultyOneVal: null,
        titleOneVal: '',
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
        radioOne: '1',
        analysisOneVal: '',
      },
      redactTopicId: '',
      detailsVisible: false,
    }
  },
  components: {
    'Detail-Dialog': DetailDialog,
    'administration-redact': administrationRedact,
  },
  computed: {
    ...mapState('management', {
      allExaminationSubject: state => state.allExaminationSubject,
      byExamSubjectChoicesReleased: state => state.byExamSubjectChoicesReleased,
    }),
    ...mapState('course-management', {
      subjectId: state => state.subjectId,
      examSubjectChoicesIdList: state => state.examSubjectChoicesIdList,
    }),
    newAllExaminationSubject() {
      let list = this.allExaminationSubject.map(item => {
        if (item.level) {
          item.level = parseInt(item.level)
        }
        return item
      })
      return list
    },
  },
  methods: {
    // 删除
    removeDomain(item) {
      var index = this.ruleForm.domains.indexOf(item)
      if (index !== -1) {
        this.ruleForm.domains.splice(index, 1)
      }
    },
    // 添加
    addDomain() {
      let str = 'ABCDEFGHI'
      this.num++
      this.ruleForm.domains.push({
        optionContent: '',
        optionName: str.substr(this.num, 1),
      })
    },
    // 点击新增动态框新增一个
    setDomains() {
      this.ruleFormEdit.domains = this.byExamSubjectChoicesReleased.examSubjectOptionVoList
    },
    ...mapActions('management', [
      'getAllExaminationSubject',
      'getDeleteExaminationSubject',
      'getAddExaminationSubject',
      'getByExamSubjectChoicesReleased',
    ]),
    ...mapActions('course-management', [
      'getAddExamSubjectChoices',
      'getByExamSubjectChoicesId',
      'getUpdateExamSubjectChoices',
    ]),
    // 删除题目
    async deleteTopic(sign) {
      let deleteExaminationSubjectReqObj = {
        examinationId: this.$route.query.idSign,
        subjectId: sign,
      }
      await this.getDeleteExaminationSubject(deleteExaminationSubjectReqObj)
      await this.getAllExaminationSubject(this.$route.query.idSign)
    },
    // 点击编辑
    async redactTopic(sign) {
      this.redactTopicId = sign
      this.redactVisible = true
      await this.getByExamSubjectChoicesReleased(sign)
      this.ruleFormEdit.numericalOneVal = this.byExamSubjectChoicesReleased.serialNumber
      this.ruleFormEdit.scoreOneVal = this.byExamSubjectChoicesReleased.score
      this.ruleFormEdit.difficultyOneVal = parseInt(
        this.byExamSubjectChoicesReleased.level,
      )
      this.ruleFormEdit.titleOneVal = this.byExamSubjectChoicesReleased.subjectName
      this.ruleFormEdit.analysisOneVal = this.byExamSubjectChoicesReleased.analysis
      this.ruleFormEdit.radioOne = this.byExamSubjectChoicesReleased.answer
      this.ruleFormEdit.domains = this.byExamSubjectChoicesReleased.examSubjectOptionVoList
    },
    // 点击取消
    redactCloseDiaLog() {
      this.redactVisible = false
    },
    // 点击详情
    detailTopic(idSign) {
      this.detailsVisible = true
      this.getByExamSubjectChoicesReleased(idSign)
    },
    // 点击关闭详情弹窗
    closeDialog() {
      this.detailsVisible = false
    },
    // 分值变化时
    handDifficulty(val) {
      this.difficultyVal = val
    },
    // 分值变化时
    handOneDifficulty(val) {
      this.ruleForm.difficultyOneVal = val
    },
    // 新建题目
    newTopic() {
      this.newVisible = true
    },
    // 确认保存题目
    async saveTopic(formName) {
      let addExamSubjectChoicesReqObj = {
        analysis: this.ruleForm.analysisVal,
        answer: this.ruleForm.radio,
        level: this.ruleForm.difficultyVal,
        optionList: this.ruleForm.domains,
        score: this.ruleForm.scoreVal,
        serialNumber: this.ruleForm.numericalVal,
        subjectNam: this.ruleForm.titleVal,
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.getAddExamSubjectChoices(addExamSubjectChoicesReqObj)) {
            this.isShow = false
          } else {
            this.isShow = true
          }
        } else {
          this.$message.error('请正确填写')
        }
      })
    },
    // 保存并添加
    async saveBinAdd() {
      let addExaminationSubjectReqObj = {
        examinationId: this.$route.query.idSign,
        subjectIdList: this.subjectId.split(','),
      }
      await this.getAddExaminationSubject(addExaminationSubjectReqObj)
      await this.getAllExaminationSubject(this.$route.query.idSign)
      this.newVisible = false
      this.isShow = true
    },
    // 点击返回会首页
    goBack() {
      this.$router.push({
        path: '/course-management/unit-testing',
        query: {
          sign: this.$route.query.sign,
        },
      })
      // this.getAllExaminationSubject(this.$route.query.idSign)
    },
    // 点击进入题库选题
    goSingleQuestions() {
      this.$router.push({
        path: '/single-questions',
        query: {
          sign: this.$route.query.sign,
          idSign: this.$route.query.idSign,
        },
      })
    },
  },
  created() {
    this.getAllExaminationSubject(this.$route.query.idSign)
  },
}
</script>

<style lang="less" scoped>
.test-manangement {
  min-height: 722px;
  width: 994px;
  background: #fff;
  margin-left: 10px;
  float: left;
  .test-manangement-title {
    line-height: 60px;
    height: 60px;
    padding-left: 30px;
    border-bottom: 1px #eee solid;
    font-size: 18px;
    font-family: SourceHanSansCN-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
  }
  .test-manangement-table {
    padding: 0 15px;
    margin-top: 50px;
    .el-table-slot-title {
      width: 482px;
      height: 23px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    span {
      font-size: 14px;
      font-family: SourceHanSansCN-Regular;
      font-weight: 400;
      color: rgba(88, 198, 189, 1);
      margin-right: 15px;
      cursor: pointer;
    }
  }
  .test-manangement-new {
    margin-top: 40px;
    margin-left: 50px;
  }
  .test-manangement-save {
    margin-top: 40px;
    margin-left: 400px;
  }
  .question-bank-numerical {
    margin-bottom: 20px;
    line-height: 40px;
    display: flex;
    justify-content: space-around;
    p {
      width: 40%;
      display: flex;
      height: 40px;
      line-height: 40px;
      .question-bank-numerical-input {
        width: 150px;
      }
      .question-bank-difficulty {
        position: relative;
        top: 10px;
      }
    }
    .question-bank-numerical-weird {
      width: 460px;
    }
  }
  .question-bank-right-answers {
    display: flex;
    margin-bottom: 20px;
    p {
      margin-right: 10px;
    }
  }
  .el-form-dynamic-state {
    .form-dynamic-state-input {
      width: 75%;
      margin-right: 20px;
    }
  }
}
</style>
