<template>
  <div class="home_handpick">
    <h2 class="home_handpick_h2">
      精选跨境电商课程
    </h2>
    <ul class="home_handpick_list">
      <li
        class="home_handpick_item"
        v-for="item in recommendedList"
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
    <router-link to="/class" class="home_handpick_more">
      更多
    </router-link>
  </div>
</template>

<script>
import handpick_list from '@configs/handpick-list'
import { mapActions, mapState } from 'vuex'
export default {
  data() {
    return {
      handpick_list,
    }
  },
  computed: {
    ...mapState('newList', {
      recommendedList: state => state.recommendedList,
    }),
  },
  methods: {
    ...mapActions('newList', ['getCourseRecommended']),
  },
  created() {
    this.getCourseRecommended()
  },
}
</script>

<style lang="less" scoped>
.home_handpick {
  .home_handpick_h2 {
    font-size: 30px;
    font-family: SourceHanSansCN-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    margin-top: 120px;
    text-align: center;
  }

  .home_handpick_list {
    margin-top: 42px;
    display: flex;
    padding: 0 7px;
    flex-wrap: wrap;

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
  .home_handpick_more {
    display: block;
    width: 96px;
    height: 40px;
    border: 1px solid rgba(204, 204, 204, 1);
    border-radius: 2px;
    margin: 0 auto;
    font-size: 14px;
    font-family: SourceHanSansCN-Normal;
    font-weight: 400;
    color: rgba(128, 128, 128, 1);
    line-height: 41px;
    text-align: center;
    margin-top: 40px;
    margin-bottom: 120px;
  }
}
</style>
