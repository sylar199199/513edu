<template>
  <div class="index">
    <div class="home_banner">
      <Banner />
    </div>
    <div class="container">
      <div class="home_course">
        <h2 class="home_course_h2">
          关于513教育
        </h2>
        <div class="home_course_text">
          513电商学院以联合全国高校，培养跨境电商人才为核心，以聚合知名跨境电商企业，
          解决企业用人需求为根本，帮助高校学生提供就业方向，为跨境电商行业挖掘人才、
          推荐人才、培训人才，最终实现人才与企业无缝对接的商业模式。
        </div>
        <div class="home_course_actual">
          <div
            class="home_course_training"
            :style="{ backgroundImage: `url(${courseTrainingUrl})` }"
          >
            <p class="home_course_p1">
              跨境电商理论+实训
            </p>
            <p class="home_course_p2">
              提供专业的在线学习平台供学生学习电商理论知识；提供跨境
              电商仿真实训创新平台，注重在线视频授课与实训教学的结合。
            </p>
          </div>
          <div
            class="home_course_practice"
            :style="{ backgroundImage: `url(${coursePracticeUrl})` }"
          >
            <p class="home_course_p1">
              实践课
            </p>
            <p class="home_course_p2">
              通过实践课深入了解企业、跨境电商，了解将要从事的工作方向；
              开展素拓活动，让大学生感受深圳充满激情与活力的人文气息。
            </p>
          </div>
        </div>
      </div>
      <Handpick />
    </div>
    <div class="home_Amazon">
      <div class="container">
        <h2 class="home_Amazon_h2">
          亚马逊仿真实训平台
        </h2>
        <div class="home_Amazon_text">
          提供跨境电商仿真实训创新平台，注重在线视频授课结合
          实训，学生可以结合实际操作步骤，模拟出真实业务操作步骤，易用性和真实性。针对零基
          础起步，完成新开店、选品、发布产品、产品管理、仿真发货、推广营运等实操，学完可直
          接上岗就业。
        </div>
        <div class="home_Amazon_imgList">
          <div
            class="home_Amazon_imgListLeft"
            :style="{ backgroundImage: `url(${imgListLeftUrl})` }"
          ></div>
          <div
            class="home_Amazon_bitebi"
            :style="{ backgroundImage: `url(${imgListRightUrl})` }"
          ></div>
          <div class="home_Amazon_imgListRight">
            <img
              class="home_Amazon_img02"
              :src="$imgUrl + '/index/20190611114617.png'"
              alt=""
            />
            <img
              class="home_Amazon_img02"
              :src="$imgUrl + '/index/20190611114607.png'"
              alt=""
            />
            <img
              class="home_Amazon_img02"
              :src="$imgUrl + '/index/20190611114553.png'"
              alt=""
            />
            <img
              class="home_Amazon_img02"
              :src="$imgUrl + '/index/20190611114526.png'"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
    <div class="home_obtain">
      <Obtain />
    </div>
    <div class="home-cooperation">
      <div class="container">
        <h2 class="home-cooperation-h2">
          校企合作解决方案
        </h2>
        <ul class="home-cooperation-main">
          <li class="home-cooperation-common">
            <div class="home-cooperation-common-heightclass">
              合作高校案例
            </div>
            <p class="home-cooperation-common-p">
              与全国各大高校强强合作，开展跨境
              电商就业特训营，帮助高校毕业生学习跨境电商知识、运营实战技能，提升毕业
              生就业竞争力，解决就业难题。
            </p>
            <div class="home-cooperation-common-imglist">
              <img
                class="home-cooperation-common-img"
                :src="$imgUrl + '/index/u270.png'"
                alt=""
              />
              <img
                class="home-cooperation-common-img"
                :src="$imgUrl + '/index/u272.png'"
                alt=""
              />
            </div>
          </li>
          <li
            class="home-cooperation-jiahao"
            :style="{ backgroundImage: `url(${jiahaoUrl})` }"
          ></li>
          <li class="home-cooperation-common">
            <div class="home-cooperation-common-heightclass">
              人才双选会
            </div>
            <p class="home-cooperation-common-p">
              与行业其他知名电子商务企业实行战略纵深
              合作，为电商行业挖掘人才、推荐人才、培训人才。每月定期召开人才双选会，学生与
              企业意向确认后签订入职协议。
            </p>
            <div class="home-cooperation-common-imglist">
              <img
                class="home-cooperation-common-img"
                :src="$imgUrl + '/index/u274.png'"
                alt=""
              />
              <img
                class="home-cooperation-common-img"
                :src="$imgUrl + '/index/u276.png'"
                alt=""
              />
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="home-collaborate">
      <div class="container">
        <h2 class="home-collaborate-h2">
          实践课校企合作方案
        </h2>
        <p class="home-collaborate-p1">
          三/五天校企合作见习游学方案内容
        </p>
        <div class="home-collaborate-main">
          <div class="home-collaborate-main-div">
            <p class="home-collaborate-p02">
              <span class="home-collaborate-span01">1</span>
              到深圳参观行业优秀企业
            </p>
            <p class="home-collaborate-p03">
              通过参观各公司工作环境，了解各公司内部组织架构，以及工作人员的详细讲解，
              学生们对跨境电商行业有了进一步的了解。
            </p>
            <img
              class="home-collaborate-img01 home-collaboratecom"
              :src="$imgUrl + '/index/u403.png'"
              alt=""
            />
            <img
              class="home-collaborate-img02 home-collaboratecom"
              :src="$imgUrl + '/index/u405.png'"
              alt=""
            />
          </div>
          <div class="home-collaborate-main-div">
            <p class="home-collaborate-p02">
              <span class="home-collaborate-span01">2</span>
              走进学院学习电商知识
            </p>
            <p class="home-collaborate-p03">
              学习跨境电商的趋势，实操展示亚马逊后台，让学生们更深入的了解亚马逊电商，
              并完成跨境电商实践操作学习。
            </p>
            <img
              class="home-collaborate-img03"
              :src="$imgUrl + '/index/u415.png'"
              alt=""
            />
          </div>
          <div class="home-collaborate-main-div">
            <p class="home-collaborate-p02">
              <span class="home-collaborate-span01">3</span>
              课外完成团队素质拓展
            </p>
            <p class="home-collaborate-p03">
              本次素拓设置了游戏《前方打仗 后方支援》，增强团队协作、沟通协调能
              力，提升团队凝聚力。
            </p>
            <img
              class="home-collaborate-img04 home-collaboratecom"
              :src="$imgUrl + '/index/u421.png'"
              alt=""
            />
            <img
              class="home-collaborate-img05 home-collaboratecom"
              :src="$imgUrl + '/index/u425.jpg'"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
    <div
      class="home-choose"
      :style="{ backgroundImage: `url(${homeChooseUrl})` }"
    >
      <div class="container">
        <div class="home-choose-title">
          为何选择我们
        </div>
        <ul class="home-choose-list">
          <li class="home-choose-item">
            <img
              class="home-choose-img"
              :src="$imgUrl + '/index/icon_talents%402x.png'"
              alt=""
            />
            <p class="home-choose-p1">
              个性化人才输出
            </p>
            <p class="home-choose-p2">
              6天高校人才岗前培训，可按个人.按团队、定向、定岗输出至跨境电商企业，根
              本解决跨境电商企业用人难题。
            </p>
          </li>
          <li class="home-choose-item">
            <img
              class="home-choose-img"
              :src="$imgUrl + '/index/icon_project%402x.png'"
              alt=""
            />
            <p class="home-choose-p1">
              精品化项目孵化
            </p>
            <p class="home-choose-p2">
              90天一站式项目孵化指导，从0到日销1000美金的订单突破，从0到专业运营团队的搭建，从0到跨境出海的见证与成
              长。
            </p>
          </li>
          <li class="home-choose-item">
            <img
              class="home-choose-img"
              :src="$imgUrl + '/index/icon_curriculum%402x.png'"
              alt=""
            />
            <p class="home-choose-p1">
              体系化课程培训
            </p>
            <p class="home-choose-p2">
              卖家从0到1成长课程培训体系，涵盖
              运营、选品、CPC、店铺诊断等课程，量身打造亚马逊卖家身边的跨境电商学
              院。
            </p>
          </li>
          <li class="home-choose-item">
            <img
              class="home-choose-img"
              :src="$imgUrl + '/index/icon_serve%402x.png'"
              alt=""
            />
            <p class="home-choose-p1">
              一站式跨境服务
            </p>
            <p class="home-choose-p2">
              支付、商标、物流、ERP、VAT、海外仓等服务应有尽有，为亚马逊卖家考虑更多，提供专业、多元、全方位的卖家
              服务
            </p>
          </li>
        </ul>
      </div>
    </div>
    <div class="home-sheet">
      <div class="container">
        <h2 class="home-sheet-h2">
          他们都在与我们合作
        </h2>
        <ul class="home-sheet-list">
          <li
            class="home-sheet-item"
            v-for="item in sheet_list"
            :key="item.sheetId"
          >
            <a href="javascript:" class="home-sheet-a">
              <img class="home-sheet-img" :src="item.sheetSrc" alt="" />
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="home-streamer">
      <div class="container">
        已和<span class="home-streamer-weight">108 所</span>高校合作，
        <span class="home-streamer-weight">306 家</span>企业合作，累计培训
        <span class="home-streamer-weight"> 1358 名</span
        >学员，累计为企业输送人才
        <span class="home-streamer-weight"> 1237 名</span>。
      </div>
    </div>
    <div class="home-new">
      <News />
    </div>
  </div>
</template>

<script>
import sheet_list from '@configs/sheet-list'
import Banner from '@components/banner/banner'
import News from '@components/views/home-components/News'
import Obtain from '@components/views/home-components/Obtain'
import Handpick from '@components/views/home-components/Handpick'
export default {
  name: 'index',
  components: {
    News,
    Obtain,
    Handpick,
    Banner,
  },
  data() {
    return {
      courseTrainingUrl: this.$imgUrl + '/index/img_bg01%402x.png',
      coursePracticeUrl:
        this.$imgUrl +
        '/index/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20190820155330.png',
      imgListLeftUrl: this.$imgUrl + '/index/20190611114624.png',
      imgListRightUrl: this.$imgUrl + '/index/bitebi.png',
      jiahaoUrl: this.$imgUrl + '/index/jiahao.png',
      homeChooseUrl: this.$imgUrl + '/index/choose.big.png',
      sheet_list,
    }
  },
}
</script>

<style lang="less" scoped>
.abc {
  width: 100%;
  height: 30px;
  background: red;
}
.home_banner {
  width: 100%;
  height: 560px;
  /* background-image: url('http://front.513online.top/front/img_banner%402x.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; */
}
.home_course {
  width: 100%;

  .home_course_h2 {
    font-size: 30px;
    font-family: SourceHanSansCN-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    margin-top: 120px;
    text-align: center;
  }

  .home_course_text {
    width: 858px;
    height: 44px;
    font-size: 16px;
    font-family: SourceHanSansCN-Normal;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 24px;
    margin: 38px auto 0;
  }

  .home_course_actual {
    width: 1086px;
    height: 210px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    margin-top: 68px;

    .home_course_training {
      width: 528px;
      height: 100%;
      padding-left: 45px;
      padding-top: 45px;
    }

    .home_course_practice {
      width: 528px;
      height: 100%;
      padding-left: 45px;
      padding-top: 45px;
    }

    .home_course_p1 {
      font-size: 28px;
      font-family: SourceHanSansCN-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }

    .home_course_p2 {
      width: 429px;
      font-size: 14px;
      font-family: SourceHanSansCN-Normal;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 24px;
      margin-top: 24px;
    }
  }
}
.home_Amazon {
  width: 100%;
  height: 746px;
  background: rgba(245, 245, 245, 1);
  overflow: hidden;

  .home_Amazon_h2 {
    font-size: 30px;
    text-align: center;
    font-family: SourceHanSansCN-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    margin-top: 82px;
    margin-bottom: 38px;
  }
  .home_Amazon_text {
    width: 838px;
    height: 72px;
    font-size: 16px;
    font-family: SourceHanSansCN-Normal;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 28px;
    margin: 0 auto 53px;
  }
  .home_Amazon_imgList {
    width: 1090px;
    margin: 0 auto;
    display: flex;

    .home_Amazon_imgListLeft {
      width: 345px;
      height: 234px;
      border-radius: 4px;
      background-size: 100% 100%;
      margin-top: 58px;
    }
    .home_Amazon_bitebi {
      width: 45px;
      height: 35px;
      margin: 167px 48px 0;
    }
    .home_Amazon_imgListRight {
      width: 604px;
      height: 358px;

      .home_Amazon_img02 {
        width: 296px;
        height: 174px;
        border-radius: 4px;
        margin-right: 6px;
        margin-bottom: 4px;
      }
    }
  }
}
.home_obtain {
  width: 100%;
}
.home-cooperation {
  width: 100%;
  height: 746px;
  background: rgba(245, 245, 245, 1);
  overflow: hidden;
  .home-cooperation-h2 {
    text-align: center;
    font-size: 30px;
    font-family: SourceHanSansCN-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    margin-top: 131px;
  }
  .home-cooperation-main {
    width: 1030px;
    margin: 38px auto 0;
    display: flex;
    justify-content: space-between;
    .home-cooperation-common {
      width: 440px;
      .home-cooperation-common-heightclass {
        width: 178px;
        height: 94px;
        text-align: center;
        line-height: 94px;
        background: rgba(230, 230, 230, 1);
        border-radius: 50%;
        margin: 0 auto 45px;
        font-size: 18px;
        font-family: SourceHanSansCN-Normal;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      .home-cooperation-common-p {
        width: 438px;
        height: 72px;
        font-size: 16px;
        font-family: SourceHanSansCN-Normal;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 28px;
      }
      .home-cooperation-common-imglist {
        display: flex;
        justify-content: space-between;
        margin-top: 35px;
        .home-cooperation-common-img {
          width: 214px;
          height: 140px;
        }
      }
    }
    .home-cooperation-jiahao {
      width: 46px;
      height: 46px;
      margin-top: 212px;
    }
  }
}
.home-collaborate {
  background: #fff;
  .home-collaborate-h2 {
    font-size: 30px;
    font-family: SourceHanSansCN-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    margin-top: 120px;
    text-align: center;
  }
  .home-collaborate-p1 {
    font-size: 18px;
    font-family: SourceHanSansCN-Normal;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    margin-top: 16px;
    text-align: center;
  }
  .home-collaborate-main {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 39px;
    margin-bottom: 120px;
    .home-collaborate-main-div {
      width: 388px;
      height: 474px;
      border: 1px solid rgba(204, 204, 204, 1);
      .home-collaborate-p02 {
        font-size: 18px;
        font-family: SourceHanSansCN-Normal;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        text-align: center;
        margin-top: 38px;
        .home-collaborate-span01 {
          font-size: 60px;
          font-family: SourceHanSerifCN-Bold;
          font-style: italic;
          color: rgba(85, 198, 194, 1);
          line-height: 41px;
          margin-right: 5px;
        }
      }
      .home-collaborate-p03 {
        width: 300px;
        height: 62px;
        font-size: 14px;
        font-family: SourceHanSansCN-Normal;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 24px;
        margin: 28px auto 0;
      }
      .home-collaboratecom {
        width: 180px;
        height: 110px;
        border-radius: 4px;
      }
      .home-collaborate-img01 {
        transform: rotate(-5deg);
        position: relative;
        top: 70px;
        left: 13px;
      }
      .home-collaborate-img02 {
        transform: rotate(8deg);
        position: relative;
        z-index: 9;
        top: 114px;
        left: 10px;
      }
      .home-collaborate-img03 {
        width: 312px;
        height: 150px;
        border-radius: 4px;
        margin: 79px 0 0 36px;
      }
      .home-collaborate-img04 {
        transform: rotate(4deg);
        position: relative;
        z-index: 9;
        top: 114px;
        left: 15px;
      }
      .home-collaborate-img05 {
        transform: rotate(10deg);
        position: relative;
        top: 80px;
        left: 8px;
      }
    }
  }
}
.home-choose {
  width: 100%;
  height: 728px;
  background-size: cover;
  background-position: center;
  overflow: hidden;
  .home-choose-title {
    font-size: 30px;
    font-family: SourceHanSansCN-Regular;
    font-weight: 400;
    color: rgba(230, 230, 230, 1);
    text-align: center;
    margin-top: 118px;
  }
  .home-choose-list {
    margin-top: 98px;
    display: flex;
    padding-left: 40px;
    .home-choose-item {
      margin: 0 40px;
      width: 200px;
      .home-choose-img {
        display: block;
        margin: 0 auto;
        width: 150px;
        height: 150px;
        margin-bottom: 38px;
      }
      .home-choose-p1 {
        width: 200px;
        text-align: center;
        font-size: 18px;
        font-family: SourceHanSansCN-Normal;
        font-weight: 400;
        color: rgba(230, 230, 230, 1);
        margin-bottom: 20px;
      }
      .home-choose-p2 {
        width: 200px;
        text-align: left;
        font-size: 13px;
        font-family: SourceHanSansCN-Normal;
        font-weight: 400;
        color: rgba(179, 179, 179, 1);
        line-height: 20px;
      }
    }
  }
}
.home-sheet {
  .home-sheet-h2 {
    text-align: center;
    margin-top: 120px;
    font-size: 30px;
    font-family: SourceHanSansCN-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
  .home-sheet-list {
    display: flex;
    flex-wrap: wrap;
    .home-sheet-item {
      width: 16.6%;
      margin-top: 50px;
      .home-sheet-a {
        .home-sheet-img {
          height: 100px;
          display: block;
          margin: 0 auto;
        }
      }
    }
  }
}
.home-streamer {
  width: 100%;
  height: 94px;
  text-align: center;
  line-height: 94px;
  margin-top: 120px;
  font-size: 20px;
  font-family: SourceHanSansCN-Normal;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  background: rgba(85, 198, 194, 1);
  .home-streamer-weight {
    font-size: 30px;
    font-family: SourceHanSansCN-Normal;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
