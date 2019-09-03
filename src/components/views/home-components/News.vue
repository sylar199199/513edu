<template>
  <div class="container">
    <h2 class="home-new-h2">
      新闻资讯
    </h2>
    <div class="home-new-main">
      <router-link
        :to="{
          name: 'homeNewsAdvisoryDetail',
          params: { id: homeNewsList.sign },
        }"
      >
        <div class="home-new-left">
          <img
            class="home-new-left-img"
            :src="homeNewsList.pictureImage"
            alt=""
          />
          <p class="home-left-universities">
            {{ homeNewsList.title }}
          </p>
          <!--           <p class="home-left-conclude">
            {{ homeNewsList.content }}
          </p> -->
          <div class="home-left-data">
            <span class="home-left-data-span">
              {{ homeNewsList.createTime }}
            </span>
            <span class="home-left-data-span">公司动态</span>
          </div>
        </div>
      </router-link>
      <div class="home-new-right">
        <ul class="home-new-ul">
          <li class="home-new-li" v-for="item in homeNewList" :key="item.sign">
            <router-link
              :to="{
                name: 'homeNewsAdvisoryDetail',
                params: { id: item.sign },
              }"
            >
              <ul class="home-new-right-list">
                <li class="home-new-right-data">
                  {{ item.createTime }}
                </li>
                <li class="home-new-right-item">
                  <p class="home-new-right-top">
                    {{ item.title }}
                  </p>
                  <!-- <p class="home-new-right-bottom">
                    {{ item.content }}
                  </p> -->
                </li>
              </ul>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <router-link class="home-new-more" to="/home/news-advisory">
      更多
    </router-link>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { resolverMarked } from '@mixins/locality'

export default {
  computed: {
    ...mapState('newList', {
      homeNewList: state => state.homeNewList,
      homeNewsList: state => state.homeNewsList,
    }),
  },
  mixins: [resolverMarked],
  methods: {
    ...mapActions('newList', ['getNewList', 'getInformationList']),
  },
  created() {
    this.getNewList()
    this.getInformationList()
  },
}
</script>

<style lang="less" scoped>
.home-new-h2 {
  font-size: 30px;
  font-family: SourceHanSansCN-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  text-align: center;
  margin-top: 120px;
}
.home-new-main {
  display: flex;
  margin-top: 62px;
  margin-left: 94px;
  .home-new-left {
    margin-right: 160px;
    .home-new-left-img {
      width: 418px;
      height: 278px;
    }
    .home-left-universities {
      width: 418px;
      font-size: 16px;
      height: 46px;
      line-height: 24px;
      overflow: hidden;
      font-family: SourceHanSansCN-Normal;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      margin-top: 29px;
    }
    .home-left-conclude {
      width: 418px;
      height: 35px;
      font-size: 14px;
      font-family: SourceHanSansCN-Normal;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 20px;
      margin-top: 16px;
    }
    .home-left-data {
      width: 418px;
      display: flex;
      justify-content: space-between;
      margin-top: 18px;
      .home-left-data-span {
        font-size: 12px;
        font-family: SourceHanSansCN-Normal;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
    }
  }
  .home-new-right {
    .home-new-li {
      margin-bottom: 50px;
      cursor: pointer;
      a {
        display: block;
        .home-new-right-list {
          display: flex;
          .home-new-right-data {
            width: 102px;
            height: 48px;
            background: rgba(230, 230, 230, 1);
            border-radius: 8px;
            font-size: 18px;
            font-family: SourceHanSansCN-Normal;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            line-height: 48px;
            text-align: center;
            margin-right: 28px;
          }
          .home-new-right-item {
            max-width: 392px;
            .home-new-right-top {
              height: 46px;
              line-height: 24px;
              font-size: 16px;
              overflow: hidden;
              font-family: SourceHanSansCN-Normal;
              font-weight: 400;
              color: rgba(51, 51, 51, 1);
            }
            .home-new-right-bottom {
              margin-top: 10px;
              font-size: 14px;
              font-family: SourceHanSansCN-Normal;
              font-weight: 400;
              color: rgba(102, 102, 102, 1);
              line-height: 20px;
            }
          }
        }
      }
    }
  }
}
.home-new-more {
  display: block;
  width: 96px;
  height: 40px;
  border: 1px solid rgba(204, 204, 204, 1);
  border-radius: 2px;
  text-align: center;
  margin: 0 auto 120px;
  font-size: 14px;
  font-family: SourceHanSansCN-Normal;
  font-weight: 400;
  color: rgba(128, 128, 128, 1);
  line-height: 40px;
}
</style>
