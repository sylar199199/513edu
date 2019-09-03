<template>
  <div
    :class="[
      query.params.id === videoInfo.videoId ? 'active' : '',
      'c-video-item',
    ]"
    @click="playVideo"
  >
    {{ videoInfo.videoLevel + ' ' + videoInfo.title }}
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'c-video-item',
  props: {
    videoInfo: {
      type: Object,
      default: () => {},
    },
    sectionId: {
      type: Number,
      default: NaN,
    },
    targetId: {
      type: String,
      default: NaN,
    },
    courseId: {
      type: String,
      default: NaN,
    },
  },
  methods: {
    ...mapActions('myCourse', ['getStudyInfo', 'getAddStudyInfo']),
    async playVideo() {
      const { params, query } = this.query
      // 通过url params 传递播放的视频idSign
      await this.$router.push({
        query: {
          ...query,
          section: this.section_id,
        },
        params: {
          ...params,
          id: this.videoInfo.videoId,
          target: this.courseId,
        },
      })
      let courseIdSign = this.$route.query.courseIdSign
      let getCourseStudyReqObj = {
        chapterVideoIdSign: this.courseId,
        courseIdSign,
        targetId: this.videoInfo.videoId,
      }
      await this.getStudyInfo(getCourseStudyReqObj)

      let sign = this.$route.params.id
      let studyTime = parseInt(localStorage.getItem(sign)) || 0
      let videoIdSign = this.$route.params.target
      let addCourseStudyReqObj = {
        courseIdSign,
        studyTime,
        videoIdSign,
      }
      await this.getAddStudyInfo(addCourseStudyReqObj)
    },
  },
  computed: {
    query() {
      return this.$route
    },
  },
}
</script>
<style lang="less" scoped>
.c-video-item {
  padding: 10px 50px;
  border-top: 1px solid #eeeeee;
  cursor: pointer;
  &.active {
    background-color: #eeeeee;
    color: @maincolor;
  }
}
</style>
