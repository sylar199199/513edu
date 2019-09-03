<template>
  <div class="course-management-main">
    <div class="container clearfix">
      <course-management-slider class="course-management-slider" />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import courseManagementSlider from '@components/base/base-slider/course-management-slider'
export default {
  components: {
    'course-management-slider': courseManagementSlider,
  },
}
</script>

<style lang="less" scoped>
.course-management-main {
  background: #f5f5f5;
  min-height: calc(100vh - 348px);
  padding: 10px 0;
  .course-management-slider {
    float: left;
    width: 196px;
  }
}
</style>
