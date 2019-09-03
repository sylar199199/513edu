<template>
  <div class="imported-materials">
    <div class="container">
      <div class="imported-materials-main">
        <div class="imported-materials-left">
          <imported-materials-slider />
        </div>
        <div class="imported-materials-right">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import importedMaterialsSlider from './imported-materials-slider'
export default {
  components: {
    'imported-materials-slider': importedMaterialsSlider,
  },
}
</script>

<style lang="less" scoped>
.imported-materials {
  width: 100%;
  min-height: calc(100vh - 348px);
  background: #eee;
  padding: 10px 0;
  .imported-materials-main {
    width: 100%;
    display: flex;
    .imported-materials-right {
      width: 722px;
    }
  }
}
</style>
