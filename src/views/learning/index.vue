<template>
  <div class="center-slider">
    <div class="container">
      <div class="center-slider-bug">
        <teacher-slider
          class="student-slider"
          v-if="userProfile === 'teacher'"
        />
        <student-slider class="student-slider" v-else />
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import StudentSlider from '@components/base/base-slider/student-slider'
import TeacherSlider from '@components/base/base-slider/teacher-slider'

export default {
  name: 'homeLearning',
  data() {
    return {
      studentTeacher: true,
    }
  },
  computed: {
    ...mapState('login', {
      userInfo: state => state.userInfo,
    }),
    userProfile() {
      let teacherOrStudent = this.userInfo.roleStr.substr(7)
      return teacherOrStudent
    },
  },
  components: {
    'student-slider': StudentSlider,
    'teacher-slider': TeacherSlider,
  },
}
</script>

<style lang="less" scoped>
.center-slider {
  width: 100%;
  height: 100%;
  background: #eee;
  .center-slider-bug {
    overflow: hidden;
    padding-bottom: 10px;
    .student-slider {
      margin-top: 10px;
      width: 196px;
      float: left;
    }
  }
}
</style>
