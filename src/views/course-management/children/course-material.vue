<template>
  <div class="course-material-main">
    <material-teacher v-if="userProfile === 'teacher'" />
    <material-student v-else />
  </div>
</template>

<script>
import materialTeacher from './material/material-teacher'
import materialStudent from './material/material-student'
import { mapState } from 'vuex'

export default {
  components: {
    'material-teacher': materialTeacher,
    'material-student': materialStudent,
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
  },
}
</script>

<style lang="less" scoped>
.course-material-main {
  min-height: 722px;
  width: 994px;
  background: #fff;
  margin-left: 10px;
  float: left;
}
</style>
