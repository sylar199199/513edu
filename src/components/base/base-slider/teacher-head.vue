<template>
  <div>
    <div class="head">
      <img :src="userInfo.photo" alt="" />
    </div>
    <div class="name">
      {{ accountStudent.name }}
    </div>
    <div class="school">
      <router-link
        :to="{
          path: '/college/master-courses',
          query: { sign: userInfo.schoolId || 1 },
        }"
      >
        {{ accountStudent.schoolName }}
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('login', {
      accountStudent: state => state.accountStudent,
      userInfo: state => state.userInfo,
    }),
  },
  methods: {
    ...mapActions('login', ['getFindUserRoleInfo']),
  },
  created() {
    this.getFindUserRoleInfo()
  },
}
</script>

<style lang="less" scoped>
.head {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 20px auto 10px;
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
}
.name {
  font-size: 16px;
  font-family: SourceHanSansCN-Normal;
  font-weight: 400;
  color: #333;
  text-align: center;
}
.school {
  text-align: center;
  margin-bottom: 64px;
  margin-top: 10px;
  a {
    font-size: 14px;
    font-family: SourceHanSansCN-Regular;
    font-weight: 400;
    color: @maincolor;
  }
}
</style>
