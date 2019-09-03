<template>
  <div>
    <div class="c-course-section-item">
      <el-row>
        <el-col :span="8">
          <span class="video-order">
            {{ videoInfo.videoLevel }}.{{ indexPinjie + 1 }}
          </span>
          {{ videoInfo.title }}
        </el-col>
        <el-col :span="8">
          <span class="teacher-name" v-if="videoInfo.teacher">
            {{ videoInfo.teacher && videoInfo.teacher.name }}
          </span>
          <span v-else style="visibility:hidden">
            6
          </span>
        </el-col>
        <el-col
          :span="8"
          v-if="findStudentOrderExist > 0 || courseInfoVo.coursePrice === 0"
        >
          <span class="video-duration">
            {{ videoInfo.duration }}
          </span>
          <el-button
            type="primary"
            size="mini"
            round
            @click="routerTo(videoInfo.videoId)"
            v-if="videoInfo.duration !== null"
          >
            播放
          </el-button>
          <el-button
            type="primary"
            size="mini"
            round
            disabled
            @click="routerTo(videoInfo.videoId)"
            v-else
          >
            暂无视频
          </el-button>
        </el-col>
      </el-row>
    </div>
    <video-playing :dialog-visible="dialogVisible" @handleClose="handleClose" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import videoPlaying from '@components/Dialog/video-playing/index'

export default {
  name: 'c-course-section-item',
  data() {
    return {
      dialogVisible: false,
    }
  },
  props: {
    videoInfo: {
      type: Object,
      default: () => {},
    },
    sectionId: {
      type: String,
      default: NaN,
    },
    indexPinjie: {
      type: Number,
    },
  },
  components: {
    'video-playing': videoPlaying,
  },
  computed: {
    ...mapState('login', {
      recognitionPicFlag: state => state.userInfo.recognitionPicFlag,
    }),
    ...mapState('course-detail', {
      courseInfoVo: state => state.courseInfoVo,
    }),
    ...mapState('member', {
      findStudentOrderExist: state => state.findStudentOrderExist,
    }),
  },
  methods: {
    routerTo(id) {
      if (this.recognitionPicFlag) {
        let routeUrl = this.$router.resolve({
          name: 'collegeCourseVideo',
          params: {
            id,
          },
          query: {
            from: this.$route.params.id,
            section: this.sectionId,
            courseIdSign: this.$route.params.id,
          },
        })
        window.open(routeUrl.href, '_blank')
      } else {
        this.dialogVisible = true
      }
    },
    handleClose() {
      this.dialogVisible = false
    },
  },
}
</script>

<style lang="less" scoped>
.c-course-section-item {
  padding: 0 36px 0 29px;
  margin: 10px 0;
  font-size: 14px;
  color: #666666;
  &.active {
    background-color: #f0f0f0;
  }
  > div {
    height: 44px;
    line-height: 44px;
    > div:nth-of-type(2) {
      text-align: center;
    }
    > div:nth-of-type(3) {
      text-align: right;
    }
  }
  .el-col-8 {
    height: 44px;
    width: 358px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    .video-order {
      margin-right: 10px;
    }
    .video-duration {
      margin-right: 13px;
    }
  }
}
</style>
