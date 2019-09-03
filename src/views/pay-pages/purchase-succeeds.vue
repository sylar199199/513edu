<template>
  <div class="purchase-succeeds">
    <div class="purchase-succeeds-main">
      <div class="purchase-succeeds-title">
        <span></span>
        <span>购买成功</span>
      </div>
      <div class="purchase-succeeds-wrapper">
        <p>
          订单编号：
          <span>
            {{ orderSuccessList.orderNo }}
          </span>
        </p>
        <p>
          课程价格：
          <span>￥{{ orderSuccessList.orderPrice }}</span>
        </p>
        <p>
          课程名称：
          <span>{{ orderSuccessList.orderTitle }}</span>
        </p>
        <p>
          应付金额：
          <span>￥{{ orderSuccessList.payPrice }}</span>
        </p>
        <p>
          支付方式：
          <span>{{ orderSuccessList.payPlatform }}</span>
        </p>
        <p>
          购买时间：
          <span>{{ orderSuccessList.payTime }}</span>
        </p>
      </div>
      <div class="purchase-succeeds-button">
        <el-button type="primary" @click="handleGoBack">
          返 回
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('member', {
      orderSuccessList: state => state.orderSuccessList,
    }),
  },
  methods: {
    ...mapActions('member', ['getOrderSuccess']),
    handleGoBack() {
      this.$router.push('/home/learning/curriculum')
    },
  },
  created() {
    this.getOrderSuccess(this.$route.query.orderNum)
  },
}
</script>

<style lang="less" scoped>
.purchase-succeeds {
  background: #eee;
  overflow: hidden;
  .purchase-succeeds-main {
    width: 1200px;
    padding: 0 60px;
    margin: 40px auto;
    min-height: calc(100vh - 348px);
    background: #fff;
    overflow: hidden;
    .purchase-succeeds-title {
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
    .purchase-succeeds-wrapper {
      p {
        margin-bottom: 30px;
        font-size: 16px;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: #999999;
        span {
          color: #333;
        }
      }
    }
    .purchase-succeeds-button {
      margin-top: 50px;
      margin-bottom: 50px;
    }
  }
}
</style>
