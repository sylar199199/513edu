<template>
  <div class="news-business">
    <div class="container">
      <ul class="news-business-list">
        <li
          class="news-business-item"
          v-for="item in tradeList"
          :key="item.sign"
        >
          <router-link
            :to="{
              name: 'homeNewsAdvisoryDetail',
              params: { id: item.sign },
            }"
          >
            <img
              class="news-business-imgMain"
              :src="item.pictureImage"
              alt=""
            />
            <div class="news-business-main">
              <p class="news-business-title">
                {{ item.title }}
              </p>
              <!-- <p class="news-business-text">
                {{ item.content }}
              </p> -->
              <div class="news-business-footer">
                <div class="news-business-fTop">
                  <i class="news-business-imgData el-icon-time"></i>
                  <span class="news-business-comStyle">{{
                    item.createTime
                  }}</span>
                </div>
                <div class="news-business-fBottom">
                  <i class="news-business-imgData el-icon-user"></i>
                  <span class="news-business-comStyle">{{
                    item.browseCount
                  }}</span>
                </div>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
      <div class="news-business-page">
        <base-pagenation :total="pageTotal" :page-size="9" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import BasePagenation from '@components/base/base-pagenation'
import { searchByCondition } from '@mixins/locality'

export default {
  name: 'home-industry',
  components: {
    'base-pagenation': BasePagenation,
  },
  mixins: [searchByCondition()],
  methods: {
    ...mapActions('newList', {
      handleGetDataByCondition: 'getTradeList',
    }),
  },
  computed: {
    ...mapState('newList', {
      tradeList: state => state.tradeList,
      pageTotal: state => parseInt(state.hotTotal),
    }),
  },
}
</script>

<style lang="less" scoped>
.news-business {
  width: 100%;
  .news-business-list {
    display: flex;
    flex-wrap: wrap;
    .news-business-item {
      margin-right: 42px;
      margin-top: 42px;
      width: 364px;
      height: 390px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(230, 230, 230, 1);
      overflow: hidden;
      .news-business-imgMain {
        width: 364px;
        height: 248px;
        display: block;
      }
      .news-business-main {
        overflow: hidden;
        height: 100%;
        .news-business-title {
          height: 46px;
          line-height: 24px;
          overflow: hidden;
          font-size: 16px;
          font-family: SourceHanSansCN-Normal;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          margin-top: 18px;
          margin-bottom: 18px;
          padding-left: 14px;
        }
        .news-business-text {
          width: 337px;
          height: 34px;
          font-size: 14px;
          font-family: SourceHanSansCN-Normal;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: 20px;
          padding-left: 14px;
        }
        .news-business-footer {
          display: flex;
          justify-content: space-between;
          padding: 15px;
          .news-business-imgData {
            font-size: 20px;
            margin-right: 5px;
            color: rgba(153, 153, 153, 1);
          }
          .news-business-comStyle {
            position: relative;
            top: -3px;
            font-size: 12px;
            font-family: SourceHanSansCN-Normal;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
          }
        }
      }
      .news-business-main:hover {
        background: @maincolor;
        .news-business-title,
        .news-business-text,
        .news-business-comStyle,
        .news-business-imgData {
          color: #fff;
        }
      }
    }
    .news-business-item:nth-child(3n + 3) {
      margin-right: 0;
    }
  }
  .news-business-page {
    padding: 0 380px;
    margin: 60px 0 140px;
  }
}
</style>
