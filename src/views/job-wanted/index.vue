<template>
  <div class="job-wanted0cover">
    <div>
      <img :src="$imgUrl + '/index/default_development%20%25402x.png'" alt="" />
      <p>
        程序大大正在开发中，敬请期待！
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>

<style lang="less" scoped>
.job-wanted0cover {
  width: 100%;
  min-height: calc(100% - 348px);
  background: #f5f5f5;
  overflow: hidden;
  position: relative;
  div {
    width: 210px;
    height: 210px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 180px;
      height: 180px;
    }
    p {
      font-size: 14px;
      font-family: SourceHanSansCN-Normal;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      margin-top: 10px;
    }
  }
}
</style>
