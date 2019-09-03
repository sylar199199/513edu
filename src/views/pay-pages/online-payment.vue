<template>
  <div class="confirm-order">
    <div class="confirm-order-main">
      <div class="confirm-order-title">
        <span></span>
        <span>在线支付</span>
      </div>
      <div class="confirm-order-message">
        <span></span>
        <span @click="returnOrder">返回我的订单</span>
      </div>
      <div class="confirm-order-list">
        <div>
          <img :src="selectByCourseList.coursePicture" alt="" />
          <p>{{ selectByCourseList.courseName }}</p>
        </div>
        <p>￥{{ selectByCourseList.coursePrice }}</p>
      </div>
      <div class="confirm-order-payment">
        支付方式
      </div>
      <div class="confirm-order-border">
        <div class="confirm-order-border-zhifubao">
          <img :src="$imgUrl + '/pay/alipay%402x.png'" alt="" />
          <img :src="$imgUrl + '/pay/check%402x.png'" alt="" />
        </div>
      </div>
      <div class="confirm-order-reminder">
        <p>
          <span>!</span>
          <span
            >请在24小时内支付完成，如未完成此订单将自动关闭。需要重新购买！</span
          >
        </p>
        <p>
          <span>应付金额：</span>
          <span>￥{{ selectByCourseList.coursePrice }}</span>
        </p>
      </div>
      <div class="confirm-order-button clearfix">
        <div>
          <el-button type="primary" @click="handleNext">
            立即支付
          </el-button>
          <!-- <el-button type="primary">
            <a href="http://192.168.1.25:9003/pay/paySuccess" target="_blank"
              >立即支付</a
            >
          </el-button> -->
        </div>
      </div>
      <div v-html="toOrderPayList"></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import axios from 'axios'
export default {
  data() {
    return {
      url: process.env.VUE_APP_BASE_URL + '/order/toOrderPay',
    }
  },
  computed: {
    ...mapState('member', {
      selectByCourseList: state => state.selectByCourseList,
      toOrderPayList: state => state.toOrderPayList,
    }),
  },
  methods: {
    ...mapActions('member', [
      'getSelectByCourseId',
      'getPaySuccess',
      'getToOrderPay',
    ]),
    // 点击返回我的订单
    returnOrder() {
      window.history.go(-1)
    },
    // 点击立即支付
    handleNext() {
      // this.getToOrderPay(this.$route.query.sign)
      axios
        .post(this.url, {
          sign: this.$route.query.sign,
        })
        .then(res => {
          if (res.status === 200) {
            this.$router.push({
              path: '/apply-text',
              query: {
                htmls: res.data,
              },
            })
            let htmls = res.data
            const div = document.createElement('div')
            div.innerHTML = htmls
            document.body.appendChild(div)
            document.forms[0].submit()
          }
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
      margin: 30px 0 40px 8px;
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
      display: flex;
      justify-content: space-between;
      width: 1080px;
      margin: 0 auto;
      span {
        font-size: 16px;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        cursor: pointer;
      }
    }
    .confirm-order-list {
      width: 1080px;
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
    .confirm-order-payment {
      font-size: 16px;
      font-family: SourceHanSansCN-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    .confirm-order-button {
      width: 1080px;
      margin: 30px 0 50px;
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
    .confirm-order-border {
      margin: 20px 0 30px 0;
      .confirm-order-border-zhifubao {
        width: 507px;
        height: 104px;
        background: rgba(245, 245, 245, 1);
        border-radius: 8px;
        border: 2px solid rgba(230, 71, 71, 1);
        position: relative;
        img:nth-child(1) {
          width: 148px;
          height: 50px;
          margin: 26px 0 0 180px;
        }
        img:nth-child(2) {
          position: absolute;
          bottom: -1px;
          right: -1px;
        }
      }
    }
    .confirm-order-reminder {
      display: flex;
      justify-content: space-between;
      p:nth-child(1) {
        span:nth-child(1) {
          display: inline-block;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #ff9900;
          line-height: 16px;
          text-align: center;
          color: #fff;
          margin-right: 10px;
        }
        span:nth-child(2) {
          font-size: 14px;
          font-family: SourceHanSansCN-Regular;
          font-weight: 400;
          color: rgba(255, 153, 0, 1);
        }
      }
      p:nth-child(2) {
        span:nth-child(1) {
          font-size: 14px;
          font-family: SourceHanSansCN-Regular;
          font-weight: 400;
          color: rgba(128, 128, 128, 1);
        }
        span:nth-child(2) {
          font-size: 24px;
          font-family: SourceHanSansCN-Regular;
          font-weight: 400;
          color: rgba(230, 71, 71, 1);
        }
      }
    }
  }
}
</style>
