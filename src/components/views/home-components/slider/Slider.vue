<template>
  <div class="c-slider">
    <div class="slider-container">
      <h2 class="c-slider-h2">
        热点资讯
      </h2>
      <ul class="c-slider-list">
        <li
          class="c-slider-item"
          v-for="(item, index) in hotList"
          :key="item.sign"
          @click="handerChange"
        >
          <router-link
            :to="{ name: 'homeHotsAdvisoryDetail', params: { id: item.sign } }"
            class="c-slider-a"
          >
            <div class="c-slider-left">0{{ index + 1 }}</div>
            <div class="c-slider-right">
              <p class="c-slider-title" v-html="marked2html(item.title)"></p>
              <p class="c-slider-data">
                {{ item.createTime }}
              </p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { resolverMarked } from '@mixins/locality'

export default {
  computed: {
    ...mapState('newList', {
      hotList: state => state.hotList,
    }),
  },
  mixins: [resolverMarked],
  methods: {
    ...mapActions('newList', ['getHotList', 'getByNewsIdList']),
    handerChange() {
      let search = this.$route.params.id
      this.getByNewsIdList(search)
    },
  },
  created() {
    this.getHotList()
  },
}
</script>

<style lang="less">
.c-slider {
  width: 300px;
  height: 510px;
  background: #fff;
  .slider-container {
    width: 238px;
    margin: 0 auto;
    .c-slider-h2 {
      margin-top: 48px;
      margin-bottom: 30px;
      font-size: 24px;
      font-family: SourceHanSansCN-Medium;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
    .c-slider-list {
      .c-slider-item {
        margin-bottom: 30px;
        .c-slider-a {
          display: flex;
          .c-slider-left {
            font-size: 44px;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgba(230, 230, 230, 1);
          }
          .c-slider-right {
            margin-left: 20px;
            width: 160px;
            .c-slider-title {
              margin-top: 5px;
              width: 160px;
              font-size: 16px;
              font-family: SourceHanSansCN-Regular;
              font-weight: 400;
              color: #333;
              p {
                width: 160px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
            .c-slider-data {
              font-size: 12px;
              font-family: SourceHanSansCN-Medium;
              font-weight: 500;
              color: #999;
              margin-top: 8px;
            }
          }
        }
      }
    }
  }
}
</style>
