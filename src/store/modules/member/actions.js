import * as types from './mutation-types'
import { $message } from '@/element'

export default {
  // 获取二维码
  async getQrImage({ commit }) {
    const res = await this.$ajax.getBlob(this.$apis.getQrImage, true, {
      throttle: 'qrImage',
    })
    if (res.ok) {
      commit({
        type: types.GET_QR_IMAGE,
        qrImage: res.data,
      })
    }
  },

  // 账户订单列表
  async getOrderList({ commit }, orderListReqObj) {
    const res = await this.$ajax.post(this.$apis.getOrderList, {
      endTime: orderListReqObj.endTime,
      orderType: orderListReqObj.orderType || 0,
      page: orderListReqObj.page,
      payType: orderListReqObj.payType || 0,
      size: orderListReqObj.size,
      startTime: orderListReqObj.startTime,
      title: orderListReqObj.title,
    })
    if (res.ok) {
      commit({
        type: types.GET_ORDER_LIST_DING_DAN,
        orderList: res.data.list,
        orderTotal: res.data.total,
      })
    }
  },

  // 订单课程详情展示
  async getSelectByCourseId({ commit }, sign) {
    const res = await this.$ajax.post(this.$apis.getSelectByCourseId, {
      sign: sign,
    })
    if (res.ok) {
      commit({
        type: types.GET_SELECT_EY_COURSE_ID,
        selectByCourseList: res.data,
      })
    }
  },

  // 账户订单列表
  async getOrderSuccess({ commit }, orderNo) {
    const res = await this.$ajax.post(this.$apis.getOrderSuccess, {
      orderNo: orderNo,
    })
    if (res.ok) {
      commit({
        type: types.GET_ORDER_SUCCESS,
        orderSuccessList: res.data,
      })
    }
  },

  // 订单支付
  async getToOrderPay({ commit }, sign) {
    const res = await this.$ajax.post(this.$apis.getToOrderPay, {
      sign: sign,
    })
    if (res.ok) {
      commit({
        type: types.GET_TO_ORDER_PAY,
        toOrderPayList: res.data,
      })
    }
  },

  // 删除订单
  async getDeleteOrder({ commit }, sign) {
    const res = await this.$ajax.post(this.$apis.getDeleteOrder, {
      sign: sign,
    })
    if (res.ok) {
      if (res.ok) {
        $message.success('删除成功')
      } else {
        $message.error('删除失败')
      }
    }
  },

  // 查看用户是否已购买此课程
  async getFindStudentOrderExist({ commit }, sign) {
    const res = await this.$ajax.post(this.$apis.getFindStudentOrderExist, {
      courseId: sign,
    })
    if (res.ok) {
      commit({
        type: types.GET_FIND_STUDENT_ORDER_EXIST,
        findStudentOrderExist: res.data,
      })
    }
  },
}
