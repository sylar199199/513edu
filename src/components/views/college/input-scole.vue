<template>
  <div class="input-scole">
    <el-input
      placeholder="请输入内容"
      v-model="input"
      clearable
      class="input-scole-main"
    >
    </el-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
    }
  },
}
</script>

<style lang="less" scoped>
.input-scole {
  width: 100%;
  margin-top: 15px;
}
</style>
