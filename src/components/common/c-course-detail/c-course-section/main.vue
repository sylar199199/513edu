<template>
  <div class="c-course-section">
    <p class="title">
      <i class="vertical-bar" />
      课程列表
    </p>
    <c-course-section-content
      v-for="(item, key) in sectionList"
      :key="key"
      :section="item"
    />
  </div>
</template>

<script>
import CCourseSectionContent from '@components/common/c-course-detail/c-course-section/c-course-section-content'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'c-course-section',
  components: {
    'c-course-section-content': CCourseSectionContent,
  },
  computed: {
    ...mapState('course-detail', {
      sectionList: state => state.courseSection,
    }),
  },
  methods: {
    ...mapActions('course-detail', ['getCourseCatalog']),
  },
}
</script>

<style lang="less" scoped>
.c-course-section {
  .title {
    display: flex;
    align-items: center;
    font-size: 18px;
    color: #666666;
    margin-bottom: 20px;
    .vertical-bar {
      height: 17px;
      border: 2px solid @maincolor;
      margin-right: 7px;
    }
  }
}
</style>
