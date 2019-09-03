import * as types from './mutation-types'

export default {
  [types.SET_TEST](state, { user_test }) {
    state.user_test = user_test
  },

  // 系统通知
  [types.SET_FINDBULLETIN_PAGE](state, { newMessageTotal, newMessageList }) {
    ;(state.messageList = newMessageList),
      (state.messageTotal = newMessageTotal)
  },

  // 校园通知
  [types.SET_ALL_SYSTEM_MSG_LIST](
    state,
    { allSystemMsgList, allSystemMsgTotal },
  ) {
    state.allSystemMsgList = allSystemMsgList
    state.allSystemMsgTotal = allSystemMsgTotal
  },

  // 课程通知
  [types.SET_ALL_COURSE_MSG_LIST](
    state,
    { allCourseMsgList, allCourseMsgTotal },
  ) {
    state.allCourseMsgList = allCourseMsgList
    state.allCourseMsgTotal = allCourseMsgTotal
  },

  // 学习中心课程公告
  [types.SET_COURSE_MSG_LIST_GONG_GAO](
    state,
    { courseMsgList, courseMsgTotal },
  ) {
    state.courseMsgList = courseMsgList
    state.courseMsgTotal = courseMsgTotal
  },

  // 获取首页轮播图
  [types.GET_ALL_ADVER_TI_SING_LIST](state, { allAdvertisingList }) {
    state.allAdvertisingList = allAdvertisingList
  },

  // 获取首页轮播图
  [types.GET_FIND_STUDENT_NUMBERLIST](
    state,
    { findStudentList, findStudentTotal },
  ) {
    state.findStudentList = findStudentList
    state.findStudentTotal = findStudentTotal
  },
}
