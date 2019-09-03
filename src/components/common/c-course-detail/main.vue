<template>
  <div class="c-course-detail">
    <c-course-info />
    <c-course-tabs />
  </div>
</template>
<script>
import CCourseInfo from '@components/common/c-course-detail/c-course-info'
import CCourseTabs from '@components/common/c-course-detail/c-course-tabs'
import { mapActions } from 'vuex'

export default {
  name: 'c-course-detail',
  components: {
    'c-course-info': CCourseInfo,
    'c-course-tabs': CCourseTabs,
  },
  data() {
    return {}
  },
  methods: {
    ...mapActions('course-detail', ['getByCourseId']),
  },
}
</script>
<style lang="less" scoped>
.c-course-detail {
  background-color: #ffffff;
  padding: 30px 30px 100px 30px;
}
</style>
