<template>
  <div class="home-detail">
    <div class="container">
      <div class="home-detail-schedule">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">
            首页
          </el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/home/news-advisory' }">
            新闻资讯
          </el-breadcrumb-item>
          <el-breadcrumb-item>正文</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="home-detail-main">
        <div
          class="home-detail-left"
          v-for="item in ByNewsIdList"
          :key="item.sign"
        >
          <h2 class="home-detail-h2">
            {{ item.title }}
          </h2>
          <div class="home-detail-clock">
            <span class="home-detail-data">
              <i class="el-icon-time"></i>
              {{ item.createTime }}
            </span>
            <span class="home-detail-data home-detail-num">
              <i class="el-icon-user"></i>
              {{ item.browseCount }}
            </span>
          </div>
          <div class="home-detail-txt" v-html="marked2html(item.content)"></div>
          <!-- <ul class="home-detail-tabbar">
            <li class="home-detail-item">
              <router-link
                to="/#"
                class="home-detail-tabbar-a"
                active-class="active"
              >
                上一篇：513商学院“渔人计划”千人招募集中营...
              </router-link>
            </li>
            <li class="home-detail-item">
              <router-link
                to="/#"
                class="home-detail-tabbar-a"
                active-class="active"
              >
                下一篇：热烈庆祝513商学院受邀并被授予“校...
              </router-link>
            </li>
          </ul> -->
        </div>
        <Slider />
      </div>
    </div>
  </div>
</template>

<script>
import Slider from '@components/views/home-components/slider/Slider'
import { mapActions, mapState } from 'vuex'
import { resolverMarked } from '@mixins/locality'
export default {
  components: {
    Slider,
  },
  mixins: [resolverMarked],
  methods: {
    ...mapActions('newList', ['getByNewsIdList']),
  },
  computed: {
    ...mapState('newList', {
      ByNewsIdList: state => state.ByNewsIdList,
    }),
  },
  created() {
    let search = this.$route.params.id
    this.getByNewsIdList(search)
  },
}
</script>

<style lang="less">
.home-detail {
  width: 100%;
  height: 100%;
  background: rgba(245, 245, 245, 1);
  overflow: hidden;
  .home-detail-schedule {
    font-size: 14px;
    font-family: SourceHanSansCN-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    margin-top: 57px;
    margin-bottom: 19px;
  }
  .home-detail-main {
    margin-bottom: 30px;
    display: flex;
    .home-detail-left {
      width: 880px;
      min-height: 300px;
      background: #fff;
      margin-right: 20px;
      padding: 0 81px;
      .home-detail-h2 {
        font-size: 28px;
        font-family: SourceHanSansCN-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        margin-top: 56px;
        text-align: center;
      }
      .home-detail-clock {
        margin-left: 260px;
        margin-top: 28px;
        .home-detail-data {
          font-size: 12px;
          font-family: SourceHanSansCN-Normal;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          i {
            font-size: 16px;
            position: relative;
            top: 1px;
          }
        }
        .home-detail-num {
          margin-left: 34px;
        }
      }
      .home-detail-txt {
        font-size: 16px;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 30px;
        margin-top: 40px;
        margin-bottom: 40px;
        overflow: hidden;
        p {
          margin-bottom: 20px;
          text-indent: 2rem;
          img {
            width: 100%;
            height: 100%;
            position: relative;
            left: -32px;
          }
        }
      }
      .home-detail-banner {
        width: 666px;
        height: 427px;
        margin-left: 26px;
        margin-top: 38px;
      }
      .home-detail-tabbar {
        display: flex;
        margin-top: 50px;
        justify-content: space-between;
        .home-detail-item {
          width: 354px;
          height: 44px;
          .home-detail-tabbar-a {
            display: block;
            padding: 0 20px;
            border: 1px solid rgba(204, 204, 204, 1);
            font-size: 14px;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            line-height: 44px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .active {
            color: @maincolor;
          }
        }
      }
    }
  }
}
</style>
