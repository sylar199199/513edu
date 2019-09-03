import * as types from './mutation-types'

export default {
  [types.SET_TEST](state, { user_test }) {
    state.user_test = user_test
  },

  // 根据考试信息id 查询管理考试题目列表
  [types.SET_ALL_EXAM_AMINATION_SUBJECT](state, { allExaminationSubject }) {
    state.allExaminationSubject = allExaminationSubject
  },

  // 考试试卷题目
  [types.SET_EXAM_INATION_TWO_LIST](state, { examinationTwoList }) {
    state.examinationTwoList = examinationTwoList
  },

  // 考试详情
  [types.BY_EXAM_INATION_ID](state, { byExaminationIdList }) {
    state.byExaminationIdList = byExaminationIdList
  },

  // 添加考试记录
  [types.ADD_EXAM_INATION_RECORD](state, { addExaminationRecord }) {
    state.addExaminationRecord = addExaminationRecord
  },

  // 试卷侧边栏的回显
  [types.GET_BY_RECORD_ID_CE_BIAN_LAN](state, { byRecordIdLIst }) {
    state.byRecordIdLIst = byRecordIdLIst
  },

  // 考试记录列表
  [types.GET_FIND_RECORD_LIST](state, { findRecordList, findRecordTotal }) {
    state.findRecordList = findRecordList
    state.findRecordTotal = findRecordTotal
  },

  // 已发布课程的详情
  [types.GET_BY_EXAM_SUBJECT_CHICES_RELEASED](
    state,
    { byExamSubjectChoicesReleased },
  ) {
    state.byExamSubjectChoicesReleased = byExamSubjectChoicesReleased
  },
}
