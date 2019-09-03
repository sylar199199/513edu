<template>
  <div class="c-course-section-content">
    <p class="title">
      <span class="section-order"> 第{{ section.chapterLevel }}章 </span>
      <span class="section-name">
        {{ section.name }}
      </span>
    </p>
    <div class="section-content">
      <c-course-section-item
        v-for="(item, index, key) in section.child"
        :key="key"
        :video-info="item"
        :section-id="section.chapterLevel"
        :index-pinjie="index"
      />
    </div>
  </div>
</template>

<script>
import CCourseSectionItem from '@components/common/c-course-detail/c-course-section/c-course-section-content/c-course-section-item'
export default {
  name: 'c-course-section-content',
  components: {
    'c-course-section-item': CCourseSectionItem,
  },
  props: {
    section: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style lang="less" scoped>
.c-course-section-content {
  .title {
    font-size: 16px;
    color: #333333;
    padding: 10px 0;
    .section-order {
      margin-right: 9px;
    }
  }
}
</style>
