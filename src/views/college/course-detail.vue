<template>
  <single-page class="course-detail-content" bg-color="#eef0f2">
    <c-course-detail />
  </single-page>
</template>

<script>
import CCourseDetail from '@components/common/c-course-detail'
import { mapActions } from 'vuex'

export default {
  name: 'course-detail',
  components: {
    'c-course-detail': CCourseDetail,
  },
  methods: {
    ...mapActions('course-detail', ['getByInspectionStandardId']),
  },
}
</script>

<style lang="less" scoped>
.course-detail-content {
  padding: 40px 0;
}
</style>
