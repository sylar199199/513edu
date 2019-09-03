<template>
  <div class="studer-slider">
    <div>
      <el-row class="tac">
        <el-col :span="12">
          <course-management-head />
          <el-menu
            default-active="active"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
          >
            <router-link
              :to="{
                path: '/course-management/course-bulletin',
                query: {
                  sign: sign,
                },
              }"
              class="studer-slider-a"
              active-class="active"
            >
              <el-menu-item index="1">
                <img
                  src="../../../assets/icon/leftnav_icon_notice_default@2x.png"
                  alt=""
                />
                <span slot="title">
                  课程公告
                </span>
              </el-menu-item>
            </router-link>
            <router-link
              :to="{
                path: '/course-management/course-material',
                query: {
                  sign: sign,
                },
              }"
              class="studer-slider-a"
              active-class="active"
            >
              <el-menu-item index="2">
                <img
                  src="../../../assets/icon/leftnav_icon_data_default@2x.png"
                  alt=""
                />
                <span slot="title">
                  课程资料
                </span>
              </el-menu-item>
            </router-link>
            <router-link
              :to="{
                path: '/course-management/unit-testing',
                query: {
                  sign: sign,
                },
              }"
              class="studer-slider-a"
              active-class="active"
            >
              <el-menu-item index="3">
                <img
                  src="../../../assets/icon/leftnav_icon_ test _default@2x.png"
                  alt=""
                />
                <span slot="title">
                  单元测试
                </span>
              </el-menu-item>
            </router-link>
            <router-link
              :to="{
                path: '/course-management/operational-analysis',
                query: {
                  sign: sign,
                },
              }"
              class="studer-slider-a"
              active-class="active"
              v-if="userProfile === 'teacher'"
            >
              <el-menu-item index="4">
                <img
                  src="../../../assets/icon/leftnav_icon_analyze_default@2x.png"
                  alt=""
                />
                <span slot="title">
                  运行分析
                </span>
              </el-menu-item>
            </router-link>
            <router-link
              :to="{
                path: '/course-management/score-management',
                query: {
                  sign: sign,
                },
              }"
              class="studer-slider-a"
              active-class="active"
              v-if="userProfile === 'teacher'"
            >
              <el-menu-item index="5">
                <img
                  src="../../../assets/icon/leftnav_icon_notice_default@2x (1).png"
                  alt=""
                />
                <span slot="title">
                  成绩管理
                </span>
              </el-menu-item>
            </router-link>
            <router-link
              :to="{
                path: '/course-management/trainees-management',
                query: {
                  sign: sign,
                },
              }"
              class="studer-slider-a"
              active-class="active"
              v-if="userProfile === 'teacher'"
            >
              <el-menu-item index="6">
                <img
                  src="../../../assets/icon/manage_icon_default @2x.png"
                  alt=""
                />
                <span slot="title">
                  学员管理
                </span>
              </el-menu-item>
            </router-link>
            <router-link
              :to="{
                path: '/course-management/study-analysis',
                query: {
                  sign: sign,
                },
              }"
              v-if="userProfile !== 'teacher'"
              class="studer-slider-a"
              active-class="active"
            >
              <el-menu-item index="5">
                <img
                  src="../../../assets/icon/leftnav_icon_analyze_default@2x.png"
                  alt=""
                />
                <span slot="title">
                  学习分析
                </span>
              </el-menu-item>
            </router-link>
          </el-menu>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import courseManagementHead from './course-management-head'
import { mapState } from 'vuex'

export default {
  name: 'course-management-slider',
  data() {
    return {
      sign: '',
    }
  },
  components: {
    'course-management-head': courseManagementHead,
  },
  computed: {
    ...mapState('login', {
      userInfo: state => state.userInfo,
    }),
    userProfile() {
      let teacherOrStudent = this.userInfo.roleStr
        ? this.userInfo.roleStr.substr(7)
        : ''
      return teacherOrStudent
    },
    active() {
      return this.$route.meta.tabNumber
    },
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
  },
  created() {
    this.sign = this.$route.query.sign
  },
}
</script>

<style lang="less" scoped>
.studer-slider {
  width: 196px;
  height: 722px;
  .el-col-12 {
    width: 196px;
    height: 722px;
    background: #fff;
    .is-active {
      color: #fff;
      background: @maincolor;
    }
    .studer-slider-a {
      display: block;
      width: 195px;
      height: 56px;

      img {
        width: 20px;
        height: 20px;
        display: inline-block;
        background-repeat: no-repeat;
        background-size: cover;
        margin-right: 8px;
      }

      .el-menu-item:hover,
      .el-menu-item:focus {
        outline: none;
        background-color: @maincolor;
        color: #fff;

        i {
          color: #fff;
        }
      }
    }
    .active {
      background: @maincolor !important;
      i {
        color: #fff;
      }
      span {
        color: #fff;
      }
    }
  }
}
</style>
