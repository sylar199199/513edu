<template>
  <div class="course-commerce">
    <h2 class="course-commerce-h2">
      方案概述
    </h2>
    <div class="course-commerce-txt">
      本方案旨在通过和高校建立长期合作关系，为高校提供跨境电商学科建设整体教学解决方案；让学生在在校期间接触
      跨境电商交易链路及模拟实训演练，为就业做好准备；同时通过授课和实践方式，孵化高校跨境电商培训师。
    </div>
    <ul class="course-commerce-list">
      <li
        class="course-commerce-item"
        v-for="item in course_commerce"
        :key="item.commerceId"
      >
        <a href="javascript:" class="course-commerce-href">
          <img class="course-commerce-img" :src="item.commerceImg" alt="" />
          <p class="course-commerce-bottom">
            <span class="course-commerce-num">{{ item.commerceNum }}</span>
            <span class="course-commerce-student">{{ item.commerceText }}</span>
          </p>
        </a>
      </li>
    </ul>
    <h2 class="course-commerce-waiting">
      跨境电商实训平台等你来战
    </h2>
    <div class="course-commerce-main">
      <div class="course-commerce-main-left">
        <div class="course-commerce-main-text">
          参与学习的学生可以直接按照所学操作流程在仿真实训平台上体验跨境电商操作流程，为今后的工作积累经验。
        </div>
        <a
          href="http://amazon.513online.top/login"
          target="_blank"
          class="course-commerce-main-btn"
        >
          进入亚马逊模拟入口
        </a>
      </div>
      <img
        class="course-commerce-main-img"
        :src="$imgUrl + '/courese/1011%402x.png'"
        alt=""
      />
    </div>
  </div>
</template>

<script>
import course_commerce from '@configs/course-commerce'
export default {
  data() {
    return {
      course_commerce,
    }
  },
}
</script>

<style lang="less" scoped>
.course-commerce-h2 {
  text-align: center;
  font-size: 24px;
  font-family: SourceHanSansCN-Regular;
  font-weight: 400;
  color: #333;
}
.course-commerce-txt {
  font-size: 18px;
  font-family: SourceHanSansCN-Regular;
  font-weight: 400;
  color: #666;
  line-height: 32px;
  text-indent: 2rem;
  margin-top: 48px;
}
.course-commerce-list {
  display: flex;
  margin-top: 46px;
  .course-commerce-item {
    border: 1px #eee solid;
    border-radius: 5px;
    width: 265px;
    margin-right: 20px;
    .course-commerce-href {
      display: block;
      .course-commerce-img {
        width: 265px;
        height: 180px;
      }
      .course-commerce-bottom {
        margin-top: 16px;
        margin-bottom: 18px;
        margin-left: 6px;
        .course-commerce-num {
          font-size: 28px;
          font-family: DIN-Medium;
          font-weight: 500;
          font-style: italic;
          color: #e6e6e6;
        }
        .course-commerce-student {
          font-size: 18px;
          font-family: SourceHanSansCN-Regular;
          font-weight: 400;
          color: #666;
          margin-left: 12px;
        }
      }
    }
  }
  .course-commerce-item:nth-child(4n + 4) {
    margin-right: 0;
  }
}
.course-commerce-waiting {
  text-align: center;
  font-size: 24px;
  font-family: SourceHanSansCN-Regular;
  font-weight: 400;
  color: #333;
  margin-top: 70px;
}
.course-commerce-main {
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
  .course-commerce-main-left {
    width: 480px;
    .course-commerce-main-text {
      font-size: 18px;
      font-family: SourceHanSansCN-Regular;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 28px;
      text-indent: 2rem;
      margin-top: 52px;
    }
    .course-commerce-main-btn {
      display: block;
      width: 172px;
      height: 45px;
      background: rgba(88, 198, 189, 1);
      border-radius: 2px;
      margin-left: 152px;
      margin-top: 55px;
      font-size: 16px;
      font-family: SourceHanSansCN-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 45px;
      text-align: center;
    }
  }
  .course-commerce-main-img {
    width: 624px;
    height: 301px;
    border-radius: 4px;
  }
}
</style>
