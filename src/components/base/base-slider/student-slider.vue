<template>
  <div class="studer-slider">
    <el-row class="tac">
      <el-col :span="12">
        <student-head />
        <el-menu
          default-active="active"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <router-link
            to="/home/learning/curriculum"
            class="studer-slider-a"
            active-class="active"
          >
            <el-menu-item index="1">
              <img
                src="../../../assets/icon/leftnav_icon_study_default@2x.png"
                alt=""
              />
              <span slot="title">我的学习</span>
            </el-menu-item>
          </router-link>
          <router-link
            to="/home/learning/account"
            class="studer-slider-a"
            active-class="active"
          >
            <el-menu-item index="2">
              <img
                src="../../../assets/icon/leftnav_icon_account_default@2x.png"
                alt=""
              />
              <span slot="title">我的账户</span>
            </el-menu-item>
          </router-link>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import StudentHead from './student-head'
export default {
  name: 'student-slider',
  components: {
    'student-head': StudentHead,
  },
  computed: {
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
