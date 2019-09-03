<template>
  <div class="container">
    <div class="summary">
      <div class="summary-main">
        <div class="summary-school-name">
          <div v-if="oneShow">
            <div class="summary-school-name-one">
              <img src="../../../assets/icon/wujiaoxing.png" alt="" />
              <span>
                课程名称
              </span>
            </div>
            <div class="summary-school-name-two summary-school-name-show">
              {{ courseIdList.courseName }}
            </div>
            <el-button
              type="primary"
              icon="el-icon-edit"
              class="summary-school-name-three"
              @click="isOneShow"
              circle
            ></el-button>
          </div>
          <div v-else>
            <div class="summary-school-name-one">
              <img src="../../../assets/icon/wujiaoxing.png" alt="" />
              <span>
                课程名称
              </span>
            </div>
            <div class="summary-school-name-two">
              <el-input
                placeholder="请输入内容"
                v-model="oneInputVal"
              ></el-input>
            </div>
          </div>
        </div>
        <div class="summary-school-name">
          <div v-if="twoShow">
            <div class="summary-school-name-one">
              <img src="../../../assets/icon/wujiaoxing.png" alt="" />
              <span>
                学科类别
              </span>
            </div>
            <div
              class="summary-school-name-two summary-school-name-sort summary-school-name-show"
            >
              {{ courseIdList.typeName }}
            </div>
            <el-button
              type="primary"
              icon="el-icon-edit"
              class="summary-school-name-three"
              @click="isTwoShow"
              circle
            ></el-button>
          </div>
          <div v-else>
            <div class="summary-school-name-one">
              <img src="../../../assets/icon/wujiaoxing.png" alt="" />
              <span>
                学科类别
              </span>
            </div>
            <div class="summary-school-name-two summary-school-name-sort">
              <el-cascader
                v-model="twoInputVal"
                :options="threeList"
                :props="defaultParams"
              ></el-cascader>
            </div>
          </div>
        </div>
        <div class="summary-suggestions-credit">
          <div v-if="threeShow">
            <div class="summary-suggestions-credit-one">
              <div class="summary-suggestions-one-one">
                <img src="../../../assets/icon/wujiaoxing.png" alt="" />
                <span>
                  建议学分
                </span>
              </div>
              <div
                class="summary-suggestions-one-two summary-suggestions-one-two-zhanshi"
              >
                {{ courseIdList.courseScore }}
              </div>
            </div>
            <div class="summary-suggestions-credit-two">
              <span class="summary-suggestions-two-one">
                学时
              </span>
              <div
                class="summary-suggestions-two-two summary-suggestions-two-two-zahnshi"
              >
                {{ courseIdList.courseTime }}
              </div>
            </div>
            <el-button
              type="primary"
              icon="el-icon-edit"
              class="summary-school-name-three"
              @click="isThreeShow"
              circle
            ></el-button>
          </div>
          <div v-else>
            <div class="summary-suggestions-credit-one">
              <div class="summary-suggestions-one-one">
                <img src="../../../assets/icon/wujiaoxing.png" alt="" />
                <span>
                  建议学分
                </span>
              </div>
              <div class="summary-suggestions-one-two">
                <el-input
                  v-model="threeCreditVal"
                  placeholder="请输入内容"
                ></el-input>
              </div>
            </div>
            <div class="summary-suggestions-credit-two">
              <span class="summary-suggestions-two-one">
                学时
              </span>
              <div class="summary-suggestions-two-two">
                <el-input
                  v-model="threePeriodVal"
                  placeholder="请输入内容"
                ></el-input>
              </div>
            </div>
          </div>
        </div>
        <div class="summary-price-course">
          <div v-if="fourShow">
            <div class="summary-price-course-one">
              课程价格
            </div>
            <div
              class="summary-price-course-two summary-price-course-two-zhanshi"
            >
              {{ courseIdList.coursePrice }}
            </div>
            <div class="summary-price-course-three">
              元
            </div>
            <div class="summary-price-course-fours">
              （价格空白默认为免费）
            </div>
            <el-button
              type="primary"
              icon="el-icon-edit"
              class="summary-school-name-three"
              @click="isFourShow"
              circle
            ></el-button>
          </div>
          <div v-else>
            <div class="summary-price-course-one">
              课程价格
            </div>
            <div class="summary-price-course-two">
              <el-input
                v-model="fourInputVal"
                placeholder="请输入内容"
              ></el-input>
            </div>
            <div class="summary-price-course-three">
              元
            </div>
            <div class="summary-price-course-fours">
              （价格空白默认为免费）
            </div>
          </div>
        </div>
        <div class="summary-school-name">
          <div v-if="fiveShow">
            <div class="summary-school-name-one">
              <img src="../../../assets/icon/wujiaoxing.png" alt="" />
              <span>
                课程简介
              </span>
            </div>
            <div class="summary-school-name-two summary-school-name-show">
              {{ courseIdList.content }}
            </div>
            <el-button
              type="primary"
              icon="el-icon-edit"
              class="summary-school-name-three"
              @click="isFiveShow"
              circle
            ></el-button>
          </div>
          <div v-else>
            <div class="summary-school-name-one">
              <img src="../../../assets/icon/wujiaoxing.png" alt="" />
              <span>
                课程简介
              </span>
            </div>
            <div class="summary-school-name-two">
              <el-input
                v-model="fiveInputVal"
                placeholder="请输入内容"
              ></el-input>
            </div>
          </div>
        </div>
        <div class="summary-school-name">
          <div v-if="sixShow">
            <div class="summary-school-name-one">
              <span>
                课程背景
              </span>
            </div>
            <div class="summary-school-name-two summary-school-name-show">
              {{ courseIdList.courseDescribe }}
            </div>
            <el-button
              type="primary"
              icon="el-icon-edit"
              class="summary-school-name-three"
              @click="isSixShow"
              circle
            ></el-button>
          </div>
          <div v-else>
            <div class="summary-school-name-one">
              <span>
                课程背景
              </span>
            </div>
            <div class="summary-school-name-two">
              <el-input
                v-model="sixInputVal"
                placeholder="请输入内容"
              ></el-input>
            </div>
          </div>
        </div>
        <div class="summary-school-name">
          <div v-if="sevenShow">
            <div class="summary-school-name-one">
              <span>
                课程目标
              </span>
            </div>
            <div class="summary-school-name-two summary-school-name-show">
              {{ courseIdList.courseNotice }}
            </div>
            <el-button
              type="primary"
              icon="el-icon-edit"
              class="summary-school-name-three"
              @click="isSevenShow"
              circle
            ></el-button>
          </div>
          <div v-else>
            <div class="summary-school-name-one">
              <span>
                课程目标
              </span>
            </div>
            <div class="summary-school-name-two">
              <el-input
                v-model="sevenInputVal"
                placeholder="请输入内容"
              ></el-input>
            </div>
          </div>
        </div>
        <div class="summary-school-name">
          <div v-if="eightShow">
            <div class="summary-school-name-one">
              <span>
                设计原则
              </span>
            </div>
            <div class="summary-school-name-two summary-school-name-show">
              {{ courseIdList.knowledge }}
            </div>
            <el-button
              type="primary"
              icon="el-icon-edit"
              class="summary-school-name-three"
              @click="isEightShow"
              circle
            ></el-button>
          </div>
          <div v-else>
            <div class="summary-school-name-one">
              <span>
                设计原则
              </span>
            </div>
            <div class="summary-school-name-two">
              <el-input
                v-model="eightInputVal"
                placeholder="请输入内容"
              ></el-input>
            </div>
          </div>
        </div>
        <div class="summary-school-name">
          <div v-if="nineShow">
            <div class="summary-school-name-one">
              <span>
                课程类型
              </span>
            </div>
            <div class="summary-school-name-two summary-school-name-show">
              {{ courseIdList.type }}
            </div>
            <el-button
              type="primary"
              icon="el-icon-edit"
              class="summary-school-name-three"
              @click="isNineShow"
              circle
            ></el-button>
          </div>
          <div v-else>
            <div class="summary-school-name-one">
              <span>
                课程类型
              </span>
            </div>
            <div class="summary-school-name-two">
              <el-select v-model="nineInputVal" placeholder="请选择">
                <el-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="summary-school-name">
          <div v-if="elevenShow">
            <div class="summary-school-name-one">
              <span>
                发布状态
              </span>
            </div>
            <div class="summary-school-name-two summary-school-name-show">
              {{ courseIdList.releaseStatus }}
            </div>
            <el-button
              type="primary"
              icon="el-icon-edit"
              class="summary-school-name-three"
              @click="isElevenShow"
              circle
            ></el-button>
          </div>
          <div v-else>
            <div class="summary-school-name-one">
              <span>
                发布状态
              </span>
            </div>
            <div class="summary-school-name-two">
              <el-select v-model="elevenInputVal" placeholder="请选择">
                <el-option
                  v-for="item in releaseOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="summary-school-name">
          <div v-if="twelveShow">
            <div class="summary-school-name-one">
              <span>
                是否精选
              </span>
            </div>
            <div class="summary-school-name-two summary-school-name-show">
              {{ courseIdList.boutiqueCourse }}
            </div>
            <el-button
              type="primary"
              icon="el-icon-edit"
              class="summary-school-name-three"
              @click="isTwelveShow"
              circle
            ></el-button>
          </div>
          <div v-else>
            <div class="summary-school-name-one">
              <span>
                是否精选
              </span>
            </div>
            <div class="summary-school-name-two">
              <el-select v-model="twelveInputVal" placeholder="请选择">
                <el-option
                  v-for="item in choicenessOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <!-- <div class="summary-school-name">
          <div v-if="thirteenShow">
            <div class="summary-school-name-one">
              <span>
                是否付费
              </span>
            </div>
            <div class="summary-school-name-two summary-school-name-show">
              {{ courseIdList.payCourse }}
            </div>
            <el-button
              type="primary"
              icon="el-icon-edit"
              class="summary-school-name-three"
              @click="isThirteenShow"
              circle
            ></el-button>
          </div>
          <div v-else>
            <div class="summary-school-name-one">
              <span>
                是否付费
              </span>
            </div>
            <div class="summary-school-name-two">
              <el-select v-model="thirteenInputVal" placeholder="请选择">
                <el-option
                  v-for="item in payOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </div> -->
      </div>
      <div class="summary-head">
        <div v-if="tenShow" class="summary-head-zhanshi">
          <img :src="courseIdList.coursePicture" alt="" />
          <el-button
            type="primary"
            icon="el-icon-edit"
            class="summary-school-name-three"
            @click="istenShow"
            circle
          ></el-button>
        </div>
        <div v-else>
          <div class="summary-head-one">
            <el-upload
              class="avatar-uploader"
              :action="SummaryUploadUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
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
            </div>
            <button @click="goBackNo">
              返回
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="editors-save">
      <el-button type="primary" @click="editorsSave">
        保存
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      oneShow: true,
      oneInputVal: '',
      twoShow: true,
      twoInputVal: [],
      threeShow: true,
      threeCreditVal: '',
      threePeriodVal: '',
      fourShow: true,
      fourInputVal: '',
      fiveShow: true,
      fiveInputVal: '',
      sixShow: true,
      sixInputVal: '',
      sevenShow: true,
      sevenInputVal: '',
      eightShow: true,
      eightInputVal: '',
      nineShow: true,
      nineInputVal: '',
      nineInputValZhanshi: '公开课',
      tenShow: true,
      elevenShow: true,
      elevenInputVal: '',
      twelveShow: true,
      twelveInputVal: '',
      thirteenShow: true,
      thirteenInputVal: '',
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
      choicenessOptions: [
        {
          value: '0',
          label: '非精选',
        },
        {
          value: '1',
          label: '精选',
        },
      ],
      payOptions: [
        {
          value: '0',
          label: '无需付费',
        },
        {
          value: '1',
          label: '付费',
        },
      ],
      releaseOptions: [
        {
          value: '0',
          label: '未发布',
        },
        {
          value: '1',
          label: '已发布',
        },
      ],
      SummaryUploadUrl: process.env.VUE_APP_BASE_URL + '/file/upload',
      imageUrl: '',
      SummaryPhotoPath: '',
    }
  },
  computed: {
    ...mapState('uploading', {
      threeList: state => state.threeList,
    }),
    ...mapState('myCourse', {
      courseIdList: state => state.courseIdList,
    }),
  },
  methods: {
    ...mapActions('uploading', ['getFindCourseThreeList']),
    ...mapActions('myCourse', ['getCourseId', 'getUpdateCourse']),
    isOneShow() {
      this.oneShow = false
    },
    isTwoShow() {
      this.twoShow = false
    },
    isThreeShow() {
      this.threeShow = false
    },
    isFourShow() {
      this.fourShow = false
    },
    isFiveShow() {
      this.fiveShow = false
    },
    isSixShow() {
      this.sixShow = false
    },
    isSevenShow() {
      this.sevenShow = false
    },
    isEightShow() {
      this.eightShow = false
    },
    isNineShow() {
      this.nineShow = false
    },
    istenShow() {
      this.tenShow = false
    },
    isElevenShow() {
      this.elevenShow = false
    },
    isTwelveShow() {
      this.twelveShow = false
    },
    isThirteenShow() {
      this.thirteenShow = false
    },
    handleAvatarSuccess(res, file) {
      //this.imageUrl = URL.createObjectURL(file.raw)
      if (res.code === 1) {
        this.SummaryPhotoPath = res.data[0].url
        this.$message.success(res.msg)
        this.imageUrl = URL.createObjectURL(file.raw)
      } else {
        this.$message.error(res.msg)
      }
    },
    beforeAvatarUpload(file) {
      const isJPEG = file.type === 'image/jpeg'
      const isJPG = file.type === 'image/jpeg'
      const isGIF = file.type === 'image/gif'
      const isPNG = file.type === 'image/png'
      const isBMP = file.type === 'image/bmp'
      const isICON = file.type === 'image/icon'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPEG && !isJPG && !isGIF && !isPNG && !isBMP && !isICON) {
        this.$message.error('上传图片必须是JPG/GIF/PNG/BMP/ICON 格式!')
      }

      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return (isJPEG || isJPG || isBMP || isGIF || isPNG || isICON) && isLt2M
    },
    async editorsSave() {
      let courseName = this.oneInputVal || this.courseIdList.courseName
      let courseTypeIdSign = this.twoInputVal[0] || this.courseIdList.gradeOne
      let courseType2IdSign = this.twoInputVal[1] || this.courseIdList.gradeTwo
      let courseType3IdSign =
        this.twoInputVal[2] || this.courseIdList.gradeThree
      let courseScore = this.threeCreditVal || this.courseIdList.courseScore
      let courseTime = this.threePeriodVal || this.courseIdList.courseTime
      let coursePrice = this.fourInputVal || this.courseIdList.coursePrice
      let content = this.fiveInputVal || this.courseIdList.content
      let courseDescribe = this.sixInputVal || this.courseIdList.courseDescribe
      let courseNotice = this.sevenInputVal || this.courseIdList.courseNotice
      let knowledge = this.eightInputVal || this.courseIdList.knowledge
      let aaaaa =
        this.courseIdList.type == '公开课'
          ? 2
          : this.courseIdList.type == '学分课'
          ? 1
          : 3
      let type = this.nineInputVal || aaaaa
      let bbbbbb = this.courseIdList.releaseStatus == '未发布' ? 0 : 1
      let releaseStatus = this.elevenInputVal || bbbbbb
      let cccccc = this.courseIdList.boutiqueCourse === '非精选' ? 0 : 1
      let boutiqueCourse = this.twelveInputVal || cccccc
      let dddddd = this.courseIdList.payCourse === '无需付费' ? 0 : 1
      let payCourse = this.thirteenInputVal || dddddd
      let coursePicture =
        this.SummaryPhotoPath || this.courseIdList.coursePicture

      let updateCourseInfoReqObj = {
        boutiqueCourse,
        content,
        courseDescribe,
        courseName,
        courseNotice,
        coursePicture,
        coursePrice,
        courseScore,
        courseTime,
        courseType2IdSign,
        courseType3IdSign,
        courseTypeIdSign,
        idSign: this.$route.params.id,
        knowledge,
        payCourse,
        releaseStatus,
        type,
      }
      await this.getUpdateCourse(updateCourseInfoReqObj)
      let sign = this.$route.params.id
      await this.getCourseId(sign)
    },
    goBackNo() {
      this.tenShow = true
    },
  },
  created() {
    this.getFindCourseThreeList()
    let sign = this.$route.params.id
    this.getCourseId(sign)
  },
}
</script>

<style lang="less" scoped>
.summary {
  display: flex;
  justify-content: space-around;
  .summary-main {
    margin-top: 60px;
    .summary-school-name {
      height: 40px;
      margin-bottom: 34px;
      .summary-school-name-one {
        float: left;
        width: 70px;
        text-align: right;
        height: 40px;
        line-height: 40px;
        margin-right: 25px;
        img {
          width: 7px;
          height: 7px;
        }
        span {
          font-size: 14px;
          font-family: SourceHanSansCN-Normal;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
      }
      .summary-school-name-two {
        float: left;
        width: 350px;
        height: 40px;
        .el-cascader {
          width: 100%;
        }
        .el-select {
          width: 100%;
        }
      }
      .summary-school-name-show {
        width: 350px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 40px;
        font-size: 14px;
        font-family: SourceHanSansCN-Normal;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      .summary-school-name-three {
        margin-left: 20px;
      }
      .summary-school-name-sort {
        width: 350px;
      }
    }
    .summary-suggestions-credit {
      height: 40px;
      margin-bottom: 34px;
      .summary-suggestions-credit-one {
        float: left;
        .summary-suggestions-one-one {
          width: 70px;
          float: left;
          line-height: 40px;
          margin-right: 25px;
          width: 70px;
          text-align: right;
          img {
            width: 7px;
            height: 7px;
          }
          span {
            font-size: 14px;
            font-family: SourceHanSansCN-Normal;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
          }
        }
        .summary-suggestions-one-two {
          width: 136px;
          height: 40px;
          float: left;
        }
        .summary-suggestions-one-two-zhanshi {
          line-height: 40px;
          font-size: 14px;
          font-family: SourceHanSansCN-Normal;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
      }
      .summary-suggestions-credit-two {
        float: left;
        .summary-suggestions-two-one {
          font-size: 14px;
          font-family: SourceHanSansCN-Normal;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          float: left;
          line-height: 40px;
          margin-left: 33px;
          margin-right: 19px;
        }
        .summary-suggestions-two-two {
          width: 136px;
          height: 40px;
          float: left;
        }
        .summary-suggestions-two-two-zahnshi {
          line-height: 40px;
          font-size: 14px;
          font-family: SourceHanSansCN-Normal;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
      }
      .summary-school-name-three {
        margin-left: 20px;
      }
    }
    .summary-price-course {
      height: 40px;
      margin-bottom: 34px;
      .summary-price-course-one {
        font-size: 14px;
        font-family: SourceHanSansCN-Normal;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        float: left;
        width: 70px;
        text-align: right;
        margin-right: 25px;
        line-height: 40px;
      }
      .summary-price-course-two {
        width: 136px;
        height: 40px;
        float: left;
      }
      .summary-price-course-two-zhanshi {
        width: 50px;
        line-height: 40px;
        font-size: 14px;
        font-family: SourceHanSansCN-Normal;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      .summary-price-course-three {
        font-size: 14px;
        font-family: SourceHanSansCN-Normal;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        float: left;
        line-height: 40px;
        margin-left: 10px;
      }
      .summary-price-course-fours {
        font-size: 14px;
        font-family: SourceHanSansCN-Normal;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        float: left;
        line-height: 40px;
        margin-left: 28px;
      }
      .summary-school-name-three {
        margin-left: 115px;
      }
    }
  }
  .summary-head {
    margin-top: 225px;
    .summary-head-zhanshi {
      width: 350px;
      height: 180px;
      img {
        width: 100%;
        height: 100%;
      }
      .summary-school-name-three {
        margin-left: 170px;
        margin-top: 30px;
      }
    }
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
        background: red;
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
.editors-save {
  margin: 50px auto;
  button {
    margin-left: 540px;
  }
}
</style>
