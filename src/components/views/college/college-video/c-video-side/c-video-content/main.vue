<template>
  <el-collapse v-model="activeNames">
    <el-collapse-item
      v-for="(item, key) in video_list"
      :key="key"
      :title="`${item.chapterLevel}: ${item.name}`"
      :name="item.chapterLevel"
    >
      <c-video-item
        v-for="(_item, _key) in item.child"
        :key="_key"
        :video-info="_item"
        :section_id="_item.videoId"
        :target-id="_item.videosId"
        :course-id="_item.chapterVideoId"
      />
    </el-collapse-item>
  </el-collapse>
</template>
<script>
import CVideoItem from '@components/views/college/college-video/c-video-side/c-video-content/c-video-item'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'c-video-content',
  components: {
    'c-video-item': CVideoItem,
  },
  data() {
    return {
      activeNames: ['1'],
    }
  },
  computed: {
    ...mapState('course-detail', {
      video_list: state => state.courseSection,
    }),
  },
  methods: {
    ...mapActions('course-detail', ['getCourseCatalog']),
  },
  created() {
    this.activeNames.push(+this.$route.query.section)
    let coursectionId = this.$route.query.from
    this.getCourseCatalog(coursectionId)
  },
}
</script>
<style lang="less" scoped>
.c-video-content {
}
</style>
