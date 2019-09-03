<template>
  <el-dialog
    title="发布公告"
    :visible.sync="dialogVisible"
    width="25%"
    :close-on-click-modal="false"
    :show-close="false"
  >
    <el-form
      :model="ruleForm"
      status-icon
      label-width="100px"
      class="demo-ruleForm"
      :rules="rules"
      ref="ruleForm"
    >
      <el-form-item label="标题" prop="title">
        <el-input
          type="text"
          v-model="ruleForm.title"
          autocomplete="off"
          placeholder="请输入标题"
        ></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input
          type="textarea"
          v-model="ruleForm.content"
          maxlength="500"
          show-word-limit
          placeholder="请输入内容"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('closeDialog')">取 消</el-button>
      <el-button type="primary" @click="submitNotice('ruleForm')"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: {
    ruleForm: {
      type: Object,
      required: true,
      default: () => {},
    },
    dialogVisible: {
      type: Boolean,
    },
    page: {
      type: [String, Number],
    },
  },
  data() {
    return {
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
      },
    }
  },
  methods: {
    ...mapActions('message', ['getAddMessageInfo', 'getCourseMsgList']),
    async submitNotice(formName) {
      await this.$refs[formName].validate(async valid => {
        if (valid) {
          let addMessageInfoReqObj = {
            content: this.ruleForm.content,
            title: this.ruleForm.title,
            courseId: this.$route.query.sign,
          }
          await this.getAddMessageInfo(addMessageInfoReqObj)
          this.$emit('closeDialog')
          let courseObj = {
            courseIdSign: this.$route.query.sign,
            page: this.page,
            size: 5,
          }
          await this.getCourseMsgList(courseObj)
          this.ruleForm.title = ''
          this.ruleForm.content = ''
        } else {
          this.$message.error('请正确填写')
        }
      })
    },
  },
}
</script>
