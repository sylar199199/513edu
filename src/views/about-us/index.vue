<template>
  <div class="about-us">
    <div
      class="about-me"
      :style="{
        backgroundImage: `url(${$imgUrl}/about/banner_img_bg%402x.png)`,
      }"
    >
      <div class="news-advisory-banner-main">
        <p>
          ABOUT US
        </p>
        <p>
          关于我们
        </p>
        <p></p>
        <p></p>
      </div>
    </div>
    <div class="five-one-three container">
      <div>
        <p>伍壹叁教育</p>
        <p>
          伍壹叁教育集团（以下简称：513教育）
          513起名来源于，网址513.com域名，513谐音“我要上”
          在教育行业便于寓意帮助、传播品牌。集团旗下有513商学院、513在线教育、云南513、桂林513、
          洋贸国际电子商务有限公司、兴茂国际电子商务有限公司、零时科技等。主要业务线上线下结合的
          职业教育模式，自主开发在线平台、在线课程、在线实训、软件研发、产学研合作、教育信息化、
          创业孵化服务为一体的教育生态科技企业，专注跨境电商、大数据、电竞、网络安全、区块链等人
          才培养。公司以“产教融合、协同育人”为理念...
        </p>
        <p>
          <el-button @click="handleBtn">
            更多介绍
          </el-button>
        </p>
      </div>
      <div
        :style="{ backgroundImage: `url(${$imgUrl}/about/513_img%402x.png)` }"
      ></div>
    </div>
    <main-business />
    <div class="elite-team">
      <div class="container">
        <p>团队风采</p>
        <p>
          拥有专业的课程研发团队及师资队伍约100多人，联合全国高校创建了32所跨境电商实训
          与创业中心基地、15所校外实训基地，并建立有创业扶持基金500多万，帮助学生创业，
          已通过培训就业学生共计25000多人次。
        </p>
        <div class="elite-team-main">
          <div>
            <div>
              <img :src="$imgUrl + '/about/team_img_01%402x.png'" alt="" />
              <img :src="$imgUrl + '/about/team_img_02%402x.png'" alt="" />
            </div>
            <div
              :style="{
                backgroundImage: `url(${$imgUrl}/about/team_img_03%402x.png)`,
              }"
            ></div>
          </div>
          <div
            :style="{
              backgroundImage: `url(${$imgUrl}/about/team_img_04%402x.png)`,
            }"
          ></div>
        </div>
      </div>
    </div>
    <corporate-vision />
    <div class="about-us-map">
      <div class="about-us-map-main">
        <div
          class="about-us-map-left"
          :style="{ backgroundImage: `url(${$imgUrl}/about/map_bg%402x.png)` }"
        >
          <div class="about-us-map-mask"></div>
        </div>
        <div
          class="about-us-map-right"
          :style="{ backgroundImage: `url(${$imgUrl}/about/map_bg%402x.png)` }"
        ></div>
      </div>
      <div class="about-us-map-float">
        <div class="about-us-map-float-main">
          <div class="about-us-map-item">
            <p class="about-us-map-tell-me">
              联系我们
            </p>
            <p class="about-us-map-yi-heng"></p>
          </div>
          <div class="about-us-map-item">
            <p>伍壹叁在线教育（深圳）有限公司</p>
            <p>地址：深圳市南山区深南大道10168号佳嘉豪商务大厦18楼B</p>
          </div>
          <div class="about-us-map-item">
            <p>深圳市伍壹叁教育集团有限公司</p>
            <p>地址：深圳市龙华新区浪静路10号华兴产业园6栋3楼</p>
          </div>
        </div>
      </div>
    </div>
    <div class="universities-cooperation">
      <div class="container">
        <div class="universities-cooperation-main">
          <div class="universities-cooperation-left">
            <p class="universities-cooperation-left-title">
              高校/企业合作
            </p>
            <p class="universities-cooperation-left-content">
              <img src="@/assets/icon/about1.png" alt="" />
              郑先生
            </p>
            <p class="universities-cooperation-left-content">
              <img src="@/assets/icon/about2.png" alt="" />
              13530000351
            </p>
            <p class="universities-cooperation-left-content">
              <img src="@/assets/icon/about3.png" alt="" />
              3431438970
            </p>
            <p class="universities-cooperation-left-content">
              <img src="@/assets/icon/about4.png" alt="" />
              3431438970@qq.com
            </p>
          </div>
          <div
            class="universities-cooperation-right"
            :style="{
              backgroundImage: `url(${$imgUrl}/about/WeChat%402x.png)`,
            }"
          ></div>
        </div>
      </div>
    </div>
    <!-- 点击更多i介绍 -->
    <el-dialog
      title="伍壹叁教育集团"
      :visible.sync="dialogVisible"
      width="40%"
      center
      :close-on-click-modal="false"
    >
      <p class="about-us-dialog">
        伍壹叁教育集团（以下简称：513教育）
        513起名来源于，网址513.com域名，513谐音“我要上”
        在教育行业便于寓意帮助、传播品牌。集团旗下有513商学院、513在线教育、云南513、桂林513、
        洋贸国际电子商务有限公司、兴茂国际电子商务有限公司、零时科技等。主要业务线上线下结合的
        职业教育模式，自主开发在线平台、在线课程、在线实训、软件研发、产学研合作、教育信息化、
        创业孵化服务为一体的教育生态科技企业，专注跨境电商、大数据、电竞、网络安全、区块链等人
        才培养。公司以“产教融合、协同育人”为理念，
      </p>
      <p class="about-us-dialog">
        513教育，是阿里巴巴“百城千校
        百万英才”项目官方指定平台，携手阿里巴巴、亚马逊、
        深圳大学、江西财经大学、吉首大学、广东技师学院等大批一流跨境电商企业、高校，
        共建专业、学科及课程体系，为学校师生提供“教学—实训—认证—就业—创业”的一站式人
        才培养输送服务，为企业提供专岗人才定制服务。
      </p>
      <p class="about-us-dialog">
        513教育拥有专业的课程研发团队及师资队伍约100多人，具有完善的课程体系和实训课程，
        联合全国高校创建了32所跨境电商实训与创业中心基地，在高新技术行业与四叶草、DLB大
        数据开展网络安全、大数据等课程，联合高校创建了15所校外实训基地，并建立有创业扶持
        基金500多万，帮助学生创业。已通过培训就业学生共计25000多人次，未来三年力争达到年10万人次。
      </p>
      <p class="about-us-dialog">
        513教育将继续秉持创新、专注、专业、共赢的精神，积极探索互联网创新教学新模式，
        打造双元化教育模式，以就业为教育的初心，实现优势互补、产教融合、校企协同、
        合作育人，促进我国教育行业高速发展，大量培养国际化复合型、创新型、实战型的高科技
        人才，为我国教育事业、高新行业发展做出更大贡献.
      </p>
    </el-dialog>
  </div>
</template>

<script>
import mainBusiness from './main-business'
import corporateVision from './corporate-vision'
export default {
  components: {
    'main-business': mainBusiness,
    'corporate-vision': corporateVision,
  },
  data() {
    return {
      dialogVisible: false,
    }
  },
  methods: {
    // 点击更多i介绍
    handleBtn() {
      this.dialogVisible = true
    },
  },
}
</script>

<style lang="less" scoped>
.about-me {
  width: 100%;
  height: 560px;
  background-size: cover;
  background-position: center;
  overflow: hidden;
  .news-advisory-banner-main {
    width: 450px;
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
      margin-left: 80px;
      margin-top: 20px;
      font-size: 80px;
      font-family: SourceHanSansCN-Medium;
      font-weight: 500;
      color: #58c6bd;
      cursor: pointer;
    }
    p:nth-child(3) {
      width: 195px;
      height: 95px;
      border-top: 2px solid #58c6bd;
      border-right: 2px solid #58c6bd;
      opacity: 0.7;
      position: absolute;
      right: 0;
      top: 33px;
    }
    p:nth-child(4) {
      width: 50px;
      height: 2px;
      background: #58c6bd;
      position: absolute;
      right: 2px;
      top: 126px;
      opacity: 0.7;
    }
  }
}
.five-one-three {
  margin-top: 100px;
  margin-bottom: 126px;
  display: flex;
  justify-content: space-between;
  div:nth-child(1) {
    width: 510px;
    height: 300px;
    p:nth-child(1) {
      font-size: 30px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      margin: 20px 0 38px 0;
    }
    p:nth-child(2) {
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(128, 128, 128, 1);
      line-height: 26px;
      margin-bottom: 34px;
    }
  }
  div:nth-child(2) {
    width: 610px;
    height: 410px;
  }
}
.elite-team {
  overflow: hidden;
  p:nth-child(1) {
    font-size: 30px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    text-align: center;
    margin-top: 120px;
    margin-bottom: 38px;
  }
  p:nth-child(2) {
    width: 782px;
    height: 60px;
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(128, 128, 128, 1);
    line-height: 28px;
    margin: 0 auto;
    text-align: center;
  }
  .elite-team-main {
    margin: 45px 0 120px 0;
    display: flex;
    justify-content: space-between;
    div:nth-child(1) {
      div:nth-child(1) {
        height: 234px;
        margin-bottom: 20px;
        img {
          width: 270px;
          height: 234px;
        }
        img:nth-child(1) {
          margin-right: 18px;
        }
      }
      div:nth-child(2) {
        width: 558px;
        height: 308px;
      }
    }
    div:nth-child(2) {
      width: 536px;
      height: 562px;
    }
  }
}
.about-us-map {
  width: 100%;
  height: 660px;
  position: relative;
  .about-us-map-main {
    width: 100%;
    height: 660px;
    display: flex;
    .about-us-map-left {
      width: 50%;
      height: 660px;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      .about-us-map-mask {
        width: 100%;
        height: 660px;
        background: rgba(0, 0, 0, 1);
        opacity: 0.7;
      }
    }
    .about-us-map-right {
      width: 50%;
      height: 660px;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }
  }
  .about-us-map-float {
    position: absolute;
    top: 110px;
    left: 160px;
    .about-us-map-float-main {
      .about-us-map-item {
        margin-top: 60px;
        p {
          font-size: 16px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 30px;
          opacity: 0.8;
        }
        .about-us-map-tell-me {
          font-size: 30px;
        }
        .about-us-map-yi-heng {
          width: 59px;
          margin-top: 20px;
          border: 1px solid rgba(255, 255, 255, 1);
        }
      }
    }
  }
}
.universities-cooperation {
  .universities-cooperation-main {
    width: 610px;
    height: 290px;
    margin: 120px auto;
    display: flex;
    justify-content: space-between;
    .universities-cooperation-left {
      .universities-cooperation-left-title {
        font-size: 30px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        margin: 30px 0 30px 0;
      }
      .universities-cooperation-left-content {
        margin-bottom: 12px;
        font-size: 16px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        img {
          margin-right: 15px;
          position: relative;
          top: 10px;
        }
      }
    }
    .universities-cooperation-right {
      width: 300px;
      height: 290px;
    }
  }
}
.about-us-dialog {
  margin-bottom: 20px;
  text-indent: 2rem;
  font-size: 16px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(128, 128, 128, 1);
  line-height: 30px;
}
</style>
