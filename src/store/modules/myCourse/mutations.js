import * as types from './mutation-types'

export default {
  [types.SET_TEST](state, { user_test }) {
    state.user_test = user_test
  },

  //教师用户中心我的课程
  [types.SET_BY_ME_COURSE_LIST](state, { byMeCourseList, byMeCourseTotal }) {
    state.byMeCourseList = byMeCourseList
    state.byMeCourseTotal = byMeCourseTotal
  },

  //修改课程页面内容
  [types.SET_COURSE_ID_LIST](state, { newCourseIdList }) {
    state.courseIdList = newCourseIdList
  },

  // 教师中心引进课程列表
  [types.GET_SCHOOL_TEACHER_YIN_JIN_LIST](
    state,
    { schoolTeacherList, schoolTeacherTotal },
  ) {
    state.schoolTeacherList = schoolTeacherList
    state.schoolTeacherTotal = schoolTeacherTotal
  },

  // 引进课程成绩列表
  [types.GET_ALL_SCHOOL_COURSE_SCORE_YIN_JIN_LIST](
    state,
    { allCourseScoreTotal, allCourseScoreList },
  ) {
    state.allCourseScoreTotal = allCourseScoreTotal
    state.allCourseScoreList = allCourseScoreList
  },

  // 教师中心成绩管理引进课程平均，最低，最高分统计，签名为课程id
  [types.GET_GAO_DI_PING_COURSE_SCORE_YIN_JIN](
    state,
    { courseScoreSumYinJinObj },
  ) {
    state.courseScoreSumYinJinObj = courseScoreSumYinJinObj
  },

  // 教师中心成绩管理引进课程成绩柱状图，签名为课程id
  [types.GET_SCORE_COUNT_ONE_YIN_JIN_LIST](state, { scoreCountOneYinJinList }) {
    state.scoreCountOneYinJinList = scoreCountOneYinJinList
  },

  // 教师中心运行分析引进课程运行分析学习进度列表展示
  [types.GET_ALL_STUDY_PROGRESS_ONE_YIN_JIN_LIST](
    state,
    { allStudyProgressListOneYinJin, allStudyProgressTotalOneYinJin },
  ) {
    state.allStudyProgressListOneYinJin = allStudyProgressListOneYinJin
    state.allStudyProgressTotalOneYinJin = allStudyProgressTotalOneYinJin
  },

  // 教师中心运行分析引进课程运行分析学习进度列表展示
  [types.GET_DATA_STATISTICE_ONE_YIN_JIN_LIST](
    state,
    { eChartsChartVoMap, eChartsCountVoMap },
  ) {
    state.eChartsChartVoMap = eChartsChartVoMap
    state.eChartsCountVoMap = eChartsCountVoMap
  },

  // 教师中心单元测试引进课程考试记录列表
  [types.GET_FIND_RECORD_TABLE_ONE_YIN_JIN_LIST](
    state,
    { findRecordListOneYinJin, findRecordTotalOneYinJin },
  ) {
    state.findRecordListOneYinJin = findRecordListOneYinJin
    state.findRecordTotalOneYinJin = findRecordTotalOneYinJin
  },

  // 教师中心单元测试引进课程考试试卷
  [types.GET_EXAM_INATION_TWO_PAPER_ONE_YIN_JIN_LIST](
    state,
    { examinationTwoListOneYinJin },
  ) {
    state.examinationTwoListOneYinJin = examinationTwoListOneYinJin
  },

  // 控制视频页面弹窗的显示
  dialogShow(state) {
    state.dialogVisible = true
  },

  // 控制视频页面弹窗的隐藏
  dialogNoShow(state) {
    // state.dialogVisible = false
    console.log(state)
  },
}
