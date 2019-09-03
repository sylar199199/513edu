<template>
  <div>
    <ul class="home_handpick_list">
      <li
        class="home_handpick_item"
        v-for="item in allCourseRecommendedList"
        :key="item.courseIdSign"
      >
        <router-link
          :to="{
            name: 'collegeCourseDetail',
            params: {
              id: item.courseIdSign,
            },
          }"
          class="home_handpick_a"
        >
          <img :src="item.coursePicture" class="home_handpick_img" alt="" />
          <p class="home_handpick_p1">
            {{ item.courseName }}
          </p>
        </router-link>
        <p class="home_handpick_p2">
          <span> {{ item.teacherName }} 【{{ item.schoolName }}】 </span>
          <span v-show="item.coursePrice !== '免费'">
            ￥{{ item.coursePrice }}
          </span>
          <span v-show="item.coursePrice === '免费'">
            {{ item.coursePrice }}
          </span>
        </p>
      </li>
    </ul>
    <!-- 分页器 -->
    <div class="news-business-page">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="recommendedTotal"
        :page-size="8"
        hide-on-single-page
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      pageNum: 1,
    }
  },
  computed: {
    ...mapState('class', {
      allCourseRecommendedList: state => state.allCourseRecommendedList,
      recommendedTotal: state => parseInt(state.recommendedTotal),
    }),
  },
  methods: {
    ...mapActions('class', ['getAllCourseRecommendedList']),
    handleSizeChange(val) {
      let numSizeObj = {
        courseIdSign: this.$route.query.sign,
        pageNum: this.pageNum,
        size: val,
      }
      this.getAllCourseRecommendedList(numSizeObj)
    },

    handleCurrentChange(val) {
      this.pageNum = val
      let numSizeObj = {
        courseType: '0',
        gradeThree: '0',
        page: val,
        size: 8,
        sort: '0',
      }
      this.getAllCourseRecommendedList(numSizeObj)
    },
  },
}
</script>

<style lang="less" scoped>
.home_handpick_list {
  margin-top: 42px;
  display: flex;
  padding: 0 7px;
  margin-bottom: 80px;
  flex-wrap: wrap;
  min-height: 604px;
  .home_handpick_item {
    width: 280px;
    height: 270px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(230, 230, 230, 1);
    margin-right: 13px;
    margin-bottom: 30px;
    border-radius: 8px 8px 0 0;

    .home_handpick_a {
      display: block;

      .home_handpick_img {
        width: 280px;
        height: 156px;
        border-radius: 4px;
      }
      .home_handpick_p1 {
        font-size: 16px;
        font-family: SourceHanSansCN-Normal;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        padding-left: 10px;
        margin-top: 16px;
        margin-bottom: 20px;
        width: 250px;
        height: 40px;
        overflow: hidden;
        line-height: 21px;
      }
    }
    .home_handpick_p2 {
      font-size: 12px;
      font-family: SourceHanSansCN-Normal;
      font-weight: 400;
      color: rgba(128, 128, 128, 1);
      padding-left: 10px;
      padding-right: 20px;
      margin-top: 7px;
      display: flex;
      justify-content: space-between;
      span:nth-child(2) {
        color: #f96666;
        cursor: pointer;
      }
      span:nth-child(3) {
        color: #33b16e;
      }
    }
  }
  .home_handpick_item:hover {
    box-shadow: 0px 6px 22px 0px rgba(0, 0, 0, 0.23);
  }
}
.news-business-page {
  margin-bottom: 50px;
  text-align: center;
}
</style>
