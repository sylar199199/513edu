<template>
  <div class="video-playing">
    <el-dialog
      title="人脸上传"
      :visible.sync="dialogVisible"
      width="25%"
      :show-close="false"
    >
      <div class="video-playing-main">
        <div class="video-playing-left">
          <p>
            1.
            首次进行人脸认证，您需要自拍或上传一张个人的头像作为您的真实身份认证；
          </p>
          <p>
            2. 为提高识别成功率，请确保上传您本人的脸部正面照，不要遮挡脸部；
          </p>
          <p>
            3. 上传成功后，将进入下一步：APP扫码认证身份。
          </p>
          <div class="video-playing-left-button">
            <el-button type="primary" style="width: 100%" @click="uploadBtn">
              上 传
            </el-button>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('handleClose')">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 上传头像 -->
    <image-crop-upload
      v-model="show"
      field="file"
      :url="url"
      :width="300"
      :height="300"
      :headers="headers"
      :with-credentials="true"
      :max-size="1024"
      img-format="png"
      @src-file-set="srcFileSet"
      @crop-success="cropSuccess"
      @crop-upload-success="cropUploadSuccess"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ImageCropUpload from 'vue-image-crop-upload'
export default {
  data() {
    return {
      show: false,
      url: process.env.VUE_APP_BASE_URL + '/file/upload',
      headers: {
        smail: '*_~',
      },
      imgDataUrl: '',
      fileType: '',
      fileSize: '',
    }
  },
  props: {
    dialogVisible: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    'image-crop-upload': ImageCropUpload,
  },
  methods: {
    ...mapActions('login', ['getUploadRecognitionPhoto']),
    uploadBtn() {
      this.show = !this.show
    },
    srcFileSet(fileName, fileType, fileSize) {
      this.fileType = fileType
      this.fileSize = fileSize
    },
    cropSuccess(imgDataUrl, field) {
      this.imgDataUrl = imgDataUrl
      return imgDataUrl
    },
    cropUploadSuccess(jsonData, field) {
      this.getUploadRecognitionPhoto(jsonData.data[0].url)
    },
  },
}
</script>

<style lang="less" scoped>
.video-playing {
  .video-playing-main {
    display: flex;
    justify-content: space-between;
    .video-playing-left {
      p {
        font-size: 14px;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 30px;
      }
      .video-playing-left-button {
        width: 260px;
        margin: 30px auto 0;
      }
    }
  }
}
</style>
