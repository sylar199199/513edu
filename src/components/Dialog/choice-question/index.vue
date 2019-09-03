<template>
  <div>
    <el-dialog
      title="添加题目"
      :visible.sync="newVisible"
      width="30%"
      :close-on-click-modal="false"
      :show-close="false"
    >
      <el-form
        ref="choiceFrom"
        :model="choiceFrom"
        label-width="100px"
        :rules="rules"
      >
        <el-form-item required label="类型：">
          <el-col :span="9">
            <el-form-item>
              <el-select
                v-model="choiceFrom.typeValue"
                placeholder="请选择"
                disabled
                class="question-bank-numerical-input"
              >
                <el-option
                  v-for="item in choiceFrom.options"
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
                v-model.number="choiceFrom.numericalVal"
                placeholder="请输入序号"
                class="question-bank-numerical-input"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item required label="分值：">
          <el-col :span="9">
            <el-form-item prop="scoreVal">
              <el-input
                v-model.number="choiceFrom.scoreVal"
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
            <el-form-item prop="difficultyVal">
              <el-rate v-model.number="choiceFrom.difficultyVal"></el-rate>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="题目名称：" prop="titleVal">
          <el-input
            placeholder="请输入题目名称"
            v-model="choiceFrom.titleVal"
            type="textarea"
            autosize
          ></el-input>
        </el-form-item>
        <el-form-item
          v-for="(domain, index) in choiceFrom.domains"
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
          <el-radio v-model="choiceFrom.radio" label="A"></el-radio>
          <el-radio v-model="choiceFrom.radio" label="B"></el-radio>
          <el-radio v-model="choiceFrom.radio" label="C"></el-radio>
          <el-radio v-model="choiceFrom.radio" label="D"></el-radio>
          <el-radio v-model="choiceFrom.radio" label="E"></el-radio>
        </el-form-item>
        <el-form-item label="解析：" prop="analysisVal">
          <el-input
            placeholder="请输入题目解析"
            v-model="choiceFrom.analysisVal"
            type="textarea"
            autosize
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDomain">新增选项</el-button>
        <el-button @click="$emit('closeChoice')">取 消</el-button>
        <el-button type="primary" @click="saveTestPaper('choiceFrom')"
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
    newVisible: {
      type: Boolean,
      required: true,
    },
    choiceFrom: {
      type: Object,
      required: true,
      default: () => {},
    },
    pageNum: {
      type: [String, Number],
      default: 1,
    },
  },
  data() {
    return {
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
    }
  },
  methods: {
    ...mapActions('course-management', [
      'getAddExamSubjectChoices',
      'getFindExamSubjectChoicesList',
    ]),
    // 删除
    removeDomain(item) {
      var index = this.choiceFrom.domains.indexOf(item)
      if (index !== -1) {
        this.choiceFrom.domains.splice(index, 1)
      }
    },
    // 添加
    addDomain() {
      let str = 'ABCDEFGHI'
      this.num++
      this.choiceFrom.domains.push({
        optionContent: '',
        optionName: str.substr(this.num, 1),
      })
    },
    // 点击保存
    saveTestPaper(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let addExamSubjectChoicesReqObj = {
            analysis: this.choiceFrom.analysisVal,
            answer: this.choiceFrom.radio,
            level: this.choiceFrom.difficultyVal,
            optionList: this.choiceFrom.domains,
            score: this.choiceFrom.scoreVal,
            serialNumber: this.choiceFrom.numericalVal,
            subjectNam: this.choiceFrom.titleVal,
          }
          await this.getAddExamSubjectChoices(addExamSubjectChoicesReqObj)
          let numSizeObj = {
            pageNum: this.pageNum,
            size: 5,
          }
          await this.getFindExamSubjectChoicesList(numSizeObj)
          this.$emit('closeChoice')
          this.choiceFrom.analysisVal = ''
          this.choiceFrom.radio = '1'
          this.choiceFrom.difficultyVal = null
          this.choiceFrom.domains = [
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
          ]
          this.choiceFrom.scoreVal = ''
          this.choiceFrom.numericalVal = ''
          this.choiceFrom.titleVal = ''
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
