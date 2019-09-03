import * as types from './mutation-types'
import { $message } from '@/element'

export default {
  //教师用户中心我的课程
  async getByMeCourseList({ commit }, pageSizeObj) {
    const res = await this.$ajax.post(this.$apis.getByMeCourseList, {
      page: pageSizeObj.page,
      size: pageSizeObj.size,
    })
    commit({
      type: types.SET_BY_ME_COURSE_LIST,
      byMeCourseList: res.data.list,
      byMeCourseTotal: res.data.total,
    })
  },

  // 课程详情供修改课程使用
  async getCourseId({ commit }, sign) {
    const res = await this.$ajax.post(this.$apis.getCourseId, {
      sign: sign,
    })
    if (res.ok) {
      commit({
        type: types.SET_COURSE_ID_LIST,
        newCourseIdList: res.data,
      })
    }
  },

  // 保存修改课程信息
  async getUpdateCourse({ commit }, boutiqueCourse) {
    const res = await this.$ajax.post(this.$apis.getUpdateCourse, {
      content: boutiqueCourse.ruleForm.introduction,
      courseDescribe: boutiqueCourse.ruleForm.curriculum,
      courseName: boutiqueCourse.ruleForm.name,
      courseNotice: boutiqueCourse.ruleForm.objective,
      coursePicture: boutiqueCourse.coursePicture,
      coursePrice: boutiqueCourse.ruleForm.price || 0,
      courseScore: boutiqueCourse.ruleForm.credit,
      courseTime: boutiqueCourse.ruleForm.period,
      courseType2IdSign: boutiqueCourse.ruleForm.typeVal[1],
      courseType3IdSign: boutiqueCourse.ruleForm.typeVal[2],
      courseTypeIdSign: boutiqueCourse.ruleForm.typeVal[0],
      idSign: boutiqueCourse.idSign,
      knowledge: boutiqueCourse.ruleForm.design,
      type:
        boutiqueCourse.ruleForm.research === '学分课'
          ? 1
          : boutiqueCourse.ruleForm.research === '公开课'
          ? 2
          : 3,
    })
    if (res.ok) {
      $message.success('修改成功')
    } else {
      $message.error('修改失败')
    }
  },

  // 删除课程
  async getDeleteCourse({ commit, dispatch }, sign) {
    const res = await this.$ajax.post(this.$apis.getDeleteCourse, {
      sign: sign,
    })
    if (res.ok) {
      $message.success('删除成功')
      dispatch('getByMeCourseList')
    } else {
      $message.error(res.message)
    }
  },

  // 添加视频进度
  async getAddStudyInfo({ commit }, addCourseStudyReqObj) {
    if (addCourseStudyReqObj.studyTime >= 5) {
      const res = await this.$ajax.post(this.$apis.getAddStudyInfo, {
        courseIdSign: addCourseStudyReqObj.courseIdSign,
        studyTime: addCourseStudyReqObj.studyTime,
        chapterVideoIdSign: addCourseStudyReqObj.videoIdSign,
      })
    }
  },

  // 根据用户id,课程id,视频id获取视频进度信息
  async getStudyInfo({ commit }, getCourseStudyReqObj) {
    const res = await this.$ajax.post(this.$apis.getStudyInfo, {
      chapterVideoIdSign: getCourseStudyReqObj.chapterVideoIdSign,
      courseIdSign: getCourseStudyReqObj.courseIdSign,
    })
    let setBendiTime = getCourseStudyReqObj.targetId
    if (res.data !== null) {
      if (res.data.studyTime !== null) {
        localStorage.getItem(setBendiTime)
          ? localStorage.getItem(setBendiTime)
          : localStorage.setItem(setBendiTime, res.data.studyTime)
      } else {
        //localStorage.setItem(setBendiTime, 0)
      }
    } else {
      //localStorage.setItem(setBendiTime, 0)
    }
  },

  // 教师中心引进课程列表
  async getSchoolTeacherList({ commit }, basePageReqObj) {
    const res = await this.$ajax.post(this.$apis.getSchoolTeacherList, {
      page: basePageReqObj.page,
      size: basePageReqObj.size,
    })
    if (res.ok) {
      commit({
        type: types.GET_SCHOOL_TEACHER_YIN_JIN_LIST,
        schoolTeacherList: res.data.list,
        schoolTeacherTotal: res.data.total,
      })
    }
  },

  // 引进课程成绩列表
  async getAllCourseScoreListOne({ commit }, courseScoreReqObj) {
    const res = await this.$ajax.post(
      this.$apis.getAllCourseScoreListOne,
      courseScoreReqObj,
    )
    if (res.ok) {
      commit({
        type: types.GET_ALL_SCHOOL_COURSE_SCORE_YIN_JIN_LIST,
        allCourseScoreList: res.data.list,
        allCourseScoreTotal: res.data.total,
      })
    }
  },

  // 教师中心成绩管理引进课程平均，最低，最高分统计，签名为课程id
  async getCourseScoreSumYinJin({ commit }, searchReqObj) {
    const res = await this.$ajax.post(
      this.$apis.getCourseScoreSumYinJin,
      searchReqObj,
    )
    if (res.ok) {
      commit({
        type: types.GET_GAO_DI_PING_COURSE_SCORE_YIN_JIN,
        courseScoreSumYinJinObj: res.data,
      })
    }
  },

  // 教师中心成绩管理引进课程成绩柱状图，签名为课程id
  async getScoreCountOneYinJin({ commit }, eChartList) {
    const res = await this.$ajax.post(
      this.$apis.getScoreCountOneYinJin,
      eChartList,
    )
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
        type: types.GET_SCORE_COUNT_ONE_YIN_JIN_LIST,
        scoreCountOneYinJinList: arr,
      })
    }
  },

  // 教师中心运行分析引进课程运行分析学习进度列表展示
  async getAllStudyProgressListOneYinJin({ commit }, tableListYinJin) {
    const res = await this.$ajax.post(
      this.$apis.getAllStudyProgressListOneYinJin,
      tableListYinJin,
    )
    if (res.ok) {
      commit({
        type: types.GET_ALL_STUDY_PROGRESS_ONE_YIN_JIN_LIST,
        allStudyProgressListOneYinJin: res.data.list,
        allStudyProgressTotalOneYinJin: res.data.total,
      })
    }
  },

  // 教师中心运行分析引进课程运行分析汇总统计
  async getdataStatisticsOneYinJin({ commit }, eChartYinJinList) {
    const res = await this.$ajax.post(
      this.$apis.getdataStatisticsOneYinJin,
      eChartYinJinList,
    )
    if (res.ok) {
      commit({
        type: types.GET_DATA_STATISTICE_ONE_YIN_JIN_LIST,
        eChartsChartVoMap: res.data.chartVoMap,
        eChartsCountVoMap: res.data.countVoMap,
      })
    }
  },

  // 教师中心单元测试引进课程考试记录列表
  async getFindRecordListOneYinJin({ commit }, testYinJinObj) {
    const res = await this.$ajax.post(
      this.$apis.getFindRecordListOneYinJin,
      testYinJinObj,
    )
    if (res.ok) {
      commit({
        type: types.GET_FIND_RECORD_TABLE_ONE_YIN_JIN_LIST,
        findRecordListOneYinJin: res.data.list,
        findRecordTotalOneYinJin: res.data.total,
      })
    }
  },

  // 教师中心单元测试引进课程考试试卷
  async getExaminationTwoListOneYinJin({ commit }, paperYinJinObj) {
    const res = await this.$ajax.post(
      this.$apis.getExaminationTwoListOneYinJin,
      paperYinJinObj,
    )
    if (res.ok) {
      commit({
        type: types.GET_EXAM_INATION_TWO_PAPER_ONE_YIN_JIN_LIST,
        examinationTwoListOneYinJin: res.data,
      })
    }
  },
}
