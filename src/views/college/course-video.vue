<template>
  <div class="course-video">
    <div class="video-list">
      <c-video-side />
    </div>
    <div class="video-content">
      <div id="player-con" />
    </div>
    <el-dialog
      title="请扫码认证人脸"
      :visible.sync="dialogVisible"
      width="20%"
      :before-close="handleClose"
      :center="true"
      :show-close="false"
    >
      <img :src="getImgUrl" alt="" class="course-video-erweima" />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="affirmClose">
          刷 新
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import CVideoSide from '@components/views/college/college-video/c-video-side'
import socket from '@utils/socket'
import { mapActions, mapState, mapMutations } from 'vuex'
import {
  createAliyunPlugin,
  pluginUrls,
  initAliyunVideo,
} from '@utils/aliyun-video'

export default {
  name: 'course-video',
  components: {
    'c-video-side': CVideoSide,
  },
  data() {
    return {
      palyer: null,
      videoConfig: {
        id: 'player-con',
        height: '100%',
      },
    }
  },
  computed: {
    ...mapState('course-detail', {
      videoInfo: state => {
        const { coverUrl, videoId, playAuth } = state.videoInfo
        return {
          cover: coverUrl,
          vid: videoId,
          playauth: playAuth,
        }
      },
    }),
    ...mapState('login', {
      userInfo: state => state.userInfo,
    }),
    ...mapState('myCourse', {
      dialogVisible: state => state.dialogVisible,
    }),
    ...mapState('member', {
      qrImage: state => state.qrImage,
    }),
    userProfile() {
      let teacherOrStudent = this.userInfo.roleStr
        ? this.userInfo.roleStr.substr(7)
        : ''
      return teacherOrStudent
    },
    getImgUrl() {
      return this.qrImage
    },
    query() {
      return this.$route.params.id
    },
  },
  watch: {
    // idSign 变动，重新获取auth
    async query(cur) {
      const ok = await this.getVideoAuth(cur)
      if (ok) {
        const { vid, playauth } = this.videoInfo
        this.player.replayByVidAndPlayAuth(vid, playauth)
      }
    },
    $route: 'cloneWebsocket',
  },
  methods: {
    ...mapActions('course-detail', ['getVideoAuth']),
    ...mapMutations('myCourse', ['dialogShow']),
    ...mapActions('member', ['getQrImage']),
    handleClose(done) {},
    affirmClose() {
      this.getQrImage()
    },
    async cloneWebsocket() {
      if (this.userProfile === 'student') {
        await socket.websocketclose()
        await this.dialogShow()
        await this.getQrImage()
        await socket.initWebSocket(this.userInfo.mobile)
        await socket.websocketonmessage()
      }
    },
  },
  async created() {
    if (this.userProfile === 'student') {
      await this.dialogShow()
      await this.getQrImage()
      await socket.initWebSocket(this.userInfo.mobile)
      await socket.websocketonmessage()
    }
  },
  // 初始化
  async mounted() {
    await createAliyunPlugin(pluginUrls)
    await this.getVideoAuth(this.$route.params.id)
    this.player = initAliyunVideo({
      ...this.videoInfo,
      ...this.videoConfig,
    })
  },
}
</script>

<style lang="less" scoped>
.course-video {
  overflow: hidden;
  .video-content {
    margin-right: 400px;
    height: calc(100vh - 88px);
  }
  .video-list {
    float: right;
    width: 400px;
    background-color: #ffffff;
    height: calc(100vh - 88px);
  }
  .course-video-erweima {
    margin-left: 20px;
  }
}
</style>
