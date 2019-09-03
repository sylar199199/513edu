<template>
  <div class="course-catalogue">
    <div class="course-catalogue-aggregate">
      总计：课时<span>26</span>个 视频<span>24</span>个 单元测试<span>5</span>份
    </div>
    <div class="course-catalogue-main clearfix">
      <div class="course-catalogue-section">
        <div class="course-catalogue-AddOneSection">
          <el-button type="primary" plain @click="addOneSwction">
            新增章节
          </el-button>
        </div>
        <ul class="course-catalogue-section-list">
          <li
            class="course-catalogue-section-item"
            v-for="(item, index, key) in courseSection"
            :key="key"
          >
            <el-collapse
              :v-model="index"
              @change="handleChange"
              v-loading="loading"
            >
              <el-collapse-item
                :title="`第${index + 1}章  ${item.name}`"
                :name="index"
                class="catalogue-maxlength"
              >
                <div class="course-catalogue-section-top">
                  <span @click="increased(item.chapterId)">
                    新增
                  </span>
                  <span @click="deletion(item.chapterId, item.child)">
                    删除
                  </span>
                  <span
                    v-if="$route.query.id"
                    @click="modificationPage(item.chapterId)"
                  >
                    修改
                  </span>
                </div>
                <ul class="course-catalogue-section-bottom">
                  <li
                    class="course-catalogue-bottom-item"
                    v-for="(abc, twoIndex) in item.child"
                    :key="abc.sign"
                  >
                    <div class="course-catalogue-bottom-title">
                      <span> {{ index + 1 }}.{{ twoIndex + 1 }} </span>
                      <span>
                        {{ abc.title }}
                      </span>
                    </div>
                    <div class="course-catalogue-bottom-detele">
                      <i v-if="abc.videoId !== ''"></i>
                      <div class="course-catalogue-bottom-updata" v-else>
                        <el-upload
                          class="avatar-uploader el-upload--text"
                          :action="uploadUrl"
                          :show-file-list="false"
                          :with-credentials="true"
                          :name="videoFile"
                          :on-success="handleVideoSuccess"
                        >
                          <span @click="getChapterVideoId(abc.chapterVideoId)">
                            上传视频
                          </span>
                        </el-upload>
                      </div>
                      <span @click="deleteChildNode(abc.chapterVideoId)">
                        删除
                      </span>
                      <span
                        v-if="$route.query.id"
                        @click="
                          modificationPageChildren(abc.chapterVideoId, index)
                        "
                      >
                        修改
                      </span>
                    </div>
                  </li>
                </ul>
              </el-collapse-item>
            </el-collapse>
          </li>
        </ul>
      </div>
    </div>
    <!-- 添加第一级 -->
    <el-dialog
      title="新增章"
      :visible.sync="dialogOneVisible"
      width="30%"
      :close-on-click-modal="false"
    >
      <el-input
        placeholder="请输入章节序号，只能为数字"
        v-model="inputOneChapter"
        clearable
        class="course-catalogue-input"
        @change="pageOneChange"
      >
      </el-input>
      <el-input
        placeholder="请输入内容"
        v-model="inputOneVal"
        clearable
        class="course-catalogue-input"
      >
      </el-input>
      <el-input placeholder="请输入简介" v-model="inputOneSynopsis" clearable>
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogOneVisible = false">取 消</el-button>
        <el-button type="primary" @click="appendOneNumber">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加第二级 -->
    <el-dialog
      title="新增节"
      :visible.sync="dialogThreeVisible"
      width="30%"
      :close-on-click-modal="false"
    >
      <el-input
        placeholder="请输入视频章节序号，只能为数字"
        v-model="inputTwoChapter"
        clearable
        class="course-catalogue-input"
        @change="pageTwoChange"
      >
      </el-input>
      <el-input
        placeholder="请输入内容"
        v-model="inputTwoVal"
        clearable
        class="course-catalogue-input"
      >
      </el-input>
      <el-input placeholder="请输入简介" v-model="inputTwoSynopsis" clearable>
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogThreeVisible = false">取 消</el-button>
        <el-button type="primary" @click="appendTwoNumber">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 删除章节 -->
    <el-dialog
      title="确认删除吗！！"
      :visible.sync="dialogTWoVisible"
      width="30%"
      :close-on-click-modal="false"
    >
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTWoVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmDeletion">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 删除子章节 -->
    <el-dialog
      title="确认删除吗！！"
      :visible.sync="dialogChildVisible"
      width="30%"
      :close-on-click-modal="false"
    >
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogChildVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteAffirm">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改章节 -->
    <el-dialog
      title="修改"
      :visible.sync="dialogmodificationVisible"
      width="30%"
      :close-on-click-modal="false"
    >
      <el-input
        placeholder="请输入章节序号，只能为数字"
        v-model="modificationPageCharper"
        clearable
        class="course-catalogue-input"
        @change="pageOneChange"
      >
      </el-input>
      <el-input
        placeholder="请输入内容"
        v-model="modificationPageContent"
        clearable
        class="course-catalogue-input"
      >
      </el-input>
      <el-input
        placeholder="请输入简介"
        v-model="modificationPageSynopsis"
        clearable
      >
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogmodificationVisible = false">取 消</el-button>
        <el-button type="primary" @click="modificationPageAffirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 修改子章节 -->
    <el-dialog
      title="修改"
      :close-on-click-modal="false"
      :visible.sync="dialogmodificationChildrenVisible"
      width="30%"
    >
      <el-input
        placeholder="请输入第一级章节"
        v-model="modificationPageChildrenCharper"
        clearable
        class="course-catalogue-input"
        @change="pageOneChange"
        disabled="disabled"
      >
      </el-input>
      <el-input
        placeholder="请输入内容"
        v-model="modificationPageChildrenContent"
        clearable
        class="course-catalogue-input"
      >
      </el-input>
      <!-- <el-input
        placeholder="请输入简介"
        v-model="modificationPageChildrenSynopsis"
        clearable
      >
      </el-input> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogmodificationChildrenVisible = false"
          >取 消</el-button
        >
        <el-button type="primary" @click="modificationPageChildrenAffirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import cookieUtils from '@utils/cookie'
import { Loading } from 'element-ui'

export default {
  data() {
    return {
      loading: false,
      activeNames: ['1'],
      activeNamesTwo: ['2'],
      dialogOneVisible: false,
      dialogTWoVisible: false,
      dialogThreeVisible: false,
      dialogChildVisible: false,
      dialogmodificationVisible: false,
      dialogmodificationChildrenVisible: false,
      inputOneChapter: '',
      inputOneVal: '',
      inputOneSynopsis: '',
      inputTwoChapter: '',
      inputTwoVal: '',
      inputTwoSynopsis: '',
      chapterId: null,
      sublevelsUnder: [],
      addChapterId: null,
      uploadUrl: process.env.VUE_APP_BASE_URL + '/video/uploadVideo', //你要上传视频到你后台的地址
      videoFile: 'videoFile',
      chapterVideoId: null,
      deleteChildNodeSign: null,
      changeOnePage: false,
      changeTwoPage: false,
      modificationPageCharper: '',
      modificationPageContent: '',
      modificationPageSynopsis: '',
      modificationPageChildrenCharper: '',
      modificationPageChildrenContent: '',
      modificationPageChildrenSynopsis: '',
    }
  },
  computed: {
    ...mapState('course-detail', {
      courseSection: state => state.courseSection,
      courseChapterIdList: state => state.courseChapterIdList,
      courseChapterVideoIdList: state => state.courseChapterVideoIdList,
    }),
  },
  methods: {
    ...mapActions('course-detail', [
      'getCourseCatalog',
      'getByCourseChapterId',
      'getUpdateCourseChapter',
      'getByCourseChapterVideoId',
      'getUpdateCourseChapterVideo',
    ]),
    ...mapActions('uploading', [
      'getAddCourseChapter',
      'getDeleteCourseChapter',
      'getAddCourseChaperVideo',
      'getUploadVideo',
      'getDeleteCourseChaperVideo',
    ]),
    handleChange(val) {
      //console.log(val)
    },
    pageOneChange() {
      let regNumber = /^[0-9]*$/
      if (regNumber.test(parseInt(this.inputOneChapter))) {
        this.changeOnePage = true
      } else {
        this.$message.error('章节只能输入数字')
        this.changeOnePage = false
      }
    },
    pageTwoChange() {
      let regChildNumber = /^[0-9]*$/
      if (regChildNumber.test(parseInt(this.inputTwoChapter))) {
        this.changeTwoPage = true
      } else {
        this.$message.error('章节只能输入数字')
        this.changeTwoPage = false
      }
    },
    async appendOneNumber() {
      if (
        this.inputOneVal !== '' &&
        this.inputOneSynopsis !== '' &&
        this.inputOneChapter !== ''
      ) {
        if (
          this.changeOnePage &&
          this.inputOneVal.length < 100 &&
          this.inputOneSynopsis.length < 200
        ) {
          let treeObj = {
            chapterName: this.inputOneVal,
            chapterSynopsis: this.inputOneSynopsis,
            chapterLevel: this.inputOneChapter,
            courseIdSign: this.$route.query.courseIdSign,
          }
          await this.getAddCourseChapter(treeObj)
          this.dialogOneVisible = false
          await this.getCourseCatalog(this.$route.query.courseIdSign)
        } else {
          this.$message.error('内容不能超过100个字，简介不能超过200')
        }
      } else {
        this.$message.error('请正确填写')
      }
    },
    async appendTwoNumber() {
      this.dialogThreeVisible = false
      if (
        this.inputTwoChapter !== '' &&
        this.inputTwoVal !== '' &&
        this.inputTwoSynopsis !== ''
      ) {
        if (
          this.changeTwoPage &&
          this.inputTwoVal.length < 100 &&
          this.inputTwoSynopsis.length < 200
        ) {
          let treeTwoObj = {
            chapterIdSign: this.addChapterId,
            videoLevel: this.inputTwoChapter,
            videoTitle: this.inputTwoVal,
          }
          await this.getAddCourseChaperVideo(treeTwoObj)
          await this.getCourseCatalog(this.$route.query.courseIdSign)
        } else {
          this.$message.error('内容不能超过100个字，简介不能超过200')
        }
      } else {
        this.$message.error('输入不能为空')
      }
    },
    addOneSwction() {
      this.dialogOneVisible = true
    },
    // 删除章节
    deletion(chapterId, sublevelsUnder) {
      this.chapterId = chapterId
      this.sublevelsUnder = sublevelsUnder
      this.dialogTWoVisible = true
    },
    increased(addChapterId) {
      this.dialogThreeVisible = true
      this.addChapterId = addChapterId
    },
    // 确认删除章节
    async confirmDeletion() {
      if (this.sublevelsUnder.length === 0) {
        await this.getDeleteCourseChapter(this.chapterId)
        this.dialogTWoVisible = false
        await this.getCourseCatalog(this.$route.query.courseIdSign)
      } else {
        this.$message.error('目前章节存在子级，无法删除')
      }
    },
    // 判断视频是否符合规范
    beforeUploadVideo(file) {
      const isLt500M = file.size / 1024 / 1024 < 500
      if (
        [
          'video/mp4',
          'video/TS',
          'video/3GP',
          'video/MPG',
          'video/MPEG',
          'video/MPE',
          'video/DAT',
          'video/VOB',
          'video/ASF',
        ].indexOf(file.type) == -1
      ) {
        this.$message.error('请上传正确的视频格式')
        return false
      }
      if (!isLt500M) {
        this.$message.error('上传视频大小不能超过500MB哦!')
        return false
      }
      console.log(444)
    },
    getChapterVideoId(id) {
      Loading.service()
      this.chapterVideoId = id
      //this.loading = true
    },
    //上传成功回调
    async handleVideoSuccess(res) {
      if (res.code === 1) {
        let loadingInstance = Loading.service()
        let updateChapterReq = {
          chapterVideoSign: this.chapterVideoId,
          videoSign: res.data,
        }
        await this.getUploadVideo(updateChapterReq)
        await this.getCourseCatalog(this.$route.query.courseIdSign)
        loadingInstance.close()
        this.$message.success('上传成功')
      } else {
        this.$message.error('上传失败')
        this.uploadVideosContent = '上传失败请重试'
      }
    },
    // 删除子标题
    deleteChildNode(deleteChildNodeSign) {
      this.dialogChildVisible = true
      this.deleteChildNodeSign = deleteChildNodeSign
    },
    // 确认删除子标题
    async deleteAffirm() {
      this.dialogChildVisible = false
      await this.getDeleteCourseChaperVideo(this.deleteChildNodeSign)
      await this.getCourseCatalog(this.$route.query.courseIdSign)
    },

    // 修改章节
    async modificationPage(chapterId) {
      await this.getByCourseChapterId(chapterId)
      this.dialogmodificationVisible = true
      this.modificationPageCharper = this.courseChapterIdList.chapterLevel
      this.modificationPageContent = this.courseChapterIdList.chapterName
      this.modificationPageSynopsis = this.courseChapterIdList.chapterSynopsis
    },

    // 确认修改章节
    async modificationPageAffirm() {
      let updateCourseChapterReqObj = {
        chapterLevel: this.modificationPageCharper,
        chapterName: this.modificationPageContent,
        chapterSynopsis: this.modificationPageSynopsis,
        idSign: this.courseChapterIdList.idSign,
      }
      await this.getUpdateCourseChapter(updateCourseChapterReqObj)
      await this.getCourseCatalog(this.$route.query.courseIdSign)
      this.dialogmodificationVisible = false
    },

    // 修改子章节
    async modificationPageChildren(chapterId, index) {
      await this.getByCourseChapterVideoId(chapterId)
      this.modificationPageChildrenCharper = `${index + 1}.${
        this.courseChapterVideoIdList.videoLevel
      }`
      this.modificationPageChildrenContent = this.courseChapterVideoIdList.title
      this.dialogmodificationChildrenVisible = true
    },

    // 确认修改子章节
    async modificationPageChildrenAffirm() {
      let updateCourseChaperVideoReqObj = {
        idSign: this.courseChapterVideoIdList.sign,
        videoTitle: this.modificationPageChildrenContent,
        videoLevel: this.courseChapterVideoIdList.videoLevel,
      }
      await this.getUpdateCourseChapterVideo(updateCourseChaperVideoReqObj)
      await this.getCourseCatalog(this.$route.query.courseIdSign)
      this.dialogmodificationChildrenVisible = false
    },
  },
  created() {
    this.getCourseCatalog(this.$route.query.courseIdSign)
  },
}
</script>

<style lang="less" scoped>
.course-catalogue {
  .course-catalogue-aggregate {
    width: 837px;
    height: 30px;
    line-height: 30px;
    margin: 0 auto;
    background: rgba(252, 248, 227, 1);
    border: 1px solid rgba(252, 239, 169, 1);
    padding-left: 10px;
    span {
      color: #55c6c1;
    }
  }
  .course-catalogue-main {
    .course-catalogue-section {
      margin-top: 20px;
      width: 530px;
      .course-catalogue-AddOneSection {
        margin-bottom: 20px;
        margin-left: 20px;
      }
      .course-catalogue-section-list {
        padding: 0 10px;
        .course-catalogue-section-item {
          margin-bottom: 20px;
          position: relative;
          .el-collapse {
            border-top: 0;
            border-bottom: 0;
          }
          .catalogue-maxlength {
            width: 510px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .course-catalogue-section-top {
            position: absolute;
            top: 12px;
            right: -142px;
            span {
              margin: 0 8px;
              font-size: 14px;
              font-family: SourceHanSansCN-Normal;
              font-weight: 400;
              color: #58c6bd;
              cursor: pointer;
            }
          }
          .course-catalogue-section-bottom {
            padding-left: 20px;
            .course-catalogue-bottom-item {
              line-height: 40px;
              font-size: 14px;
              font-family: SourceHanSansCN-Normal;
              font-weight: 400;
              color: rgba(102, 102, 102, 1);
              display: flex;
              justify-content: space-between;
              .course-catalogue-bottom-title {
                width: 365px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                span {
                  margin-right: 10px;
                }
              }
              .course-catalogue-bottom-detele {
                margin-right: 20px;
                display: flex;
                i {
                  display: block;
                  width: 27px;
                  height: 27px;
                  margin-right: 12px;
                  background: url('../../../assets/icon/_list_video@2x.png');
                  position: relative;
                  top: 4px;
                }
                span {
                  margin: 0 8px;
                  font-size: 14px;
                  font-family: SourceHanSansCN-Normal;
                  font-weight: 400;
                  color: #58c6bd;
                  cursor: pointer;
                }
                .course-catalogue-bottom-updata {
                  font-size: 14px;
                  font-family: SourceHanSansCN-Normal;
                  font-weight: 400;
                  color: #58c6bd;
                  cursor: pointer;
                  margin-right: 13px;
                }
              }
            }
          }
        }
      }
    }
  }
  .course-catalogue-input {
    margin-bottom: 30px;
  }
}
</style>
