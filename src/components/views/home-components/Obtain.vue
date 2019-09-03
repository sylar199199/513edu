<template>
  <div class="container">
    <h2 class="home_obtain_h2">
      优质就业岗位推荐
    </h2>
    <ul class="home-obtain-list">
      <li
        class="home-obtain-item"
        v-for="item in obtain_list"
        :key="item.obtainId"
      >
        <router-link to="/#" class="home-obtain-a">
          <div
            class="home-obtain-left"
            :style="{ background: item.obtainBackground }"
          >
            <strong class="home-obtain-left-strong">{{
              item.obtainLeftStrong
            }}</strong>
            <p class="home-obtain-left-p">
              {{ item.obtainLeftP }}
            </p>
          </div>
          <div class="home-obtain-right">
            <p class="home-obtain-right-p1">
              {{ item.obtainRightP1 }}
            </p>
            <p class="home-obtain-right-p2">
              <span class="home-obtain-right-span1">{{
                item.obtainRightP2Span1
              }}</span
              >{{ item.obtainRightP2Span2 }}
            </p>
            <p class="home-obtain-right-p3">
              <span class="home-obtain-right-span2">{{
                item.obtainRightP3Span1
              }}</span>
              <span class="home-obtain-right-span3">{{
                item.obtainRightP3Span2
              }}</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
    <div class="home-obtain-more">
      更多
    </div>
  </div>
</template>

<script>
import obtain_list from '@configs/obtain-list'
export default {
  data() {
    return {
      obtain_list,
    }
  },
}
</script>

<style lang="less" scoped>
.home_obtain_h2 {
  font-size: 30px;
  font-family: SourceHanSansCN-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  margin-top: 120px;
  text-align: center;
}
.home-obtain-list {
  width: 1150px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .home-obtain-item {
    min-width: 528px;
    margin: 40px 0;
    .home-obtain-a {
      display: flex;
      .home-obtain-left {
        width: 180px;
        height: 110px;
        border-radius: 4px;
        text-align: center;
        padding-top: 34px;
        margin-right: 24px;
        .home-obtain-left-strong {
          font-size: 24px;
          font-family: SourceHanSansCN-Medium;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
        }
        .home-obtain-left-p {
          margin-top: 5px;
          font-size: 12px;
          font-family: SourceHanSansCN-Regular;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
        }
      }
      .home-obtain-right {
        .home-obtain-right-p1 {
          font-size: 18px;
          font-family: SourceHanSansCN-Normal;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 41px;
        }
        .home-obtain-right-p2 {
          font-size: 14px;
          font-family: SourceHanSansCN-Normal;
          font-weight: 400;
          margin-top: 10px;
          .home-obtain-right-span1 {
            font-size: 14px;
            font-family: SourceHanSansCN-Normal;
            font-weight: 400;
            color: rgba(85, 198, 194, 1);
          }
        }
        .home-obtain-right-p3 {
          margin-top: 28px;
          .home-obtain-right-span2 {
            font-size: 14px;
            font-family: SourceHanSansCN-Normal;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            margin-right: 19px;
          }
          .home-obtain-right-span3 {
            font-size: 14px;
            font-family: SourceHanSansCN-Normal;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
          }
        }
      }
    }
  }
}
.home-obtain-more {
  width: 96px;
  height: 40px;
  border: 1px solid rgba(204, 204, 204, 1);
  border-radius: 2px;
  font-size: 14px;
  font-family: SourceHanSansCN-Normal;
  font-weight: 400;
  color: rgba(128, 128, 128, 1);
  line-height: 40px;
  text-align: center;
  margin: 0 auto 120px;
}
</style>
