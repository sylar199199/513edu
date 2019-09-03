<template>
  <div class="banner">
    <el-carousel indicator-position="outside" :interval="5000">
      <el-carousel-item v-for="item in allAdvertisingList" :key="item.id">
        <a :href="item.url" class="banner-router" v-if="item.courseId === ''">
          <img :src="item.advertImage" alt="" />
        </a>
        <router-link
          :to="{
            name: 'collegeCourseDetail',
            params: {
              id: item.courseId,
            },
          }"
          v-if="item.courseId !== ''"
          class="banner-router"
        >
          <img :src="item.advertImage" alt="" />
        </router-link>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState('message', {
      allAdvertisingList: state => state.allAdvertisingList,
    }),
  },
  methods: {
    ...mapActions('message', ['getAllAdvertisingList']),
  },
  created() {
    this.getAllAdvertisingList()
  },
}
</script>

<style lang="less" scoped>
.banner {
  .banner-router {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>
