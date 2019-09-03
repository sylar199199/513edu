<template>
  <div class="body" :style="{ backgroundColor: bgColor }">
    <div class="container">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  name: 'single-page',
  props: {
    bgColor: {
      type: String,
      default: '#ffffff',
    },
  },
}
</script>
<style lang="less" scoped></style>
