<template>
  <div class="c-video-side">
    <ul class="header clearfix">
      <li
        v-for="(item, key) in tabConfig"
        :key="key"
        :class="{ active: activeKey === item.key }"
        @click="activeKey = item.key"
      >
        {{ item.name }}
      </li>
    </ul>
    <div class="list-content">
      <c-video-content v-show="activeKey === 'list'" />
    </div>
  </div>
</template>
<script>
import CVideoContent from '@components/views/college/college-video/c-video-side/c-video-content'

export default {
  name: 'c-video-side',
  components: {
    'c-video-content': CVideoContent,
  },
  data() {
    return {
      activeKey: 'list',
      tabConfig: [
        {
          key: 'list',
          name: '目录',
        },
        {
          key: 'note',
          name: '笔记',
        },
        {
          key: 'summary',
          name: '摘要',
        },
      ],
    }
  },
}
</script>
<style lang="less" scoped>
.c-video-side {
  height: 100%;
  .header {
    height: 60px;
    li {
      width: 33.33333%;
      height: 100%;
      border-bottom: 1px solid #cccccc;
      color: #000000;
      line-height: 60px;
      text-align: center;
      float: left;
      position: relative;
      cursor: pointer;
      &:nth-child(2) {
        &:before {
          content: '';
          position: absolute;
          width: 1px;
          height: 20px;
          top: calc(100% - 40px);
          left: -1px;
          background-color: #cccccc;
        }
        &:after {
          content: '';
          position: absolute;
          width: 1px;
          height: 20px;
          top: calc(100% - 40px);
          right: 0;
          background-color: #eeeeee;
        }
        &.active:after {
          background-color: @maincolor;
          &:after {
            width: 0;
            height: 0;
            border-width: 0 6px 6px;
            border-style: solid;
            border-color: transparent transparent #ffffff; /*透明 透明  黄*/
            top: calc(100% - 5px);
            left: calc(50% - 6px);
          }
        }
      }
      &.active {
        background-color: @maincolor;
        color: #ffffff;
        z-index: 10;
        box-shadow: 0 0 10px @maincolor;
        &:after {
          position: absolute;
          content: '';
          width: 0;
          height: 0;
          border-width: 0 6px 6px;
          border-style: solid;
          border-color: transparent transparent #ffffff; /*透明 透明  黄*/
          position: absolute;
          top: calc(100% - 5px);
          left: calc(50% - 6px);
        }
      }
    }
  }
  .list-content {
    width: 100%;
    overflow: auto;
    height: calc(100vh - 149px);
  }
}
</style>
