<template>
  <div class="college-header ">
    <div class="container">
      <el-col :span="8" :lg="8">
        <div class="logo">
          <router-link to="/home" class="logo-router">
            <img
              :src="schoolimages ? schoolimages.logo : ''"
              :alt="accountStudent.schoolName"
            />
          </router-link>
        </div>
      </el-col>
      <el-col :span="16" :lg="16">
        <div class="navigation">
          <ul>
            <el-col :span="4" :lg="4">
              <li>
                <router-link
                  :class="{ active: $route.name === 'collegeMasterCourses' }"
                  :to="{
                    path: '/college/master-courses',
                    query: { sign: sign },
                  }"
                >
                  课程
                </router-link>
              </li>
            </el-col>
            <el-col :span="4" :lg="4">
              <li>
                <router-link
                  :class="{ active: $route.name === 'collegeOptionalCourses' }"
                  :to="{
                    path: '/college/optional-courses',
                    query: { sign: sign, judge: 'working' },
                  }"
                >
                  合作课
                </router-link>
              </li>
            </el-col>
            <el-col :span="4" :lg="4">
              <li>
                <router-link to="#">
                  APP
                </router-link>
              </li>
            </el-col>
            <el-col :span="8" :lg="8">
              <DropDown />
            </el-col>
            <!-- <el-col :span="4" :lg="4">
              <li @click="switcher">
                <img
                  src="http://front.513online.top/front/nav_search%402x.png"
                  alt=""
                />
              </li>
            </el-col> -->
          </ul>
          <!-- <InputScole /> -->
        </div>
      </el-col>
    </div>
  </div>
</template>

<script>
import DropDown from '@components/other/drop-down'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'college-header',
  data() {
    return {
      isShow: true,
      sign: '',
    }
  },
  components: {
    DropDown,
  },
  computed: {
    ...mapState('login', {
      schoolimages: state => state.schoolimages,
      userInfo: state => state.userInfo,
      accountStudent: state => state.accountStudent,
    }),
  },
  methods: {
    ...mapActions('login', ['getSchoolList']),
    switcher() {
      this.isShow = false
    },
  },
  created() {
    this.sign = this.$route.query.sign || localStorage.getItem('sign')
    this.getSchoolList(this.sign)
  },
}
</script>

<style lang="less" scoped>
@publicColor: '#55c6c2';
.college-header {
  font-family: 'SourceHanSansCN-Normal';
  height: 88px;
  background-color: #464c5b;
  .logo {
    width: 400px;
    height: 72px;
    min-width: 252px;
    background-size: cover;
    margin-top: 8px;
    position: relative;
    .logo-router {
      display: block;
      width: 100%;
      height: 100%;
      img {
        max-width: 100%;
        max-height: 100%;
        position: absolute;
        transform: translate(0, -50%);
        top: 50%;
        color: #fff;
        font-size: 16px;
      }
    }
  }
  .navigation {
    height: 72px;
    float: right;
    width: 400px;
    margin-top: 8px;
    ul {
      height: 100%;
      width: 100%;
      .el-col-lg-4 {
        width: 65px;
        margin-right: 26px;
        li {
          height: 72px;
          position: relative;
          a {
            font-size: 18px;
            line-height: 72px;
            float: left;
            color: #e6e6e6;
            font-weight: 400;
          }
          .active {
            color: @maincolor;
          }
          span {
            float: left;
            height: 20px;
            width: 2px;
            margin-top: 25px;
            background-color: #fff;
          }
          img {
            width: 24px;
            height: 24px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
      .el-col-lg-8 {
        width: 119px;
      }
      .login-i {
        height: 72px;
        float: left;
        position: relative;
        i {
          font-size: 18px;
          color: #e6e6e6;
          line-height: 72px;
          float: left;
          font-weight: 400;
          cursor: pointer;
        }
        span {
          float: left;
          height: 20px;
          width: 2px;
          margin-left: 10px;
          margin-right: 10px;
          margin-top: 28px;
          background-color: #fff;
        }
      }
    }
  }
}
</style>
