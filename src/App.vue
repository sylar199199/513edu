<template>
  <div id="app">
    <base-layout />
    <scroll-top />
  </div>
</template>

<script>
import ScrollTop from './components/scollTop/ScrollTop.vue'
export default {
  components: {
    'scroll-top': ScrollTop,
  },
  created() {
    if (
      !this.$route.name === 'collegeCourseVideo' &&
      this.$route.path.indexOf('/college') === -1
    ) {
      this.$router.replace({ path: 'home/index' })
    }
  },
}
</script>
<style lang="less" scoped>
#app {
  font-family: 'SourceHanSansCN-Medium';
}
</style>
