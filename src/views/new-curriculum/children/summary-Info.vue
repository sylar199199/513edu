<template>
  <div class="summary-Info">
    <div class="summary-Info-main">
      <div class="summary-Info-left">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="课程名称" prop="name">
            <el-input
              type="textarea"
              v-model="ruleForm.name"
              placeholder="请输入课程名称"
              autosize
            ></el-input>
          </el-form-item>
          <el-form-item label="学科类别" prop="typeVal">
            <el-cascader
              style="width: 100%;"
              v-model="ruleForm.typeVal"
              :options="threeList"
              :props="defaultParams"
              placeholder="请输入学科类别"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="学分" required>
            <el-col :span="9">
              <el-form-item prop="credit">
                <el-input
                  v-model="ruleForm.credit"
                  placeholder="请输入学分"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">
              -
            </el-col>
            <el-col class="line" :span="4">
              学时
            </el-col>
            <el-col :span="9">
              <el-form-item prop="period">
                <el-input
                  v-model="ruleForm.period"
                  placeholder="请输入学时"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="课程价格" required>
            <el-col :span="9">
              <el-form-item>
                <el-input
                  v-model="ruleForm.price"
                  placeholder="请输入课程价格"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">
              元
            </el-col>
            <el-col :span="12">
              <span>（价格空白默认为免费）</span>
            </el-col>
          </el-form-item>
          <el-form-item label="课程简介" prop="introduction">
            <el-input
              type="textarea"
              v-model="ruleForm.introduction"
              placeholder="请输入课程简介"
              autosize
            ></el-input>
          </el-form-item>
          <el-form-item label="课程背景" prop="curriculum">
            <el-input
              type="textarea"
              v-model="ruleForm.curriculum"
              placeholder="请输入课程背景"
              autosize
            ></el-input>
          </el-form-item>
          <el-form-item label="课程目标" prop="objective">
            <el-input
              type="textarea"
              v-model="ruleForm.objective"
              placeholder="请输入课程目标"
              autosize
            ></el-input>
          </el-form-item>
          <el-form-item label="设计原则" prop="design">
            <el-input
              type="textarea"
              v-model="ruleForm.design"
              placeholder="请输入设计原则"
              autosize
            ></el-input>
          </el-form-item>
          <el-form-item label="课程类型" prop="research">
            <el-select
              v-model="ruleForm.research"
              placeholder="请选择课程类型"
              style="width: 100%;"
            >
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="summary-Info-right">
        <div class="summary-head-one">
          <el-upload
            class="avatar-uploader"
            :action="SummaryUploadUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            accept=".jpg,.jpeg,.png,.gif,.bmp,.icon,.JPG,.JPEG,.PNG,.GIF,.BMP"
            :before-upload="beforeAvatarUpload"
            :with-credentials="true"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div class="summary-head-two">
          <div class="summary-head-two-one">
            <img src="../../../assets/icon/wujiaoxing.png" alt="" />
            <span>
              课程封面
            </span>
            <p>
              封面尺寸596*334像素，大小不超过500KB
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="summary-Info-button">
      <el-button type="primary" @click="handleSave('ruleForm')">
        保 存
      </el-button>
      <el-button @click="handleNext">
        下一步
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      ruleForm: {
        name: '',
        typeVal: [],
        credit: '',
        period: '',
        price: '',
        introduction: '',
        curriculum: '',
        objective: '',
        design: '',
        research: '',
      },
      rules: {
        name: [{ required: true, message: '请输入课程名称', trigger: 'blur' }],
        typeVal: [
          { required: true, message: '请输入学科类别', trigger: 'blur' },
        ],
        credit: [{ required: true, message: '请输入学分', trigger: 'blur' }],
        period: [{ required: true, message: '请输入学时', trigger: 'blur' }],
        price: [{ required: true, message: '请输入课程价格', trigger: 'blur' }],
        introduction: [
          { required: true, message: '请输入课程简介', trigger: 'blur' },
        ],
        curriculum: [
          { required: true, message: '请输入课程背景', trigger: 'blur' },
        ],
        objective: [
          { required: true, message: '请输入课程目标', trigger: 'blur' },
        ],
        design: [
          { required: true, message: '请输入设计原则', trigger: 'blur' },
        ],
        research: [
          { required: true, message: '请输入课程类型', trigger: 'blur' },
        ],
      },
      defaultParams: {
        label: 'label',
        value: 'id',
        children: 'children',
      },
      typeOptions: [
        {
          value: '1',
          label: '学分课',
        },
        {
          value: '2',
          label: '公开课',
        },
        {
          value: '3',
          label: '选修课',
        },
      ],
      imageUrl: '',
      SummaryUploadUrl: process.env.VUE_APP_BASE_URL + '/file/upload',
      SummaryPhotoPath: '',
    }
  },
  computed: {
    ...mapState('uploading', {
      threeList: state => state.threeList,
      courseIdSign: state => state.courseIdSign,
    }),
    ...mapState('myCourse', {
      courseIdList: state => state.courseIdList,
    }),
  },
  methods: {
    ...mapActions('uploading', ['getFindCourseThreeList', 'getAddCourse']),
    ...mapMutations('uploading', ['handleStep']),
    ...mapActions('myCourse', ['getCourseId', 'getUpdateCourse']),
    // 点击保存
    handleSave(formName) {
      if (this.$route.query.id) {
        let summaryObj = {
          ruleForm: this.ruleForm,
          coursePicture: this.SummaryPhotoPath || this.imageUrl,
          idSign: this.$route.query.id,
        }
        this.getUpdateCourse(summaryObj)
      } else {
        this.$refs[formName].validate(valid => {
          if (valid) {
            let summaryObj = {
              ruleForm: this.ruleForm,
              coursePicture: this.SummaryPhotoPath || this.imageUrl,
            }
            this.getAddCourse(summaryObj)
          } else {
            this.$message.error('请正确填写')
            return false
          }
        })
      }
    },
    // 点击下一步
    handleNext() {
      if (this.$route.query.id) {
        this.handleStep(2)
        this.$router.push({
          path: '/new-curriculum/team-teachers',
          query: {
            courseIdSign: this.$route.query.id,
            id: this.$route.query.id,
          },
        })
      } else {
        if (localStorage.getItem('courseIdSign')) {
          this.handleStep(2)
          this.$router.push({
            path: '/new-curriculum/team-teachers',
            query: {
              courseIdSign: localStorage.getItem('courseIdSign'),
            },
          })
        } else {
          this.$message.error('请确保您以正确填写并保存')
        }
      }
    },
    // 成功回调
    handleAvatarSuccess(res, file) {
      if (res.code === 1) {
        this.SummaryPhotoPath = res.data[0].url
        this.$message.success(res.msg)
        this.imageUrl = URL.createObjectURL(file.raw)
      } else {
        this.$message.error(res.msg)
      }
    },
    // 控制图片上传类型
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 < 500
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 500KB!')
      }
      return isLt2M
    },
  },
  created() {
    this.getFindCourseThreeList()
  },
  async mounted() {
    if (this.$route.query.id) {
      await this.getCourseId(this.$route.query.id)
      this.ruleForm.name = this.courseIdList.courseName
      this.ruleForm.typeVal = [
        this.courseIdList.gradeOne,
        this.courseIdList.gradeTwo,
        this.courseIdList.gradeThree,
      ]
      this.ruleForm.credit = this.courseIdList.courseScore
      this.ruleForm.period = this.courseIdList.courseTime
      this.ruleForm.price = this.courseIdList.coursePrice
      this.ruleForm.introduction = this.courseIdList.content
      this.ruleForm.curriculum = this.courseIdList.courseDescribe
      this.ruleForm.objective = this.courseIdList.courseNotice
      this.ruleForm.design = this.courseIdList.knowledge
      this.ruleForm.research = this.courseIdList.type
      this.imageUrl = this.courseIdList.coursePicture

      // 添加cookie
    }
  },
}
</script>

<style lang="less" scoped>
.summary-Info {
  .summary-Info-main {
    display: flex;
    margin-top: 60px;
    .summary-Info-left {
      width: 580px;
      min-height: 420px;
      padding-left: 140px;
    }
    .summary-Info-right {
      width: 350px;
      margin-left: 130px;
      padding-top: 100px;
      .summary-head-one {
        width: 350px;
        height: 196px;
        background: #f0f0f0;
        .avatar-uploader .el-upload {
          border: 1px dashed #d9d9d9;
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          width: 350px;
          height: 196px;
          img {
            width: 350px;
            height: 196px;
          }
        }

        .avatar-uploader .el-upload:hover {
          border-color: #409eff;
        }
        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 178px;
          height: 178px;
          line-height: 178px;
          text-align: right;
        }
        .avatar {
          width: 178px;
          height: 178px;
          display: block;
        }
      }
      .summary-head-two {
        width: 350px;
        .summary-head-two-one {
          float: left;
          margin-top: 15px;
          span {
            font-size: 14px;
            font-family: SourceHanSansCN-Normal;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
          }
          p {
            margin-top: 20px;
          }
        }
        button {
          display: block;
          float: right;
          width: 82px;
          height: 30px;
          border: 1px solid rgba(85, 198, 193, 1);
          border-radius: 2px;
          background: #fff;
          color: #55c6c1;
          margin-top: 10px;
        }
      }
    }
  }
  .summary-Info-button {
    margin: 50px 0 50px 460px;
  }
}
</style>
