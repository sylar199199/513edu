<template>
  <div class="main-business">
    <div class="container">
      <p class="main-business-title">
        主营业务
      </p>
      <div class="main-business-main">
        <div v-for="item in list" :key="item.ywId">
          <div class="css-show-hidden">
            <img :src="item.imgUrl" alt="" />
            <p>{{ item.title }}</p>
            <p>{{ item.twoTitle }}</p>
            <p>{{ item.content }}</p>
          </div>
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
          ywId: 111,
          imgUrl: this.$imgUrl + '/about/icon_01%402x.png',
          title: '人才培养',
          twoTitle: '高校人才一体化培训与就业',
          content:
            '5~12天岗前免费技能培训，180天企业实习与就业，联合办学，订单培养等多种培养模式。',
        },
        {
          ywId: 112,
          imgUrl: this.$imgUrl + '/about/icon_02%402x.png',
          title: '线上课程',
          twoTitle: '跨境干货实时了解与掌握',
          content:
            '提供更便捷的实战学习，包含跨境电商运营+实操、网络安全课程、区块链课程、电竞运营课程、大数据课程及合作高校教授课程',
        },
        {
          ywId: 113,
          imgUrl: this.$imgUrl + '/about/icon_03%402x.png',
          title: '企业培训',
          twoTitle: '跨境企业全方位学习成长',
          content:
            'Amazon、速卖通、阿里国际、Wish等多种跨境平台课程开设；基础运营、产品开发、站外推广、团队管理等多类型课程体系。',
        },
        {
          ywId: 114,
          imgUrl: this.$imgUrl + '/about/icon_04%402x.png',
          title: '团队孵化',
          twoTitle: '传统工厂一站式转型与跨境',
          content:
            '90天全日制转型运营指导，3人小团队从0到1式成长，日出1000美金销量目标达成。',
        },
      ],
      current: 0, //复制成功提示显示或者隐藏
      seen: false, //显示和隐藏
    }
  },
}
</script>

<style lang="less" scoped>
.main-business {
  width: 100%;
  height: 708px;
  background: rgba(245, 245, 245, 1);
  overflow: hidden;
  .main-business-title {
    font-size: 30px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    margin-top: 64px;
    text-align: center;
  }
  .main-business-main {
    margin-top: 110px;
    display: flex;
    div {
      width: 260px;
      transition-duration: 1s;
      text-align: center;
      height: 344px;
      margin-right: 27px;
      background: rgba(255, 255, 255, 1);
      img {
        width: 120px;
        height: 100px;
        margin: 60px 70px 0;
      }
      p:nth-child(2) {
        font-size: 20px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        margin: 48px 0 22px 0;
      }
      p:nth-child(3) {
        font-size: 16px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
      p:nth-child(4) {
        display: none;
        font-size: 16px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 24px;
      }
    }
    div:hover {
      .css-show-hidden {
        transform: scale(1.3);
        transition-duration: 1s;
        background: rgba(88, 198, 189, 1);
        box-shadow: 0px 6px 35px 0px rgba(21, 138, 128, 0.28);
        overflow: hidden;
        img {
          display: none;
        }
        p:nth-child(2) {
          margin: 90px 0 50px 0;
          font-size: 26px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
        }
        p:nth-child(3) {
          color: #ffffff;
          margin-bottom: 30px;
        }
        p:nth-child(4) {
          display: block;
          padding: 0 30px;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
