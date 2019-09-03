import * as types from './mutation-types'
import { $message } from '@/element'

export default {
  // 获取系统公告
  async getFindBulletinPage({ state, commit }, terms = {}) {
    const res = await this.$ajax.post(this.$apis.getAllSystemMsgList, {
      msgType: 3,
      page: 1,
      size: 5,
      ...terms,
    })
    if (res.ok) {
      commit({
        type: types.SET_FINDBULLETIN_PAGE,
        newMessageList: res.data.list,
        newMessageTotal: res.data.total,
      })
    }
  },

  // 获取校内公告
  async getAllSystemMsgList({ commit }, terms = {}) {
    const res = await this.$ajax.post(this.$apis.getAllSystemMsgList, {
      msgType: 1,
      page: 1,
      size: 5,
      ...terms,
    })
    commit({
      type: types.SET_ALL_SYSTEM_MSG_LIST,
      allSystemMsgList: res.data.list,
      allSystemMsgTotal: res.data.total,
    })
  },

  // 获取课程公告
  async getAllCourseMsgList({ commit }, terms = {}) {
    const res = await this.$ajax.post(this.$apis.getAllCourseMsgList, {
      page: 1,
      size: 5,
      ...terms,
    })
    commit({
      type: types.SET_ALL_COURSE_MSG_LIST,
      allCourseMsgList: res.data.list,
      allCourseMsgTotal: res.data.total,
    })
  },

  // 学习中心课程公告
  async getCourseMsgList({ commit }, courseObj) {
    const res = await this.$ajax.post(this.$apis.getCourseMsgList, {
      courseIdSign: courseObj.courseIdSign,
      page: courseObj.page,
      size: courseObj.size,
    })
    if (res.ok) {
      commit({
        type: types.SET_COURSE_MSG_LIST_GONG_GAO,
        courseMsgList: res.data.list,
        courseMsgTotal: res.data.total,
      })
    }
  },

  // 添加课程公告
  async getAddMessageInfo({}, addMessageInfoReqObj) {
    const res = await this.$ajax.post(this.$apis.getAddMessageInfo, {
      content: addMessageInfoReqObj.content,
      courseId: addMessageInfoReqObj.courseId,
      title: addMessageInfoReqObj.title,
    })
    if (res.ok) {
      $message.success('发布成功')
    } else {
      $message.error('发布失败')
    }
  },

  // 获取首页轮播图
  async getAllAdvertisingList({ commit }) {
    const res = await this.$ajax.get(this.$apis.getAllAdvertisingList)
    if (res.ok) {
      commit({
        type: types.GET_ALL_ADVER_TI_SING_LIST,
        allAdvertisingList: res.data,
      })
    }
  },

  // 教师中心学员管理列表
  async getFindStudentList({ commit }, searchReqObj) {
    const res = await this.$ajax.post(this.$apis.getFindStudentList, {
      courseId: searchReqObj.courseId,
      page: searchReqObj.page,
      size: searchReqObj.size,
    })
    if (res.ok) {
      commit({
        type: types.GET_FIND_STUDENT_NUMBERLIST,
        findStudentList: res.data.list,
        findStudentTotal: res.data.total,
      })
    }
  },

  // 教师中心退课
  async getDeleteTeacher({}, studentList) {
    const res = await this.$ajax.post(this.$apis.getDeleteTeacher, {
      studentList: studentList,
    })
    if (res.ok) {
      $message.success('删除成功')
    } else {
      $message.error(res.msg)
    }
  },
}
