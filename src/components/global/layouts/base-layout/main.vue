<template>
  <div class="base-layout">
    <c-header>
      <video-header v-if="$route.name === 'collegeCourseVideo'" />
      <college-header v-else-if="is_college_mode" />
      <default-header v-else :nav-list="navList" />
    </c-header>
    <router-view :class="className" />
    <c-footer v-if="$route.name !== 'collegeCourseVideo'">
      <college-footer v-if="is_college_mode" />
      <default-footer v-else :nav-list="navList" />
    </c-footer>
    <!-- 登陆、注册、认证、找回密码相关模态框组件 -->
    <c-sign-related />
  </div>
</template>
<script>
import {
  DefaultHeader,
  CollegeHeader,
  VideoHeader,
} from '@components/base/base-header'
import { DefaultFooter, CollegeFooter } from '@components/base/base-footer'
import SignRelated from '@components/sign-related'
import { mapMutations, mapState } from 'vuex'
import { SET_IS_COLLEGE_MODE } from '@store/modules/app/mutation-types'

import Home from '@views/home'
export default {
  name: 'base-layout',
  data() {
    return {
      navList: [
        { navId: 1, name: '首页', href: '/home' },
        { navId: 2, name: '课程', href: '/class' },
        { navId: 3, name: '会员', href: '/member' },
        { navId: 4, name: '求职', href: '/job-wanted' },
        { navId: 5, name: 'APP下载', href: '/app-download' },
      ],
    }
  },
  components: {
    'college-header': CollegeHeader,
    'default-header': DefaultHeader,
    'video-header': VideoHeader,
    'college-footer': CollegeFooter,
    'default-footer': DefaultFooter,
    'c-sign-related': SignRelated,
  },
  computed: {
    ...mapState('app', {
      is_college_mode: state => state.is_college_mode,
    }),
    query() {
      return this.$route
    },
    className() {
      const { path, name } = this.query
      if (name === 'collegeCourseVideo') {
        return 'video-page'
      } else if (path.indexOf('/college') === 0) {
        return 'college-page'
      } else {
        return 'default-page'
      }
    },
  },
  watch: {
    query: {
      handler(cur) {
        this[SET_IS_COLLEGE_MODE](cur)
      },
      immediate: true,
    },
  },
  methods: {
    ...mapMutations('app', [SET_IS_COLLEGE_MODE]),
  },
}
</script>
<style lang="less" scoped>
.base-layout {
  width: 100%;
  height: 100%;
}
.college-page {
  min-height: calc(100vh - 142px);
}
.default-page {
  min-height: calc(100vh - 348px);
}
.video-page {
  min-height: calc(100vh - 88px);
}
</style>
