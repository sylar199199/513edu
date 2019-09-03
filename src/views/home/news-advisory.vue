<template>
  <div class="news-advisory">
    <div
      class="news-advisory-banner"
      :style="{ backgroundImage: `url(${newsAdvisoryUrl})` }"
    >
      <div class="news-advisory-banner-main">
        <p>
          NEWS
        </p>
        <p>
          新闻资讯
        </p>
        <p></p>
        <p></p>
      </div>
    </div>
    <div class="news-pmgressbar">
      <div class="container">
        <div class="news-pmgressbar-main">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">
              首页
            </el-breadcrumb-item>
            <el-breadcrumb-item>新闻资讯</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
    </div>
    <div class="news-advisory-nav">
      <div class="container">
        <div class="news-advisory-nav-main">
          <router-link
            to="/home/news-advisory/business"
            class="news-advisory-nav-business"
            active-class="active"
          >
            企业动态
          </router-link>
          <span class="news-advisory-nav-yihshu"></span>
          <router-link
            to="/home/news-advisory/industry"
            class="news-advisory-nav-business"
            active-class="active"
          >
            行业新闻
          </router-link>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'news-advisory',
  data() {
    return {
      newsAdvisoryUrl:
        this.$imgUrl + '/news-advisory/homenews-advisory-banner.png',
    }
  },
}
</script>

<style lang="less" scoped>
.news-advisory-banner {
  width: 100%;
  height: 560px;
  background-size: cover;
  background-position: center;
  overflow: hidden;
  .news-advisory-banner-main {
    width: 390px;
    margin: 170px auto 0;
    position: relative;
    p:nth-child(1) {
      font-size: 50px;
      font-family: SourceHanSansCN-Light;
      font-weight: 300;
      color: rgba(255, 255, 255, 1);
      cursor: pointer;
    }
    p:nth-child(2) {
      margin-top: 20px;
      font-size: 80px;
      font-family: SourceHanSansCN-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      cursor: pointer;
    }
    p:nth-child(3) {
      width: 236px;
      height: 95px;
      border-top: 2px solid rgba(255, 255, 255, 1);
      border-right: 2px solid rgba(255, 255, 255, 1);
      opacity: 0.7;
      position: absolute;
      right: 0;
      top: 33px;
    }
    p:nth-child(4) {
      width: 50px;
      height: 2px;
      background: rgba(255, 255, 255, 1);
      position: absolute;
      right: 2px;
      top: 126px;
      opacity: 0.7;
    }
  }
}
.news-pmgressbar {
  margin: 20px 0;
  .news-pmgressbar-main {
    font-size: 16px;
    font-family: SourceHanSansCN-Light;
    font-weight: 300;
    color: rgba(102, 102, 102, 1);
    margin-left: 10px;
  }
}
.news-advisory-nav {
  .news-advisory-nav-main {
    text-align: center;
    .news-advisory-nav-business {
      font-size: 30px;
      font-family: SourceHanSansCN-Regular;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
    .active {
      color: #58c6bd;
    }
    .news-advisory-nav-yihshu {
      display: inline-block;
      width: 0px;
      height: 28px;
      border: 1px solid rgba(204, 204, 204, 1);
      margin: 0 29px;
      position: relative;
      top: 4px;
    }
  }
}
</style>
