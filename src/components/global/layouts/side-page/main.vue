<template>
  <div class="side-page">
    <el-row>
      <el-col :span="24">
        <slot name="breadcrumb" />
      </el-col>
      <el-col :md="18">
        <div class="content">
          <slot name="content" />
        </div>
      </el-col>
      <el-col :md="6">
        <div class="side">
          <slot name="side" />
        </div>
      </el-col>
    </el-row>
    <slot name="modal" />
  </div>
</template>
<script>
export default {
  name: 'side-page',
}
</script>
<style lang="less" scoped></style>
