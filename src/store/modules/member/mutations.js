import * as types from './mutation-types'

export default {
  [types.SET_TEST](state, { user_test }) {
    state.user_test = user_test
  },

  // 二维码
  [types.GET_QR_IMAGE](state, { qrImage }) {
    state.qrImage = window.URL.createObjectURL(qrImage)
  },

  // 账户订单列表
  [types.GET_ORDER_LIST_DING_DAN](state, { orderList, orderTotal }) {
    state.orderList = orderList
    state.orderTotal = orderTotal
  },

  // 账户订单列表
  [types.GET_SELECT_EY_COURSE_ID](state, { selectByCourseList }) {
    state.selectByCourseList = selectByCourseList
  },

  // 账户订单列表
  [types.GET_ORDER_SUCCESS](state, { orderSuccessList }) {
    state.orderSuccessList = orderSuccessList
  },

  // 账户订单列表
  [types.GET_TO_ORDER_PAY](state, { toOrderPayList }) {
    state.toOrderPayList = toOrderPayList
  },

  // 查看用户是否已购买此课程
  [types.GET_FIND_STUDENT_ORDER_EXIST](state, { findStudentOrderExist }) {
    state.findStudentOrderExist = findStudentOrderExist
  },
}
