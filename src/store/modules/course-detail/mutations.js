import * as types from './mutation-types'

export default {
  [types.SET_CURRENT_VIDEO_INFO](state, { videoInfo }) {
    state.videoInfo = videoInfo
  },
  [types.SET_IS_COLLEGE_MODE](state, { path }) {
    state.is_college_mode = path.indexOf('/college') === 0
  },

  // 根据id查询课程信息
  [types.SET_BY_COURSEID](state, { courseInfoVo, courseTeacherVoList }) {
    state.courseInfoVo = courseInfoVo
    state.courseTeacherVoList = courseTeacherVoList
  },

  // 获取课程目录
  [types.SET_COURSE_CATALOG](state, { newCourseSection }) {
    state.courseSection = newCourseSection
  },

  // 根据课程id查询课程全部提问
  [types.SET_ALLCOURSE_QUESTIONS_LIST](
    state,
    { newAllCourseQuestionsList, quoraTotal },
  ) {
    state.allCourseQuestionsList = newAllCourseQuestionsList
    state.quoraTotal = quoraTotal
  },

  // 根据问答id查询全部回复
  [types.SET_ALLCOURSE_QUESTIONS_ANSWERS](
    state,
    { allCourseQuestionsAnswers, allCourseQuestionsAnswersTotal },
  ) {
    state.allCourseQuestionsAnswers = allCourseQuestionsAnswers
    state.allCourseQuestionsAnswersTotal = allCourseQuestionsAnswersTotal
  },

  // 获取根据问答id
  geTallCourseQuestionsAnswersId(state, newIdSign) {
    state.idSign = newIdSign
  },

  // 获取考核详情
  [types.SET_BY_INSPECTION_STANDARD_ID](
    state,
    { inspectionStandardList, echartPieObj, echartShow },
  ) {
    state.inspectionStandardList = inspectionStandardList
    state.echartPieObj = echartPieObj
    state.echartShow = echartShow
  },

  // 获取考核详情(没有data时)
  [types.SET_BY_INSPECTION_STANDARD_ID_NULL](state, { echartShow }) {
    state.echartShow = echartShow
  },

  // 根据id获取章节
  [types.SET_BY_COURSE_CHAPTER_ID](state, { courseChapterIdList }) {
    state.courseChapterIdList = courseChapterIdList
  },

  // 根据id获取子章节视频详情
  [types.SET_BY_COURSE_CHAPTER_VIDEO_ID](state, { courseChapterVideoIdList }) {
    state.courseChapterVideoIdList = courseChapterVideoIdList
  },
}
