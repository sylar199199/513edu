<template>
  <div class="index">
    <!-- 1 -->
    <div
      class="index_background"
      :style="{ backgroundImage: `url(${indexBackground})` }"
    >
      <div class="introduce">
        <h1>2019年秋季学期选修课</h1>
        <div class="div">
          <ul>
            <li>
              <span>
                本校通过与国内名校合作，共建优质合作课程，作为课程资源补充供学生选修
              </span>
            </li>
            <li>
              <span>
                同学们完成选课后，通过513平台在线学习，成绩合格后可获得本校规定学分
              </span>
            </li>
            <li>
              <span>
                本校委托513在线教育平台提供运行服务及技术支持，如有疑问可
                <span class="We">
                  【联系我们】
                </span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 2 -->
    <el-row class="Preview">
      <div class="PreviewOne">
        <div class="PreviewOnes">
          <el-col :span="8" :lg="8">
            <img
              :src="$imgUrl + '/college/serial%20number_0%402x.png'"
              alt=""
            />
          </el-col>
          <el-col :span="16" :lg="16">
            <h1>预览选修课</h1>
          </el-col>
        </div>
        <el-col :span="24" :lg="24">
          <p>
            以下为跨校共建合作课程，作为本校选修课的补充，
          </p>
          <p>
            校内学生可以先预览以下合作课程以做好选课准备。
          </p>
        </el-col>
      </div>
    </el-row>
    <!-- 3 -->
    <div class="container">
      <el-row :gutter="20">
        <el-col
          class="course"
          :span="6"
          v-for="(item, key) in schoolTakeList"
          :key="key"
        >
          <c-course-item :icons="icons" :course="item" />
        </el-col>
      </el-row>
    </div>
    <!-- 4 -->
    <el-row
      class="educational-administration"
      :style="{ backgroundImage: `url(${educationalAdministration})` }"
    >
      <div class="educational-PreviewOne">
        <div class="educational-PreviewOnes">
          <el-col :span="8" :lg="8">
            <img
              :src="$imgUrl + '/college/serial%20number_2%402x.png'"
              alt=""
            />
          </el-col>
          <el-col :span="16" :lg="16">
            <h1>教务系统选课</h1>
          </el-col>
        </div>
        <el-col :span="24" :lg="24">
          <p>
            了解了可选课程后，根据学校规定的选修时间准时,
          </p>
          <p>
            到学校校务系统完成选课，预祝您成功选课.
          </p>
        </el-col>
      </div>
    </el-row>
    <!-- 5 -->
    <el-row class="login-learning">
      <div class="login-PreviewOne">
        <div class="login-PreviewOnes">
          <el-col :span="8" :lg="8">
            <img
              :src="$imgUrl + '/college/serial%20number_3%402x.png'"
              alt=""
            />
          </el-col>
          <el-col :span="16" :lg="16">
            <h1>
              登录本网校学习
            </h1>
          </el-col>
        </div>
        <el-col :span="24" :lg="24">
          <p>
            选课结束后，等待老师将选课信息同步到本网校平台，同步完成后，您可以登录
          </p>
          <p>
            本网校系统或下载安装513教育APP开始学习（需先完成注册并绑定学生身份信息）。
          </p>
        </el-col>
      </div>
    </el-row>
    <!-- 6 -->
    <el-row class="qrCode">
      <div class="qrCode-small">
        <div class="qrCode-small-left">
          <img
            class="qrCode-small-img"
            :src="
              $imgUrl +
                '/college/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20190710155620.png'
            "
            alt=""
          />
          <p>
            扫码安装513教育APP
          </p>
        </div>
        <div class="qrCode-small-right">
          <button type="success">
            App Store
          </button>
          <button type="success">
            Android
          </button>
        </div>
      </div>
    </el-row>
  </div>
</template>
<script>
import CCourseItem from '@components/common/c-course-item'
import { optional_course } from '@configs/course-item'
import iconTeacher from '@assets/icon/teacher_icon@2x.png'
import iconHour from '@assets/icon/hour_icon@2x.png'
import iconCredit from '@assets/icon/credit_icon@2x.png'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'optional-course',
  components: {
    'c-course-item': CCourseItem,
  },
  data() {
    return {
      icons: {
        iconTeacher,
        iconHour,
        iconCredit,
      },
      optional_course,
      judge: '',
      indexBackground: this.$imgUrl + '/college/ryh-1%20%281%29.png',
      educationalAdministration: this.$imgUrl + '/college/bg_img02%402x.png',
    }
  },
  computed: {
    ...mapState('login', {
      schoolTakeList: state => state.schoolTakeList,
      userInfo: state => state.userInfo,
    }),
  },
  methods: {
    ...mapActions('login', ['getSchoolTakeList']),
  },
  created() {
    this.getSchoolTakeList(this.$route.query.sign)
    this.judge = this.$route.query.judge
  },
}
</script>
<style lang="less" scoped>
.clearfix {
  .clearfix:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: ' ';
    clear: both;
    height: 0;
  }
  .clearfix {
    *zoom: 1;
  }
}
.index_background {
  font-family: 'SourceHanSansCN-Normal';
  height: 600px;
  width: 100%;
  overflow: hidden;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  .introduce {
    width: 50%;
    height: 200px;
    margin: 200px auto;
    font-family: 'SourceHanSansCN-Medium';
    li {
      color: #eee;
    }
    h1 {
      color: #ffffff;
      font-size: 42px;
      text-align: center;
      height: 70px;
      line-height: 70px;
    }
  }
  ul {
    li {
      list-style-type: circle;
      list-style: disc;
      color: @maincolor;
      font-size: 18px;
      font-weight: 400;
      span {
        font-size: 18px;
        color: rgba(255, 255, 255, 1);
        line-height: 41px;
        span {
          color: @maincolor;
          font-size: 26px;
        }
        .We {
          color: @maincolor;
          font-size: 18px;
        }
      }
    }
  }
  .div {
    margin: auto;
    width: 640px;
  }
}
.Preview {
  height: 292px;
  .PreviewOne {
    width: 610px;
    height: 200px;
    margin: 99px auto;
    .PreviewOnes {
      width: 280px;
      height: 100px;
      margin: auto;
      img {
        width: 80px;
        height: 80px;
      }
      h1 {
        font-size: 30px;
        color: #333333;
        font-weight: 500;
        line-height: 80px;
      }
    }
    p {
      font-size: 16px;
      font-weight: 400;
      line-height: 30px;
      color: #666666;
      text-align: center;
    }
  }
}
.show {
  width: 1200px;
  margin: 0 auto;
}
.educational-administration {
  height: 490px;
  width: 100%;
  margin-top: 50px;
  background-size: cover;
  background-position: center;
  .educational-PreviewOne {
    width: 610px;
    height: 200px;
    margin: 165px auto;
    .educational-PreviewOnes {
      width: 280px;
      height: 100px;
      margin: auto;
      img {
        width: 80px;
        height: 80px;
      }
      h1 {
        font-size: 30px;
        color: #333333;
        font-weight: 500;
        line-height: 80px;
      }
    }
    p {
      font-size: 16px;
      font-weight: 400;
      line-height: 30px;
      color: #666666;
      text-align: center;
    }
  }
}
.login-learning {
  height: 291px;
  width: 100%;
  .login-PreviewOne {
    width: 610px;
    height: 200px;
    margin: 99px auto;
    .login-PreviewOnes {
      width: 320px;
      height: 100px;
      margin: auto;
      img {
        width: 80px;
        height: 80px;
      }
      h1 {
        font-size: 30px;
        color: #333333;
        font-weight: 500;
        line-height: 80px;
      }
    }
    p {
      font-size: 16px;
      font-weight: 400;
      line-height: 30px;
      color: #666666;
      text-align: center;
    }
  }
}
.qrCode {
  height: 230px;
  width: 100%;
  .qrCode-small {
    height: 155px;
    width: 320px;
    margin: 0px auto;
    .qrCode-small-left {
      float: left;
      width: 140px;
      height: 155px;
      .qrCode-small-img {
        width: 134px;
        height: 133px;
      }
      p {
        font-size: 14px;
        font-weight: 400;
        color: #666666;
        line-height: 15px;
      }
    }
    .qrCode-small-right {
      float: right;
      width: 140px;
      height: 155px;
      button {
        margin-top: 20px;
        width: 120px;
        height: 48px;
        background: rgba(245, 245, 245, 1);
        border: 1px solid rgba(204, 204, 204, 1);
        border-radius: 4px;
      }
    }
  }
}
.container {
  padding: 0 10px;
  .course {
    margin-top: 38px;
  }
}
</style>
