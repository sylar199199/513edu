<template>
  <div class="job-wanted-cover">
    <div
      class="job-wanted-cover-banner"
      :style="{
        backgroundImage: `url('https://front.513online.top/front/app-download/banner_download%402x.png')`,
      }"
    ></div>
    <div class="job-wanted-cover-cross">
      <div class="container">
        <div class="job-wanted-cover-cross-main">
          <img
            src="https://front.513online.top/front/app-download/img_01%402x.png"
            alt=""
          />
          <div class="job-wanted-cover-cross-text">
            <p>跨校学堂，名师荟萃</p>
            <p>
              校企优秀师资合作共创优质课程，学生充分利用碎片时间完成在线学习，扩展课外知识面。
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="job-wanted-cover-Integrated">
      <div class="container">
        <div class="job-wanted-cover-Integrated-main">
          <div class="job-wanted-cover-Integrated-text">
            <p>理实一体，及时互动</p>
            <p>
              理论课程、实训一体化教学，学习更有趣有料，遇疑问、不解，可随时师生互动。
            </p>
          </div>
          <img
            src="https://front.513online.top/front/app-download/img_02%402x.png"
            alt=""
          />
        </div>
      </div>
    </div>
    <div class="job-wanted-cover-teaching">
      <div class="container">
        <div class="job-wanted-cover-teaching-main">
          <img
            src="https://front.513online.top/front/app-download/img_03%402x.png"
            alt=""
          />
          <div class="job-wanted-cover-teaching-text">
            <p>教学分析，高效提升</p>
            <p>
              教师可时时查看学生学习情况，学生可有针对改善学习行为，教学相互促进，增值增效。
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {}
</script>

<style lang="less" scoped>
.job-wanted-cover {
  width: 100%;
  min-height: calc(100% - 348px);
  background: #fff;
  overflow: hidden;
  position: relative;
  .job-wanted-cover-banner {
    width: 100%;
    height: 560px;
    background-size: cover;
    background-position: center;
  }
  .job-wanted-cover-cross {
    padding: 120px 0;
    .job-wanted-cover-cross-main {
      display: flex;
      .job-wanted-cover-cross-text {
        margin-left: 20px;
        padding-top: 143px;
        p:nth-child(1) {
          font-size: 40px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          margin-bottom: 40px;
        }
        p:nth-child(2) {
          width: 498px;
          font-size: 18px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: rgba(128, 128, 128, 1);
          line-height: 30px;
        }
      }
    }
  }
  .job-wanted-cover-Integrated {
    width: 100%;
    height: 793px;
    background: rgba(244, 244, 244, 1);
    padding-top: 85px;
    .job-wanted-cover-Integrated-main {
      display: flex;
      .job-wanted-cover-Integrated-text {
        padding-top: 143px;
        p:nth-child(1) {
          font-size: 40px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          margin-bottom: 40px;
        }
        p:nth-child(2) {
          width: 420px;
          font-size: 18px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: rgba(128, 128, 128, 1);
          line-height: 30px;
        }
      }
    }
  }
  .job-wanted-cover-teaching {
    padding: 120px 0;
    .job-wanted-cover-teaching-main {
      display: flex;
      .job-wanted-cover-teaching-text {
        margin-left: 20px;
        padding-top: 143px;
        p:nth-child(1) {
          font-size: 40px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          margin-bottom: 40px;
        }
        p:nth-child(2) {
          width: 498px;
          font-size: 18px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: rgba(128, 128, 128, 1);
          line-height: 30px;
        }
      }
    }
  }
}
</style>
