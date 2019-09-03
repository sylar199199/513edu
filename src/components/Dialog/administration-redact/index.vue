<template>
  <div>
    <el-dialog
      title="编辑"
      :visible.sync="redactVisible"
      width="30%"
      :close-on-click-modal="false"
      :show-close="false"
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
                v-model="ruleForm.typeOneValue"
                placeholder="请选择"
                disabled
                class="question-bank-numerical-input"
              >
                <el-option
                  v-for="item in ruleForm.optionsOne"
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
            <el-form-item prop="numericalOneVal">
              <el-input
                v-model.number="ruleForm.numericalOneVal"
                placeholder="请输入序号"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item required label="分值：">
          <el-col :span="9">
            <el-form-item prop="scoreOneVal">
              <el-input
                v-model.number="ruleForm.scoreOneVal"
                placeholder="请输入分值"
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
            <el-form-item prop="difficultyOneVal">
              <el-rate v-model.number="ruleForm.difficultyOneVal"></el-rate>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="题目名称：" prop="titleOneVal">
          <el-input
            placeholder="请输入题目名称"
            v-model="ruleForm.titleOneVal"
            type="textarea"
            autosize
          ></el-input>
        </el-form-item>
        <el-form-item
          v-for="(domain, index) in ruleForm.domains"
          :label="'选项' + (index + 1)"
          :key="domain.key"
          :prop="'domains.' + index + '.optionContent'"
          class="el-form-dynamic-state"
          :rules="{
            required: true,
            message: '选项不能为空',
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
        <el-form-item label="正确答案：" prop="radioOne">
          <el-radio v-model="ruleForm.radioOne" label="A"></el-radio>
          <el-radio v-model="ruleForm.radioOne" label="B"></el-radio>
          <el-radio v-model="ruleForm.radioOne" label="C"></el-radio>
          <el-radio v-model="ruleForm.radioOne" label="D"></el-radio>
          <el-radio v-model="ruleForm.radioOne" label="E"></el-radio>
        </el-form-item>
        <el-form-item label="解析：" prop="analysisOneVal">
          <el-input
            placeholder="请输入题目解析："
            v-model="ruleForm.analysisOneVal"
            type="textarea"
            autosize
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDomain">新增选项</el-button>
        <el-button @click="$emit('redactCloseDiaLog')">取 消</el-button>
        <el-button type="primary" @click="saveRedactTopic('ruleForm')"
          >保 存</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: {
    redactVisible: {
      type: Boolean,
      required: true,
    },
    ruleForm: {
      type: Object,
      required: true,
      default: () => {},
    },
    redactTopicId: {
      type: String,
    },
  },
  data() {
    return {
      rules: {
        titleOneVal: [
          { required: true, message: '请输入题目名称', trigger: 'blur' },
        ],
        analysisOneVal: [
          { required: true, message: '请输入题目解析', trigger: 'blur' },
        ],
        numericalOneVal: [
          { required: true, message: '序号不能为空' },
          { type: 'number', message: '序号必须为数字值' },
        ],
        scoreOneVal: [
          { required: true, message: '分值不能为空' },
          { type: 'number', message: '分值必须为数字值' },
        ],
        radioOne: [
          { required: true, message: '请选择题目正确答案', trigger: 'change' },
        ],
        difficultyOneVal: [
          { required: true, message: '请选择题目难度', trigger: 'change' },
        ],
      },
      num: 3,
    }
  },
  computed: {
    ...mapState('management', {
      byExamSubjectChoicesReleased: state => state.byExamSubjectChoicesReleased,
    }),
  },
  methods: {
    ...mapActions('management', [
      'getUpdateExamSubjectChoicesCopy',
      'getAllExaminationSubject',
      'getDeleteExamSubjectOptionCopy',
      'getAddExamSubjectOptionCopy',
      'getByExamSubjectChoicesReleased',
    ]),
    // 删除
    removeDomain(item) {
      var index = this.ruleForm.domains.indexOf(item)
      if (index !== -1) {
        this.ruleForm.domains.splice(index, 1)
      }
      this.getDeleteExamSubjectOptionCopy(item.optionId)
    },
    // 添加
    async addDomain() {
      let str = 'ABCDEFGHI'
      this.num++
      this.ruleForm.domains.push({
        optionContent: '',
        optionName: str.substr(this.num, 1),
      })
      let addExamSubjectOptionReqObj = {
        optionContent: '',
        optionName: str.substr(this.num, 1),
        subjectId: this.redactTopicId,
      }
      await this.getAddExamSubjectOptionCopy(addExamSubjectOptionReqObj)
      await this.getByExamSubjectChoicesReleased(this.redactTopicId)
      this.$emit('setDomains')
    },
    // 点击保存
    saveRedactTopic(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let newOptionList = this.ruleForm.domains.map(item => {
            if (item.optionName) {
              delete item.optionName
            }
            return item
          })
          let addExamSubjectChoicesReqObj = {
            analysis: this.ruleForm.analysisOneVal,
            answer: this.ruleForm.radioOne,
            level: this.ruleForm.difficultyOneVal,
            optionList: newOptionList,
            score: this.ruleForm.scoreOneVal,
            serialNumber: this.ruleForm.numericalOneVal,
            subjectName: this.ruleForm.titleOneVal,
            id: this.redactTopicId,
          }
          await this.getUpdateExamSubjectChoicesCopy(
            addExamSubjectChoicesReqObj,
          )
          await this.getAllExaminationSubject(this.$route.query.idSign)
          this.$emit('redactCloseDiaLog')
        } else {
          this.$message.error('请正确填写')
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.el-form-dynamic-state {
  .form-dynamic-state-input {
    width: 75%;
    margin-right: 20px;
  }
}
</style>
