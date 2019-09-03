<template>
  <div class="score-management-title">
    <div class="score-management-title-main">
      <span>
        {{ content }}
      </span>
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      default: '请传值',
    },
  },
}
</script>

<style lang="less" scoped>
.score-management-title {
  width: 994px;
  height: 66px;
  padding: 0 30px;
  .score-management-title-main {
    width: 100%;
    height: 100%;
    border-bottom: 1px #cccccc solid;
    display: flex;
    justify-content: space-between;
    span {
      font-size: 18px;
      font-family: SourceHanSansCN-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 66px;
    }
    div {
      margin-top: 13px;
      .el-select {
        margin-top: 0;
        width: 150px;
      }
    }
  }
}
</style>
