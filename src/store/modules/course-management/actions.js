import * as types from './mutation-types'
import { $message } from '@/element'

export default {
  // 获取教师中心运行分析饼图数据
  async getDataStatistics({ commit }, sign) {
    const res = await this.$ajax.post(this.$apis.getDataStatistics, {
      sign: sign,
    })
    if (res.ok) {
      commit({
        type: types.SET_DATA_STATI_STICS,
        chartVoMap: res.data.chartVoMap,
        countVoMap: res.data.countVoMap,
      })
    }
  },

  //获取教师中心成运行分析成绩列表
  async getAllStudyProgressList({ commit }, studyProgressReqObj) {
    const res = await this.$ajax.post(
      this.$apis.getAllStudyProgressList,
      studyProgressReqObj,
    )
    if (res.ok) {
      commit({
        type: types.SET_ALL_STUDY_PROGRESS_LIST,
        allStudyProgressList: res.data.list,
        allStudyProgressTotal: res.data.total,
      })
    }
  },

  //获取教师中心成绩管理柱状图数据
  async getScoreCount({ commit }, sign) {
    const res = await this.$ajax.post(this.$apis.getScoreCount, {
      sign: sign,
    })
    if (res.ok) {
      let arrOne = res.data.one
      let arrTwo = res.data.two
      let arrThere = res.data.three
      let arrFours = res.data.four
      let arrFive = res.data.five
      let arrSex = res.data.sex
      let arrSeven = res.data.seven
      let arrEight = res.data.eight
      let arrNine = res.data.nine
      let arrTen = res.data.ten
      let arr = [
        arrOne,
        arrTwo,
        arrThere,
        arrFours,
        arrFive,
        arrSex,
        arrSeven,
        arrEight,
        arrNine,
        arrTen,
      ]
      commit({
        type: types.SET_DATA_SCORE_COUNT,
        scoreCountList: arr,
      })
    }
  },

  // 获取教师中心成绩管理最高分以及最低分
  async getCourseScoreSum({ commit }, sign) {
    const res = await this.$ajax.post(this.$apis.getCourseScoreSum, {
      sign: sign,
    })
    if (res.ok) {
      commit({
        type: types.SET_DATA_SCORE_SUM,
        courseScoreSumList: res.data,
      })
    }
  },

  // 获取教师中心成绩管理成绩列表
  async getAllCourseScoreList({ commit }, courseScoreReqObj) {
    const res = await this.$ajax.post(
      this.$apis.getAllCourseScoreList,
      courseScoreReqObj,
    )
    if (res.ok) {
      commit({
        type: types.SET_ALL_COURSE_SCORE_LIST,
        allCourseScoreList: res.data.list,
        allCourseScoreTotal: res.data.total,
      })
    }
  },

  // 选择题列表
  async getFindExamSubjectChoicesList(
    { commit },
    numSizeObj = {
      pageNum: 0,
      size: 5,
    },
  ) {
    const res = await this.$ajax.post(
      this.$apis.getFindExamSubjectChoicesList,
      {
        page: numSizeObj.pageNum || 1,
        size: numSizeObj.size || 5,
        status: '0',
      },
    )
    if (res.ok) {
      commit({
        type: types.SET_FIND_EXAM_SUBJECT_CHOICES_LIST,
        findExamSubjectChoicesList: res.data.list,
        findExamSubjectChoicesTotal: res.data.total,
        findExamSubjectChoicesPageNum: res.data.pageNum,
      })
    }
  },

  // 选择题详情
  async getByExamSubjectChoicesId({ commit }, sign) {
    const res = await this.$ajax.post(this.$apis.getByExamSubjectChoicesId, {
      sign: sign,
    })
    if (res.ok) {
      commit({
        type: types.SET_EXAM_SUBJECT_CHOICES_ID,
        examSubjectChoicesIdList: res.data,
      })
    }
  },

  // 删除选择题
  async getDeleteExamSubjectChoices({ commit }, sign) {
    const res = await this.$ajax.post(this.$apis.getDeleteExamSubjectChoices, {
      sign: sign,
    })
    if (res.ok) {
      $message.success('删除成功')
    }
  },

  // 修改选择题
  async getUpdateExamSubjectChoices(
    { commit },
    updateExamSubjectChoicesReqObj,
  ) {
    const res = await this.$ajax.post(this.$apis.getUpdateExamSubjectChoices, {
      analysis: updateExamSubjectChoicesReqObj.analysis,
      answer: updateExamSubjectChoicesReqObj.answer,
      id: updateExamSubjectChoicesReqObj.id,
      level: updateExamSubjectChoicesReqObj.level,
      optionList: updateExamSubjectChoicesReqObj.optionList,
      score: updateExamSubjectChoicesReqObj.score,
      serialNumber: updateExamSubjectChoicesReqObj.serialNumber,
      subjectName: updateExamSubjectChoicesReqObj.subjectName,
    })
    if (res.ok) {
      $message.success('修改成功')
    } else {
      $message.error('修改失败')
    }
  },

  // 添加选择题
  async getAddExamSubjectChoices({ commit }, addExamSubjectChoicesReqObj) {
    const res = await this.$ajax.post(this.$apis.getAddExamSubjectChoices, {
      analysis: addExamSubjectChoicesReqObj.analysis,
      answer: addExamSubjectChoicesReqObj.answer,
      level: addExamSubjectChoicesReqObj.level,
      optionList: addExamSubjectChoicesReqObj.optionList,
      score: addExamSubjectChoicesReqObj.score,
      subjectName: addExamSubjectChoicesReqObj.subjectNam,
      serialNumber: addExamSubjectChoicesReqObj.serialNumber,
    })
    if (res.ok) {
      $message.success('添加成功')
      commit({
        type: types.SET_ADD_EXAM_SUBJECT_CHOICES_ID,
        subjectId: res.data,
      })
      return true
    } else {
      $message.error('添加失败')
      return false
    }
  },

  // 单元测试列表
  async getFindExamExaminationList({ commit }, courseTeacherReqObj) {
    const res = await this.$ajax.post(this.$apis.getFindExamExaminationList, {
      courseIdSign: courseTeacherReqObj.courseIdSign,
      page: courseTeacherReqObj.page,
      size: courseTeacherReqObj.size,
    })
    if (res.ok) {
      commit({
        type: types.SET_FIND_EXAM_INATION_LIST,
        findExamExaminationList: res.data.list,
        findExamExaminationTotal: res.data.total,
      })
    }
  },

  // 新建课程
  async getAddExamination({ commit }, addExaminationReqObj) {
    const res = await this.$ajax.post(this.$apis.getAddExamination, {
      attention: addExaminationReqObj.attention,
      courseIdSign: addExaminationReqObj.courseIdSign,
      endTime: addExaminationReqObj.endTime,
      examTime: addExaminationReqObj.examTime,
      examinationName: addExaminationReqObj.examinationName,
      startTime: addExaminationReqObj.startTime,
      totalScore: addExaminationReqObj.totalScore,
      type: addExaminationReqObj.type,
    })
    if (res.ok) {
      $message.success('添加成功')
    } else {
      $message.error('添加失败')
    }
  },
}
