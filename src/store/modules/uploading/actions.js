import * as types from './mutation-types'
import { $message } from '@/element'
import cookieUtils from '@utils/cookie'
import Vue from 'vue'

// loading框设置局部刷新，且所有请求完成后关闭loading框
let loading
function startLoading() {
  loading = Vue.prototype.$loading({
    lock: true,
    text: 'Loading...',
    target: document.querySelector('.loading-area'), //设置加载动画区域
  })
}
function endLoading() {
  loading.close()
}

export default {
  //添加课程
  async getAddCourse({ commit }, summaryObj) {
    const res = await this.$ajax.post(this.$apis.getAddCourse, {
      content: summaryObj.ruleForm.introduction,
      courseDescribe: summaryObj.ruleForm.curriculum,
      courseName: summaryObj.ruleForm.name,
      courseNotice: summaryObj.ruleForm.objective,
      coursePicture: summaryObj.coursePicture,
      coursePrice: parseInt(summaryObj.ruleForm.price) || 0,
      courseScore: parseFloat(summaryObj.ruleForm.credit),
      courseTime: parseInt(summaryObj.ruleForm.period),
      courseType2IdSign: summaryObj.ruleForm.typeVal[1],
      courseType3IdSign: summaryObj.ruleForm.typeVal[2],
      courseTypeIdSign: summaryObj.ruleForm.typeVal[0],
      knowledge: summaryObj.ruleForm.design,
      sort: 0,
      type: parseInt(summaryObj.ruleForm.research),
    })
    if (res.ok) {
      $message.success('添加成功')
      commit({
        type: types.SET_ADD_COURSE_ONESHOW,
        courseIdSign: res.data,
      })
      localStorage.setItem('courseIdSign', res.data)
    }
    return res.ok
  },

  //获取全部课程分类
  async getFindCourseThreeList({ commit }) {
    const res = await this.$ajax.get(this.$apis.getFindCourseThreeList)
    if (res.ok) {
      commit({
        type: types.SET_FIND_COURSE_THREE_LIST,
        threeList: res.data,
      })
    }
  },

  //获取所有学校所有老师
  async getByAllTeacher({ commit }) {
    const res = await this.$ajax.post(this.$apis.getByAllTeacher)
    if (res.ok) {
      commit({
        type: types.SET_BY_ALL_TEACHER_LIST,
        allTeacher: res.data,
      })
    }
  },

  //添加课程关联老师
  async getAddCourseTeacher({ commit }, addCourseTeacherObj) {
    const res = await this.$ajax.post(this.$apis.getAddCourseTeacher, {
      courseIdSign: addCourseTeacherObj.courseIdSign,
      teacherIdSign: addCourseTeacherObj.teacherIdSign,
    })
    if (res.ok) {
      $message.success('添加成功')
      cookieUtils.setCookie('uploading', 2)
    }
  },

  //根据课程id查询所有关联老师
  async getAllCourseTeacherList({ commit }, courseIdSign) {
    const res = await this.$ajax.post(this.$apis.getAllCourseTeacherList, {
      courseIdSign: courseIdSign,
      page: 1,
      size: 50,
    })
    if (res.ok) {
      res.data.list.filter(item => {
        if (item.masterFlag == '主讲教师') {
          localStorage.setItem('speaker', item.idSign)
        }
      })
      commit({
        type: types.SET_ALL_COURSE_TEACHER_LIST,
        allCourseTeacherList: res.data.list,
      })
    }
  },

  // 删除关联的课程老师
  async getUpdateCourseTeacherDeleteFlag({ commit }, idSign) {
    const res = this.$ajax.post(this.$apis.getUpdateCourseTeacherDeleteFlag, {
      //deleteFlag: true,
      sign: idSign,
    })
  },

  //选择课程老师管理者
  async getUpdateMasterFlag({ commit, state }, updateMasterFlagReqObj) {
    const res = await this.$ajax.post(this.$apis.getUpdateMasterFlag, {
      bindMasterSign: updateMasterFlagReqObj.bindMasterSign,
      courseIdSign: updateMasterFlagReqObj.courseIdSign,
      unbindMasterSign: updateMasterFlagReqObj.unbindMasterSign || '',
    })
    if (res.ok) {
      $message.success('保存成功')
      commit({
        type: types.SET_STATE_TWO_SHOW,
        twoShow: true,
      })
    }
  },

  //添加课程章节
  async getAddCourseChapter({ commit }, treeObj) {
    const res = await this.$ajax.post(this.$apis.getAddCourseChapter, {
      chapterLevel: treeObj.chapterLevel,
      chapterName: treeObj.chapterName,
      chapterSynopsis: treeObj.chapterSynopsis,
      courseIdSign: treeObj.courseIdSign,
    })
    if (res.ok) {
      $message.success('添加成功')
    } else {
      $message.error(res.msg)
    }
  },

  //删除章节
  async getDeleteCourseChapter({ commit }, chapterId) {
    const res = await this.$ajax.post(this.$apis.getDeleteCourseChapter, {
      sign: chapterId,
    })
    if (res.ok) {
      $message.success('删除成功')
    } else {
      $message.error(res.message)
    }
    return res.ok
  },

  //删除小节
  async getDeleteCourseChaperVideo({ commit }, deleteChildNodeSign) {
    const res = await this.$ajax.post(this.$apis.getDeleteCourseChaperVideo, {
      sign: deleteChildNodeSign,
    })
    if (res.ok) {
      $message.success('删除成功')
    } else {
      $message.error(res.message)
    }
  },

  // 添加视频
  async getAddCourseChaperVideo({ commit }, treeTwoObj) {
    const res = await this.$ajax.post(this.$apis.getAddCourseChaperVideo, {
      chapterIdSign: treeTwoObj.chapterIdSign,
      videoLevel: parseInt(treeTwoObj.videoLevel),
      videoTitle: treeTwoObj.videoTitle,
    })
    if (res.ok) {
      $message.success('添加成功')
    } else {
      $message.error(res.msg)
    }
  },

  // 上传章节视频
  async getUploadVideo({ commit }, updateChapterReq) {
    startLoading()
    const res = await this.$ajax.post(this.$apis.getUploadVideo, {
      chapterVideoSign: updateChapterReq.chapterVideoSign,
      videoSign: updateChapterReq.videoSign,
    })

    if (res.ok) {
      $message.success('上传成功')
      endLoading()
    } else {
      $message.error('上传失败')
    }
  },

  // 添加课程考核
  async getAddInspectionStandard({ commit }, addInspectionStandardReq) {
    const res = await this.$ajax.post(this.$apis.getAddInspectionStandard, {
      courseId: addInspectionStandardReq.courseId,
      interactiveQuestion: addInspectionStandardReq.interactiveQuestion,
      logSig: addInspectionStandardReq.logSig,
      theFinalExam: addInspectionStandardReq.theFinalExam,
      unitTesting: addInspectionStandardReq.unitTesting,
      watchVideo: addInspectionStandardReq.watchVideo,
    })
    if (res.ok) {
      $message.success('添加成功')
      return true
    } else {
      $message.error('添加失败')
      return false
    }
  },

  // 查看用户中心我的学习进度 未完成的
  async getCourseStudyProgress({ commit }) {
    const res = await this.$ajax.post(this.$apis.getCourseStudyProgress, {
      page: 1,
      size: 10,
      studyStatus: 1,
    })
    if (res.ok) {
      commit({
        type: types.SET_COURSE_STUDY_PROGRESS,
        courseStudyProgress: res.data.list,
      })
    }
  },

  // 查看用户中心我的学习进度 已完成的
  async getCourseStudyProgresSaccomplish({ commit }) {
    const res = await this.$ajax.post(this.$apis.getCourseStudyProgress, {
      page: 1,
      size: 10,
      studyStatus: 2,
    })
    if (res.ok) {
      commit({
        type: types.SET_COURSE_STUDY_PROGRESS_SACCOMPLISH,
        courseStudyProgressSaccomplish: res.data.list,
      })
    }
  },
}
