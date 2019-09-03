<template>
  <div class="my-order">
    <div class="my-order-title">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="名称:">
          <el-input
            v-model="formInline.title"
            placeholder="课程名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="类型：">
          <el-select v-model="formInline.type" placeholder="购买课程">
            <el-option
              v-for="item in optionsOne"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="方式：">
          <el-select v-model="formInline.way" placeholder="支付方式">
            <el-option
              v-for="item in optionsTwo"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间：">
          <el-col :span="11">
            <el-date-picker
              type="date"
              v-model="formInline.date1"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">
            -
          </el-col>
          <el-col :span="11">
            <el-date-picker
              type="date"
              v-model="formInline.date2"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSeach">
            搜索
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="my-order-table">
      <el-table :data="orderList" border style="width: 100%" min-height="350">
        <el-table-column
          fixed
          prop="orderNum"
          label="订单编号"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="title" label="名称" width="150" align="center">
        </el-table-column>
        <el-table-column prop="type" label="类型" width="100" align="center">
        </el-table-column>
        <el-table-column prop="price" label="金额" width="90" align="center">
          <template slot-scope="scope">
            <div class="el-table-money">￥{{ scope.row.price }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100" align="center">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="payTime"
          label="支付时间"
          width="180"
          align="center"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.status === '已支付'">
              {{ scope.row.createTime }}
            </div>
            <div v-if="scope.row.status === '支付关闭'">
              <el-button type="info" @click="handleDelete(scope.row.sign)">
                删除订单
              </el-button>
            </div>
            <div v-if="scope.row.status === '待付款'">
              <el-button type="primary" @click="handlePayNow(scope.row.sign)">
                立即支付
              </el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="payType" label="备注" width="100" align="center">
        </el-table-column>
      </el-table>
    </div>
    <div class="my-order-pagination">
      <el-pagination
        background
        layout="total,sizes,prev,pager,next,jumper"
        :total="orderTotal"
        :page-size="5"
        :page-sizes="[5, 10, 20]"
        :hide-on-single-page="true"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import axios from 'axios'
export default {
  data() {
    return {
      formInline: {
        title: '',
        way: '',
        type: '',
        date1: '',
        date2: '',
      },
      optionsOne: [
        {
          value: '1',
          label: '购买课程',
        },
        {
          value: '2',
          label: '会员',
        },
        {
          value: '3',
          label: '充值',
        },
      ],
      optionsTwo: [
        {
          value: '1',
          label: '支付宝',
        },
        {
          value: '2',
          label: '微信',
        },
      ],
      url: process.env.VUE_APP_BASE_URL + '/order/continuePay',
      pageNum: 1,
      size: 5,
    }
  },
  methods: {
    ...mapActions('member', [
      'getOrderList',
      'getContinuePay',
      'getDeleteOrder',
    ]),
    // 分页器
    handleSizeChange(val) {
      this.size = val
      let orderListReqObj = {
        endTime: '',
        orderType: '0',
        page: this.pageNum,
        payType: '0',
        size: this.size,
        startTime: '',
        title: '',
      }
      this.getOrderList(orderListReqObj)
    },

    handleCurrentChange(val) {
      this.pageNum = val
      let orderListReqObj = {
        endTime: '',
        orderType: '0',
        page: this.pageNum,
        payType: '0',
        size: this.size,
        startTime: '',
        title: '',
      }
      this.getOrderList(orderListReqObj)
    },
    // 点击搜索
    handleSeach() {
      let orderListReqObj = {
        endTime: this.formInline.date2,
        orderType: this.formInline.type,
        page: 1,
        payType: this.formInline.way,
        size: 5,
        startTime: this.formInline.date1,
        title: this.formInline.title,
      }
      this.getOrderList(orderListReqObj)
    },
    // 点击删除订单
    async handleDelete(sign) {
      await this.getDeleteOrder(sign)
      let orderListReqObj = {
        endTime: '',
        orderType: '0',
        page: 1,
        payType: '0',
        size: 5,
        startTime: '',
        title: '',
      }
      await this.getOrderList(orderListReqObj)
    },
    // 点击立即支付
    handlePayNow(sign) {
      axios
        .post(this.url, {
          sign: sign,
        })
        .then(res => {
          console.log(res.data)
          if (res.status === 200) {
            if (!res.data.code) {
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
            } else {
              this.$message.error(res.data.msg)
            }
          }
        })
    },
  },
  computed: {
    ...mapState('member', {
      orderTotal: state => parseInt(state.orderTotal),
      orderList: state => state.orderList,
    }),
  },
  created() {
    let orderListReqObj = {
      endTime: '',
      orderType: '0',
      page: this.pageNum,
      payType: '0',
      size: this.size,
      startTime: '',
      title: '',
    }
    this.getOrderList(orderListReqObj)
  },
}
</script>

<style lang="less" scoped>
.my-order {
  .my-order-title {
    margin-top: 30px;
    width: 100%;
    .demo-form-inline {
      display: flex;
      .el-form-item {
        display: flex;
        .el-form-item__label {
          width: 100px !important;
        }
      }
    }
  }
  .my-order-table {
    margin-top: 40px;
    .el-table-money {
      color: #f24f4f;
    }
  }
  .my-order-pagination {
    text-align: center;
    margin-top: 80px;
    margin-bottom: 20px;
  }
}
</style>
