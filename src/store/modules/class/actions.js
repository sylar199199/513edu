import * as types from './mutation-types'
import { $message } from '@/element'
import { Loading } from 'element-ui'

export default {
  // 获取课程一级分类列表
  async getFindOne({ commit }) {
    const res = await this.$ajax.get(this.$apis.getFindOne)
    if (res.ok) {
      commit({
        type: types.SET_FINE_ONE,
        findOneList: res.data,
      })
    }
  },

  // 推荐课程列表  综合排序
  async getAllCourseRecommendedList({ commit }, numSizeObj) {
    const res = await this.$ajax.post(this.$apis.getAllCourseRecommendedList, {
      courseType: numSizeObj.courseType || 0,
      gradeThree: numSizeObj.gradeThree || 0,
      page: numSizeObj.page,
      size: numSizeObj.size,
      sort: numSizeObj.sort || 0,
    })
    if (res.ok) {
      commit({
        type: types.SET_ALL_COURSE_RECOMMENDED_LIST,
        allCourseRecommendedList: res.data.list,
        recommendedTotal: res.data.total,
      })
    }
  },

  // 根据学校id获取全部资料
  async getAllCourseDataList({ commit }, courseId) {
    const res = await this.$ajax.post(this.$apis.getAllCourseDataList, {
      courseId: courseId,
      page: 1,
      size: 20,
    })
    if (res.ok) {
      commit({
        type: types.SET_ALL_COURSE_DATA_LIST,
        allCourseDataList: res.data.list,
      })
    }
  },

  // 课程下拉
  async getCourseDownList({ commit }) {
    const res = await this.$ajax.get(this.$apis.getCourseDownList)
    if (res.ok) {
      commit({
        type: types.SET_ALL_COURSE_DOWN_LIST,
        courseDownList: res.data,
      })
    }
  },

  // 章节下拉
  async getCourseChapterDownList({ commit }, sign) {
    const res = await this.$ajax.post(this.$apis.getCourseChapterDownList, {
      sign: sign,
    })
    if (res.ok) {
      commit({
        type: types.SET_ALL_COURSE_CHAPTER_LIST,
        courseChapterDownList: res.data,
      })
    }
  },

  // 添加课程资料
  async getAddCourseData({ commit }, addCourseDataReqObj) {
    const res = await this.$ajax.post(this.$apis.getAddCourseData, {
      chapterIdSign: addCourseDataReqObj.chapterIdSign,
      courseIdSign: addCourseDataReqObj.courseIdSign,
      dataName: addCourseDataReqObj.dataName,
      dataPath: addCourseDataReqObj.dataPath,
      dataSize: addCourseDataReqObj.dataSize,
      dataType: addCourseDataReqObj.dataType,
    })
    if (res.ok) {
      $message.success('添加成功')
    } else {
      $message.error('添加失败')
    }
  },

  // 删除课程资料
  async getDeleteCourseData({ commit }, sign) {
    const res = await this.$ajax.post(this.$apis.getDeleteCourseData, {
      sign: sign,
    })
    if (res.ok) {
      $message.success('删除成功')
    } else {
      $message.error('删除失败')
    }
  },

  // 修改课程资料
  async getUpdateCourseData({ commit }, updateCourseDataReqObj) {
    const res = await this.$ajax.post(this.$apis.getUpdateCourseData, {
      idSign: updateCourseDataReqObj.idSign,
      dataName: updateCourseDataReqObj.dataName,
    })
    if (res.ok) {
      $message.success('修改成功')
    } else {
      $message.error('修改失败')
    }
  },

  // 测试后期可以删除
  async getDownSchoolList({}) {
    let loadingInstance = Loading.service()
    const res = await this.$ajax.get(this.$apis.getDownSchoolList)
    loadingInstance.close()
    console.log(res)
  },
}
