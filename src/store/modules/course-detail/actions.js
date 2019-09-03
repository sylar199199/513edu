import * as types from './mutation-types'
import { $message } from '@/element'

export default {
  async getVideoAuth({ commit }, videoSign) {
    const res = await this.$ajax.post(this.$apis.getVideoAuth, { videoSign })
    if (res.ok) {
      commit({
        type: types.SET_CURRENT_VIDEO_INFO,
        videoInfo: res.data,
      })
    }
    return res
  },

  // 根据id查询课程信息
  async getByCourseId({ commit }, search) {
    const res = await this.$ajax.post(this.$apis.getByCourseId, {
      sign: search,
    })
    if (res.ok) {
      commit({
        type: types.SET_BY_COURSEID,
        courseInfoVo: res.data.courseInfoVo,
        courseTeacherVoList: res.data.courseTeacherVoList,
      })
    }
  },

  // 获取课程目录
  async getCourseCatalog({ commit }, coursectionId) {
    const res = await this.$ajax.post(this.$apis.getCourseCatalog, {
      sign: coursectionId,
    })
    if (res.ok) {
      commit({
        type: types.SET_COURSE_CATALOG,
        newCourseSection: res.data,
      })
    }
  },

  // 根据课程id查询课程全部提问   最新
  async getAllCourseQuestionsList({ commit, rootState }, terms = {}) {
    const res = await this.$ajax.post(this.$apis.getAllCourseQuestionsList, {
      courseIdSign: rootState.route.params.id,
      page: 1,
      size: 3,
      ...terms,
      sortType: 0,
    })
    if (res.ok) {
      commit({
        type: types.SET_ALLCOURSE_QUESTIONS_LIST,
        newAllCourseQuestionsList: res.data.list,
        quoraTotal: res.data.total,
      })
    }
  },

  // 根据课程id查询课程全部提问  最热
  async getAllCourseQuestionsOneList({ commit, rootState }, terms = {}) {
    const res = await this.$ajax.post(this.$apis.getAllCourseQuestionsList, {
      courseIdSign: rootState.route.params.id,
      page: 1,
      size: 3,
      ...terms,
      sortType: 1,
    })
    if (res.ok) {
      commit({
        type: types.SET_ALLCOURSE_QUESTIONS_LIST,
        newAllCourseQuestionsList: res.data.list,
        quoraTotal: res.data.total,
      })
    }
  },

  //添加课程视频提问
  async getAddCourseQuestions({ commit, rootState }, quoraText) {
    const res = this.$ajax.post(this.$apis.getAddCourseQuestions, {
      courseIdSign: rootState.route.params.id,
      questionsContent: quoraText,
    })
  },

  //根据问答id查询全部回复
  async getAllCourseQuestionsAnswers({ commit, state }, terms = {}) {
    const res = await this.$ajax.post(this.$apis.getAllCourseQuestionsAnswers, {
      page: 1,
      size: 3,
      ...terms,
      questionsIdSign: state.idSign,
    })
    if (res.ok) {
      commit({
        type: types.SET_ALLCOURSE_QUESTIONS_ANSWERS,
        allCourseQuestionsAnswers: res.data.list,
        allCourseQuestionsAnswersTotal: res.data.total,
      })
    }
  },

  //添加提问回复
  async getAddCourseQuestionsAnswers({ commit, state }, revertInput) {
    const res = await this.$ajax.post(this.$apis.getAddCourseQuestionsAnswers, {
      answersContent: revertInput,
      questionsIdSign: state.idSign,
    })
    if (res.ok) {
      $message.success('回复成功')
    }
  },

  // 获取考核详情
  async getByInspectionStandardId({ commit, state }, courseIdSign) {
    const res = await this.$ajax.post(this.$apis.getByInspectionStandardId, {
      courseIdSign: courseIdSign,
      page: 1,
      size: 10,
    })
    if (res.ok && res.data !== null) {
      let watchVideo = parseInt(res.data.watchVideo.replace(/%/g, ''))
      let unitTesting = parseInt(res.data.unitTesting.replace(/%/g, ''))
      let theFinalExam = parseInt(res.data.theFinalExam.replace(/%/g, ''))
      let logSig = parseInt(res.data.logSig.replace(/%/g, ''))
      let interactiveQuestion = parseInt(
        res.data.interactiveQuestion.replace(/%/g, ''),
      )
      let inspectionStandardList = {
        watchVideo,
        unitTesting,
        theFinalExam,
        logSig,
        interactiveQuestion,
        id: res.data.id,
      }
      let obj1 = {
        value: unitTesting,
        name: '单元测试',
      }
      let obj2 = {
        value: theFinalExam,
        name: '期末成绩',
      }
      let obj3 = {
        value: interactiveQuestion,
        name: '互动问答',
      }
      let obj4 = {
        value: watchVideo,
        name: '观看视频',
      }
      let obj5 = {
        value: logSig,
        name: '登录签到',
      }
      let newArr = [obj1, obj2, obj3, obj4, obj5]
      commit({
        type: types.SET_BY_INSPECTION_STANDARD_ID,
        inspectionStandardList: inspectionStandardList,
        echartPieObj: newArr,
        echartShow: 6,
      })
    } else {
      commit({
        type: types.SET_BY_INSPECTION_STANDARD_ID_NULL,
        echartShow: 1,
      })
    }
  },

  // 修改课程考核
  async getUpdateInspectionStandard(
    { commit },
    updateInspectionStandardReqObj,
  ) {
    const res = await this.$ajax.post(this.$apis.getUpdateInspectionStandard, {
      courseId:
        updateInspectionStandardReqObj.addInspectionStandardReq.courseId,
      id: updateInspectionStandardReqObj.id,
      interactiveQuestion:
        updateInspectionStandardReqObj.addInspectionStandardReq
          .interactiveQuestion,
      logSig: updateInspectionStandardReqObj.addInspectionStandardReq.logSig,
      theFinalExam:
        updateInspectionStandardReqObj.addInspectionStandardReq.theFinalExam,
      unitTesting:
        updateInspectionStandardReqObj.addInspectionStandardReq.unitTesting,
      watchVideo:
        updateInspectionStandardReqObj.addInspectionStandardReq.watchVideo,
    })
    if (res.ok) {
      $message.success('修改成功')
    } else {
      $message.error('修改失败')
    }
  },

  // 根据id获取章节
  async getByCourseChapterId({ commit }, chapterId) {
    const res = await this.$ajax.post(this.$apis.getByCourseChapterId, {
      sign: chapterId,
    })
    if (res.ok) {
      commit({
        type: types.SET_BY_COURSE_CHAPTER_ID,
        courseChapterIdList: res.data,
      })
    }
  },

  // 修改课程章节信息
  async getUpdateCourseChapter({ commit }, updateCourseChapterReqObj) {
    const res = await this.$ajax.post(this.$apis.getUpdateCourseChapter, {
      chapterLevel: updateCourseChapterReqObj.chapterLevel,
      chapterName: updateCourseChapterReqObj.chapterName,
      chapterSynopsis: updateCourseChapterReqObj.chapterSynopsis,
      idSign: updateCourseChapterReqObj.idSign,
    })
    if (res.ok) {
      $message.success('修改成功')
    } else {
      $message.error('修改失败')
    }
  },

  // 根据id获取子章节视频详情
  async getByCourseChapterVideoId({ commit }, sign) {
    const res = await this.$ajax.post(this.$apis.getByCourseChapterVideoId, {
      sign: sign,
    })
    if (res.ok) {
      commit({
        type: types.SET_BY_COURSE_CHAPTER_VIDEO_ID,
        courseChapterVideoIdList: res.data,
      })
    }
  },

  // 修改子章节视频信息
  async getUpdateCourseChapterVideo({ commit }, updateCourseChaperVideoReqObj) {
    const res = await this.$ajax.post(this.$apis.getUpdateCourseChapterVideo, {
      idSign: updateCourseChaperVideoReqObj.idSign,
      videoTitle: updateCourseChaperVideoReqObj.videoTitle,
      videoLevel: updateCourseChaperVideoReqObj.videoLevel,
    })
    if (res.ok) {
      $message.success('修改成功')
    } else {
      $message.error('修改失败')
    }
  },
}
