<template>
  <div class="material">
    <div class="container">
      <header-top content="课程资料">
        <el-button type="primary" @click="dialogBtn">
          上传
        </el-button>
      </header-top>
      <div class="material-el-table">
        <el-table
          :data="allCourseDataList"
          border
          style="width: 100%"
          :header-cell-style="{ background: '#EBEBEB', color: '#333333' }"
        >
          <el-table-column
            prop="dataName"
            label="名称"
            width="294"
            align="center"
          >
            <template slot-scope="scope">
              <div class="el-table-slot-name">
                {{ scope.row.dataName }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="dataSize"
            label="大小"
            width="140"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="createName"
            label="创建人"
            align="center"
            width="160"
          >
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            align="center"
            width="180"
          >
          </el-table-column>
          <el-table-column prop="chapterLevel" label="操作" align="center">
            <template slot-scope="scope">
              <div class="el-table-slot-delete">
                <span @click="deleteTxt(scope.row.sign)">
                  删除
                </span>
                <span @click="editText(scope.row.sign)">
                  编辑
                </span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 上传课程资料 -->
      <el-dialog
        title="上传"
        :visible.sync="dialogFormVisible"
        width="30%"
        :close-on-click-modal="false"
      >
        <el-form :model="form" ref="materialForm" :rules="materialRule">
          <el-form-item
            label="资料名称"
            :label-width="formLabelWidth"
            prop="name"
          >
            <el-input
              v-model="form.name"
              autocomplete="off"
              class="el-dislog-input"
              placeholder="请输入资料名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="资料类型" :label-width="formLabelWidth">
            <el-select
              v-model="typeValue"
              placeholder="请选择资料类型"
              @change="dataType"
            >
              <el-option
                v-for="item in optionsType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="章节ID" :label-width="formLabelWidth">
            <el-select
              v-model="valuePage"
              placeholder="请选择"
              @change="getPageId"
            >
              <el-option
                v-for="item in courseChapterDownList"
                :key="item.chapterId"
                :label="item.chapterName"
                :value="item.chapterId"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-upload
            class="upload-demo"
            :action="uploadUrl"
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
              点击上传
            </el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传音频/文档类型文件，且不超过100M
            </div>
          </el-upload>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">
            取 消
          </el-button>
          <el-button
            type="primary"
            @click="affirmAppendMaterial('materialForm')"
          >
            确 定
          </el-button>
        </div>
      </el-dialog>
      <!-- 修改课程资料 -->
      <el-dialog
        title="修改"
        :visible.sync="dialogAmendVisible"
        width="25%"
        :close-on-click-modal="false"
      >
        <el-input placeholder="请输入新的章节标题" v-model="inputVal" clearable>
        </el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogAmendVisible = false">取 消</el-button>
          <el-button type="primary" @click="affimCharper()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import headerTop from '@/components/header-top/index'

export default {
  data() {
    return {
      uploadValue: '',
      inputVal: '',
      charSign: '',
      uploadUrl: process.env.VUE_APP_BASE_URL + '/file/upload',
      fileListArr: [],
      dialogFormVisible: false,
      dialogAmendVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
      formLabelWidth: '120px',
      optionsType: [
        {
          value: '1',
          label: '文档',
        },
        {
          value: '2',
          label: '录音',
        },
      ],
      typeValue: '',
      valueClass: '',
      theClassId: '',
      valuePage: '',
      isDisable: true,
      dataSize: '',
      dataPath: '',
      materialRule: {
        name: [{ required: true, message: '请输入资料名称', trigger: 'blur' }],
      },
    }
  },
  components: {
    'header-top': headerTop,
  },
  watch: {
    valueClass: function() {
      this.valuePage = ''
    },
  },
  computed: {
    ...mapState('class', {
      allCourseDataList: state => state.allCourseDataList,
      courseDownList: state => state.courseDownList,
      courseChapterDownList: state => state.courseChapterDownList,
    }),
  },
  methods: {
    ...mapActions('class', [
      'getAllCourseDataList',
      'getCourseDownList',
      'getCourseChapterDownList',
      'getAddCourseData',
      'getDeleteCourseData',
      'getUpdateCourseData',
    ]),
    async dialogBtn() {
      this.dialogFormVisible = true
      await this.getCourseDownList()
      await this.getCourseChapterDownList(this.$route.query.sign)
    },
    dataType(value) {
      //console.log(value)
    },
    getPageId(value) {
      //console.log(this.theClassId)
    },
    handleAvatarSuccess(res) {
      this.dataPath = res.data[0].url
    },
    fileListFunc(event, file, fileList) {
      this.fileListArr = fileList
      this.dataSize = file.size
    },
    beforeAvatarUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const isLt100M = file.size / 1024 / 1024 < 100
      const extension = testmsg === 'txt'
      const extension2 = testmsg === 'doc'
      const extension3 = testmsg === 'hlp'
      const extension4 = testmsg === 'wps'
      const extension5 = testmsg === 'pdf'
      const extension6 = testmsg === 'wav'
      const extension7 = testmsg === 'mp3'
      const extension8 = testmsg === 'ram'
      const extension9 = testmsg === 'wma'
      const extension10 = testmsg === 'flac'
      const extension11 = testmsg === 'aif'
      if (
        !extension &&
        !extension2 &&
        !extension3 &&
        !extension4 &&
        !extension5 &&
        !extension6 &&
        !extension7 &&
        !extension8 &&
        !extension9 &&
        !extension10 &&
        !extension11
      ) {
        this.$message({
          message: '上传文件格式不正确！',
          type: 'error',
        })
      }
      if (!isLt100M) {
        this.$message({
          message: '上传文件大小不能超过 100MB!',
          type: 'warning',
        })
      }
      return (
        extension ||
        extension2 ||
        extension3 ||
        extension4 ||
        extension5 ||
        extension6 ||
        extension7 ||
        extension8 ||
        extension9 ||
        extension10 ||
        (extension11 && isLt100M)
      )
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`抱歉，只能添加一个文件/音频`)
    },
    async affirmAppendMaterial() {
      let addCourseDataReqObj = {
        courseIdSign: this.$route.query.sign,
        chapterIdSign: this.valuePage,
        dataName: this.form.name,
        dataPath: this.dataPath,
        dataSize: this.dataSize,
        dataType: parseInt(this.typeValue),
      }
      if (
        addCourseDataReqObj.dataName !== '' &&
        addCourseDataReqObj.dataType !== '' &&
        addCourseDataReqObj.chapterIdSign !== '' &&
        addCourseDataReqObj.courseIdSign !== '' &&
        addCourseDataReqObj.dataSize !== '' &&
        addCourseDataReqObj.dataPath !== ''
      ) {
        this.dialogFormVisible = false
        await this.getAddCourseData(addCourseDataReqObj)
        await this.getAllCourseDataList(addCourseDataReqObj.courseIdSign)
      } else {
        this.$message.error('请正确填写')
      }
    },
    // 删除课程资料
    async deleteTxt(sign) {
      await this.getDeleteCourseData(sign)
      await this.getAllCourseDataList(this.$route.query.sign)
    },
    // 编辑课程资料
    async editText(sign) {
      this.charSign = sign
      this.dialogAmendVisible = true
    },
    // 确认修改课程资料
    async affimCharper() {
      this.dialogAmendVisible = false
      let updateCourseDataReqObj = {
        idSign: this.charSign,
        dataName: this.inputVal,
      }
      await this.getUpdateCourseData(updateCourseDataReqObj)
      await this.getAllCourseDataList(this.$route.query.sign)
    },
  },
  created() {
    this.getAllCourseDataList(this.$route.query.sign)
  },
}
</script>

<style lang="less" scoped>
.material {
  width: 994px;
  height: 722px;
  background: rgba(255, 255, 255, 1);
  float: left;
  .material-el-table {
    width: 994px;
    padding: 0 30px;
    margin-top: 40px;
    .el-table-slot-name {
      width: 273px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .el-table-slot-delete {
      span {
        font-size: 14px;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: rgba(85, 198, 194, 1);
        margin: 0 8px;
        cursor: pointer;
      }
    }
  }
  .el-dislog-input {
    width: 217px;
  }
  .upload-demo {
    margin: 20px 70px 0 70px;
  }
}
</style>
