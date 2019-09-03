import * as types from './mutation-types'

export default {
  [types.SET_TEST](state, { user_test }) {
    state.user_test = user_test
  },

  //控制是否可以进入下一步第一步
  [types.SET_ADD_COURSE_ONESHOW](state, { courseIdSign }) {
    state.oneShow = true
    state.courseIdSign = courseIdSign
  },

  // 获取树形分类  三级菜单
  [types.SET_FIND_COURSE_THREE_LIST](state, { threeList }) {
    state.threeList = threeList
  },

  // 获取所有老师
  [types.SET_BY_ALL_TEACHER_LIST](state, { allTeacher }) {
    state.allTeacher = allTeacher
  },

  // 根据课程id查询所有关联老师
  [types.SET_ALL_COURSE_TEACHER_LIST](
    state,
    { allCourseTeacherList, masterFlagId },
  ) {
    state.allCourseTeacherList = allCourseTeacherList
  },

  // 控制active++
  getActiveJiajia(state) {
    state.active += 1
  },

  // 控制active--
  getActiveJianjian(state) {
    state.active -= 1
  },

  //控制是否可以进入下一步  第二步
  [types.SET_STATE_TWO_SHOW](state) {
    state.twoShow = true
  },

  // 查看用户中心我的学习进度
  [types.SET_COURSE_STUDY_PROGRESS](state, { courseStudyProgress }) {
    state.courseStudyProgress = courseStudyProgress
  },

  // 查看用户中心我的学习进度
  [types.SET_COURSE_STUDY_PROGRESS_SACCOMPLISH](
    state,
    { courseStudyProgressSaccomplish },
  ) {
    state.courseStudyProgressSaccomplish = courseStudyProgressSaccomplish
  },

  // 控制用户是否可以进入下一步
  handleStep(state, newActive) {
    state.activeShow += 1
    localStorage.setItem('active', newActive)
  },
  // 控制用户是否可以进入上一步
  handlePre(state, newActive) {
    state.activeShow -= 1
    localStorage.setItem('active', newActive)
  },
}
