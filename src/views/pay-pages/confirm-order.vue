<template>
  <div class="confirm-order">
    <div class="confirm-order-main">
      <div class="confirm-order-title">
        <span></span>
        <span>确认订单</span>
      </div>
      <div class="confirm-order-message">
        购买课程信息
      </div>
      <div class="confirm-order-list">
        <div>
          <img :src="selectByCourseList.coursePicture" alt="" />
          <p>{{ selectByCourseList.courseName }}</p>
        </div>
        <p>￥{{ selectByCourseList.coursePrice }}</p>
      </div>
      <div class="confirm-order-button clearfix">
        <div>
          <span>合计：</span>
          <span>￥{{ selectByCourseList.coursePrice }}</span>
          <el-button type="primary" @click="handleNext">
            去支付
          </el-button>
          <el-button @click="handleGoBack">
            取 消
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('member', {
      selectByCourseList: state => state.selectByCourseList,
    }),
  },
  methods: {
    ...mapActions('member', ['getSelectByCourseId']),
    // 点击取消
    handleGoBack() {
      window.history.go(-1)
    },
    // 点击去支付
    handleNext() {
      this.$router.push({
        path: '/online-payment',
        query: {
          sign: this.$route.query.sign,
        },
      })
    },
  },
  created() {
    this.getSelectByCourseId(this.$route.query.sign)
  },
}
</script>

<style lang="less" scoped>
.confirm-order {
  background: #eee;
  overflow: hidden;
  .confirm-order-main {
    width: 1200px;
    padding: 0 60px;
    margin: 40px auto;
    min-height: calc(100vh - 348px);
    background: #fff;
    overflow: hidden;
    .confirm-order-title {
      margin: 30px 0 70px 8px;
      span:nth-child(1) {
        display: inline-block;
        width: 4px;
        height: 21px;
        background: rgba(88, 198, 189, 1);
        position: relative;
        top: 4px;
        left: -10px;
      }
      span:nth-child(2) {
        font-size: 18px;
        cursor: pointer;
        font-family: SourceHanSansCN-Medium;
        font-weight: 500;
        color: rgba(102, 102, 102, 1);
      }
    }
    .confirm-order-message {
      font-size: 16px;
      font-family: SourceHanSansCN-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    .confirm-order-list {
      width: 1036px;
      height: 164px;
      background: rgba(245, 245, 245, 1);
      margin: 20px auto;
      display: flex;
      justify-content: space-between;
      padding-top: 30px;
      div:nth-child(1) {
        margin-left: 30px;
        display: flex;
        img {
          width: 180px;
          height: 98px;
          border-radius: 4px;
        }
        p {
          font-size: 14px;
          font-family: SourceHanSansCN-Regular;
          font-weight: 400;
          color: rgba(88, 198, 189, 1);
          margin-left: 10px;
        }
      }
      p:nth-child(2) {
        font-size: 14px;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: rgba(230, 71, 71, 1);
        margin-right: 105px;
      }
    }
    .confirm-order-button {
      width: 1060px;
      div {
        float: right;
        span:nth-child(1) {
          font-size: 14px;
          font-family: SourceHanSansCN-Regular;
          font-weight: 400;
          color: rgba(128, 128, 128, 1);
          position: relative;
          top: 12px;
          cursor: pointer;
        }
        span:nth-child(2) {
          font-size: 24px;
          font-family: SourceHanSansCN-Regular;
          font-weight: 400;
          color: rgba(230, 71, 71, 1);
          position: relative;
          top: 12px;
          margin-right: 10px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
