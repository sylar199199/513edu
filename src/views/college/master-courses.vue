<template>
  <div>
    <div class="mask-layer"></div>
    <div
      class="master-courses-main"
      :style="{
        backgroundImage: `url(${
          schoolimages ? schoolimages.backgroundImage : defaultImage
        })`,
      }"
    >
      <div class="master-courses">
        <div class="container">
          <el-row :gutter="20">
            <el-col
              class="course"
              :span="6"
              v-for="(item, key) in homeSchoolList"
              :key="key"
            >
              <c-course-item :icons="icons" :course="item" />
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CCourseItem from '@components/common/c-course-item'
import iconTeacher from '@assets/icon/teacher_icon@2x.png'
import iconHour from '@assets/icon/hour_icon@2x.png'
import iconCredit from '@assets/icon/credit_icon@2x.png'
import { master_course } from '@configs/course-item.js'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'master-courses',
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
      master_course,
      backgroundPicture: '',
      defaultImage: this.$imgUrl + '/college/sssss.png',
    }
  },
  computed: {
    ...mapState('login', {
      homeSchoolList: state => state.homeSchoolList || {},
      userInfo: state => state.userInfo || {},
      schoolimages: state => state.schoolimages,
    }),
  },
  methods: {
    ...mapActions('login', ['getSchoolList']),
  },
  created() {
    let sign = this.$route.query.sign
    localStorage.setItem('sign', sign)
    this.getSchoolList(sign)
  },
}
</script>

<style lang="less" scoped>
.master-courses-main {
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 142px);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  .master-courses {
    width: 100%;
    height: 100%;

    padding: 20px 0 54px;

    .container {
      padding: 0 10px;
      .course {
        margin-top: 38px;
      }
    }
    .abc {
      color: red;
    }
  }
}
.mask-layer {
  min-height: calc(100vh - 142px);
  background: #000;
  position: absolute;
  top: 88px;
  left: 0;
  right: 0;
  bottom: 54px;
  opacity: 0.3;
}
</style>
