<template>
  <div class="corporate-vision">
    <div class="container">
      <p class="corporate-vision-title">
        企业愿景
      </p>
      <p class="corporate-vision-content">
        将继续秉持创新、专注、专业、共赢的精神，积极探索互联网创新教学新模式，
        打造双元化教育模式，以就业为教育的初心，实现优势互补、产教融合、校企协同、
        合作育人，为我国教育事业、高新行业发展做出更大贡献。
      </p>
      <div class="corporate-vision-main">
        <div v-for="item in list" :key="item.corporId">
          <div class="corporate-vision-show">
            <p
              :style="{ backgroundImage: `url(${item.imgUrl})` }"
              class="corporate-vision-show-show"
            ></p>
            <p
              :style="{ backgroundImage: `url(${item.showImgUrl})` }"
              class="corporate-vision-show-hidden"
            ></p>
          </div>
          <p class="corporate-vision-main-title">
            {{ item.title }}
          </p>
          <p class="corporate-vision-main-content">
            {{ item.content }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          corporId: 201,
          imgUrl: this.$imgUrl + '/about/vision_icon_default01%402x.png',
          title: '五 个 竞 争 因 素',
          content: '专 业 · 高 效 · 分 享 · 创 新 · 定 制',
          showImgUrl:
            this.$imgUrl +
            '/about/vision_icon_default01%20%E6%8B%B7%E8%B4%9D%402x.png',
        },
        {
          corporId: 202,
          imgUrl: this.$imgUrl + '/about/vision_icon_default02%402x.png',
          title: '一 个 理 念',
          content: '授 人 以 鱼 不 如 授 人 以 渔',
          showImgUrl:
            this.$imgUrl +
            '/about/vision_icon_default02%20%E6%8B%B7%E8%B4%9D%402x.png',
        },
        {
          corporId: 203,
          imgUrl: this.$imgUrl + '/about/vision_icon_default03%402x.png',
          title: '三 个 共 同 目 标',
          content: '不 断 开 拓  ·  创 造 价 值  ·  实 现 共 赢',
          showImgUrl:
            this.$imgUrl +
            '/about/vision_icon_default03%20%E6%8B%B7%E8%B4%9D%402x.png',
        },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.corporate-vision {
  width: 100%;
  height: 660px;
  background: rgba(245, 245, 245, 1);
  overflow: hidden;
  .corporate-vision-title {
    font-size: 30px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    text-align: center;
    margin-top: 100px;
    margin-bottom: 36px;
  }
  .corporate-vision-content {
    width: 815px;
    height: 56px;
    text-align: center;
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(128, 128, 128, 1);
    line-height: 28px;
    margin: 0 auto;
  }
  .corporate-vision-main {
    margin-top: 70px;
    display: flex;
    justify-content: space-between;
    div {
      width: 270px;
      text-align: center;
      .corporate-vision-show {
        p {
          width: 168px;
          height: 168px;
          background-color: rgba(255, 255, 255, 1);
          border-radius: 50%;
          margin-left: 50px;
          background-repeat: no-repeat;
          background-position: center;
        }
        .corporate-vision-show-hidden {
          display: none;
        }
      }
      .display-none {
        display: none;
      }
      .corporate-vision-main-title {
        font-size: 20px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        margin-top: 46px;
        margin-bottom: 16px;
      }
      .corporate-vision-main-content {
        font-size: 16px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(128, 128, 128, 1);
        line-height: 41px;
      }
    }
    div:hover {
      .corporate-vision-show-hidden {
        display: block;
      }
      .corporate-vision-main-title {
        color: #58c6bd;
      }
      .corporate-vision-show-show {
        display: none;
      }
    }
  }
}
</style>
