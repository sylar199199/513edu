import * as types from './mutation-types'

export default {
  [types.SET_TEST](state, { user_test }) {
    state.user_test = user_test
  },

  [types.SET_FINE_ONE](state, { findOneList }) {
    state.findOneList = findOneList
  },

  // 推荐课程列表  综合排序
  [types.SET_ALL_COURSE_RECOMMENDED_LIST](
    state,
    { allCourseRecommendedList, recommendedTotal },
  ) {
    state.allCourseRecommendedList = allCourseRecommendedList
    state.recommendedTotal = recommendedTotal
  },

  // 推荐课程列表  综合排序
  [types.SET_ALL_COURSE_DATA_LIST](state, { allCourseDataList }) {
    state.allCourseDataList = allCourseDataList
  },

  // 课程下拉
  [types.SET_ALL_COURSE_DOWN_LIST](state, { courseDownList }) {
    state.courseDownList = courseDownList
  },

  // 章节下拉
  [types.SET_ALL_COURSE_CHAPTER_LIST](state, { courseChapterDownList }) {
    state.courseChapterDownList = courseChapterDownList
  },
}
