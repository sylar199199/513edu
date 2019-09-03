<template>
  <div class="default-footer">
    <div class="default-footer">
      <div class="container">
        <div class="default-footer-main">
          <div class="default-footer-top">
            <div
              class="default-footer-top-img"
              :style="{
                backgroundImage: `url(${$imgUrl}/base-footer/footer_logo%20%402x.png)`,
              }"
            ></div>
            <ul class="default-footer-top-list">
              <li
                class="default-footer-top-item"
                v-for="item in footerList"
                :key="item.footerId"
              >
                <router-link class="default-footer-top-a" :to="item.href">
                  {{ item.name }}
                </router-link>
              </li>
            </ul>
            <div class="default-footer-top-phone">
              <img
                class="default-footer-top-phone-img"
                :src="$imgUrl + '/base-footer/phone%402x.png'"
                alt=""
              />
              <span class="default-footer-top-phone-span">0755-26407354</span>
            </div>
          </div>
          <div class="default-footer-bottom">
            <p class="default-footer-bottom-p1">
              地址：深圳市南山区深南大道10168号佳嘉豪商务大厦18楼B
            </p>
            <p class="default-footer-bottom-p2">
              Copyright ©伍壹叁在线教育（深圳）有限公司 版权所有
              <a href="http://www.beian.miit.gov.cn" target="_blank">
                粤ICP备19058570号-1
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'default-footer',
  data() {
    return {
      footerList: [
        { footerId: 'footer01', name: '首页', href: '/' },
        { footerId: 'footer02', name: '新闻资讯', href: '/' },
        { footerId: 'footer03', name: '关于我们', href: '/about-us' },
        { footerId: 'footer05', name: 'APP下载', href: '/app-download' },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.default-footer {
  height: 260px;
  background: rgba(64, 64, 64, 1);
  .default-footer-main {
    width: 1160px;
    margin: 0 auto;
    overflow: hidden;
    .default-footer-top {
      margin-top: 56px;
      display: flex;
      .default-footer-top-img {
        width: 196px;
        height: 60px;
        background-repeat: no-repeat;
        background-size: contain;
      }
      .default-footer-top-list {
        display: flex;
        margin-top: 18px;
        margin-left: 42px;
        .default-footer-top-item {
          width: 64px;
          margin: 0 22px;
          .default-footer-top-a {
            font-size: 16px;
            font-family: SourceHanSansCN-Normal;
            font-weight: 400;
            color: rgba(230, 230, 230, 1);
          }
        }
      }
      .default-footer-top-phone {
        margin-top: 7px;
        margin-left: 198px;
        .default-footer-top-phone-img {
          width: 34px;
          height: 34px;
          margin-right: 15px;
        }
        .default-footer-top-phone-span {
          font-size: 18px;
          font-family: SourceHanSansCN-Normal;
          font-weight: 400;
          color: rgba(245, 245, 245, 1);
          position: relative;
          top: -10px;
        }
      }
    }
    .default-footer-bottom {
      margin-top: 51px;
      .default-footer-bottom-p1 {
        font-size: 14px;
        font-family: SourceHanSansCN-Normal;
        font-weight: 400;
        color: rgba(204, 204, 204, 1);
        margin-bottom: 10px;
      }
      .default-footer-bottom-p2 {
        font-size: 14px;
        font-family: SourceHanSansCN-Normal;
        font-weight: 400;
        color: rgba(204, 204, 204, 1);
        a {
          font-size: 14px;
          font-family: SourceHanSansCN-Normal;
          font-weight: 400;
          color: rgba(204, 204, 204, 1);
        }
      }
    }
  }
}
</style>
