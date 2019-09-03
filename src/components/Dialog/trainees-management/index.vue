<template>
  <div>
    <el-dialog
      title="导 入"
      :visible.sync="traineesVisible"
      width="30%"
      :close-on-click-modal="false"
      :show-close="false"
    >
      <div>
        <el-upload
          class="upload-demo"
          :action="uploadUrl"
          :data="fileList"
          multiple
          :limit="1"
          :with-credentials="true"
          :on-exceed="handleExceed"
          :file-list="fileListArr"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :on-progress="fileListFunc"
        >
          <el-button size="small" type="primary">
            导 入
          </el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传xlsx/xls类型文件，且不超过1M
          </div>
        </el-upload>
      </div>
      <div class="trainess-dialog-shuoming">
        <div class="warm-prompt">
          温馨提示：
        </div>
        <div class="warm-prompt-main">
          <p>1、请严格按照模板内容上传文件，否则有可能导致上传失败。</p>
          <p>2、学生学号唯一，不可重复，需真实填写学生姓名。</p>
          <p>3、请勿上传重复记录，带*号列为必填项，其余为选填项。</p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('closeTraineesVisible')">取 消</el-button>
        <el-button type="primary" @click="handleSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: {
    traineesVisible: {
      type: Boolean,
      required: true,
    },
    pageNum: {
      type: [String, Number],
    },
  },
  data() {
    return {
      uploadUrl:
        process.env.VUE_APP_BASE_URL + '/courseStudyProgress/importExcel',
      fileListArr: [],
      fileList: {
        sign: this.$route.query.sign,
      },
    }
  },
  methods: {
    ...mapActions('message', ['getFindStudentList']),
    handleExceed(files, fileList) {
      this.$message.warning(`抱歉，只能添加一个文件/音频`)
    },
    handleAvatarSuccess(res) {
      this.dataPath = res.data ? res.data[0].url : ''
    },
    fileListFunc(event, file, fileList) {
      this.fileListArr = fileList
      this.dataSize = file.size
    },
    beforeAvatarUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const isLt100M = file.size / 1024 / 1024 < 1
      const extension = testmsg === 'xlsx'
      const extension2 = testmsg === 'xls'
      if (!extension && !extension2) {
        this.$message({
          message: '上传文件格式不正确！',
          type: 'error',
        })
      }
      if (!isLt100M) {
        this.$message({
          message: '上传文件大小不能超过 1MB!',
          type: 'warning',
        })
      }
      return extension || (extension2 && isLt100M)
    },
    // 点击保存
    async handleSave() {
      this.$emit('closeTraineesVisible')
      let searchReqObj = {
        courseId: this.$route.query.sign,
        page: this.pageNum,
        size: 8,
      }
      await this.getFindStudentList(searchReqObj)
    },
  },
}
</script>

<style lang="less" scoped>
.trainess-dialog-shuoming {
  margin-top: 50px;
  .warm-prompt {
    font-size: 12px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
  }
  .warm-prompt-main {
    margin-left: 50px;
    p {
      font-size: 12px;
      line-height: 40px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(235, 69, 45, 1);
    }
  }
}
</style>
