import * as types from './mutation-types'

export default {
  [types.SET_TEST](state, { user_test }) {
    state.user_test = user_test
  },

  // 获取教师中心运行分析饼图数据
  [types.SET_DATA_STATI_STICS](state, { countVoMap, chartVoMap }) {
    state.chartVoMap = chartVoMap
    state.countVoMap = countVoMap
  },

  // 获取教师中心成运行分析成绩列表
  [types.SET_ALL_STUDY_PROGRESS_LIST](
    state,
    { allStudyProgressList, allStudyProgressTotal },
  ) {
    state.allStudyProgressList = allStudyProgressList
    state.allStudyProgressTotal = allStudyProgressTotal
  },

  // 获取教师中心成绩管理柱状图数据
  [types.SET_DATA_SCORE_COUNT](state, { scoreCountList }) {
    state.scoreCountList = scoreCountList
  },

  // 获取教师中心成绩管理最高分以及最低分
  [types.SET_DATA_SCORE_SUM](state, { courseScoreSumList }) {
    state.courseScoreSumList = courseScoreSumList
  },

  // 获取教师中心成绩管理成绩列表
  [types.SET_ALL_COURSE_SCORE_LIST](
    state,
    { allCourseScoreList, allCourseScoreTotal },
  ) {
    state.allCourseScoreList = allCourseScoreList
    state.allCourseScoreTotal = allCourseScoreTotal
  },

  // 选择题列表
  [types.SET_FIND_EXAM_SUBJECT_CHOICES_LIST](
    state,
    {
      findExamSubjectChoicesList,
      findExamSubjectChoicesTotal,
      findExamSubjectChoicesPageNum,
    },
  ) {
    ;(state.findExamSubjectChoicesList = findExamSubjectChoicesList),
      (state.findExamSubjectChoicesTotal = findExamSubjectChoicesTotal),
      (state.findExamSubjectChoicesPageNum = findExamSubjectChoicesPageNum)
  },

  // 选择题详情
  [types.SET_EXAM_SUBJECT_CHOICES_ID](state, { examSubjectChoicesIdList }) {
    state.examSubjectChoicesIdList = examSubjectChoicesIdList
  },

  // 选择题详情
  [types.SET_FIND_EXAM_INATION_LIST](
    state,
    { findExamExaminationList, findExamExaminationTotal },
  ) {
    state.findExamExaminationList = findExamExaminationList
    state.findExamExaminationTotal = findExamExaminationTotal
  },

  // 添加选择题
  [types.SET_ADD_EXAM_SUBJECT_CHOICES_ID](state, { subjectId }) {
    state.subjectId = subjectId
  },
}
