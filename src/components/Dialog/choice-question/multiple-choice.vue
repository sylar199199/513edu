<template>
  <div>
    <el-dialog
      title="编辑题目"
      :visible.sync="newVisible"
      width="30%"
      :close-on-click-modal="false"
      :show-close="false"
    >
      <el-form
        ref="multipleFrom"
        :model="multipleFrom"
        label-width="100px"
        :rules="rules"
      >
        <el-form-item required label="类型：">
          <el-col :span="9">
            <el-form-item>
              <el-select
                v-model="multipleFrom.typeValue"
                placeholder="请选择"
                disabled
                class="question-bank-numerical-input"
              >
                <el-option
                  v-for="item in multipleFrom.options"
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
                v-model.number="multipleFrom.numericalVal"
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
                v-model.number="multipleFrom.scoreVal"
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
              <el-rate v-model.number="multipleFrom.difficultyVal"></el-rate>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="题目名称：" prop="titleVal">
          <el-input
            placeholder="请输入题目名称"
            v-model="multipleFrom.titleVal"
            type="textarea"
            autosize
          ></el-input>
        </el-form-item>
        <el-form-item
          v-for="(domain, index) in multipleFrom.domains"
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
          <el-radio v-model="multipleFrom.radio" label="A"></el-radio>
          <el-radio v-model="multipleFrom.radio" label="B"></el-radio>
          <el-radio v-model="multipleFrom.radio" label="C"></el-radio>
          <el-radio v-model="multipleFrom.radio" label="D"></el-radio>
          <el-radio v-model="multipleFrom.radio" label="E"></el-radio>
        </el-form-item>
        <el-form-item label="解析：" prop="analysisVal">
          <el-input
            placeholder="请输入题目解析"
            v-model="multipleFrom.analysisVal"
            type="textarea"
            autosize
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDomain">新增选项</el-button>
        <el-button @click="$emit('closeRedactTopic')">取 消</el-button>
        <el-button type="primary" @click="saveTestPaper('multipleFrom')"
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
    multipleFrom: {
      type: Object,
      required: true,
      default: () => {},
    },
    pageNum: {
      type: [String, Number],
      default: 1,
    },
    redactTopicId: {
      type: [String, Number],
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
    ...mapActions('management', [
      'getDeleteExamSubjectOption',
      'getAddExamSubjectOption',
    ]),
    ...mapActions('course-management', [
      'getByExamSubjectChoicesId',
      'getUpdateExamSubjectChoices',
      'getFindExamSubjectChoicesList',
    ]),
    // 删除
    removeDomain(item) {
      var index = this.multipleFrom.domains.indexOf(item)
      if (index !== -1) {
        this.multipleFrom.domains.splice(index, 1)
      }
      this.getDeleteExamSubjectOption(item.optionId)
    },
    // 添加
    async addDomain() {
      let str = 'ABCDEFGHI'
      this.num++
      this.multipleFrom.domains.push({
        optionContent: '',
        optionName: str.substr(this.num, 1),
      })
      let addExamSubjectOptionReqObj = {
        optionContent: '',
        optionName: str.substr(this.num, 1),
        subjectId: this.redactTopicId,
      }
      await this.getAddExamSubjectOption(addExamSubjectOptionReqObj)
      await this.getByExamSubjectChoicesId(this.redactTopicId)
      this.$emit('setDomains')
    },
    // 点击保存
    saveTestPaper(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let newOptionList = this.multipleFrom.domains.map(item => {
            if (item.optionName) {
              delete item.optionName
            }
            return item
          })
          let updateExamSubjectChoicesReqObj = {
            id: this.redactTopicId,
            serialNumber: this.multipleFrom.numericalVal,
            score: this.multipleFrom.scoreVal,
            level: this.multipleFrom.difficultyVal,
            subjectName: this.multipleFrom.titleVal,
            optionList: newOptionList,
            answer: this.multipleFrom.radio,
            analysis: this.multipleFrom.analysisVal,
          }
          await this.getUpdateExamSubjectChoices(updateExamSubjectChoicesReqObj)
          let numSizeObj = {
            pageNum: this.pageNum,
            size: 5,
          }
          await this.getFindExamSubjectChoicesList(numSizeObj)
          this.$emit('closeRedactTopic')
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
