import * as types from './mutation-types'
import { $message } from '@/element'

export default {
  // 根据考试信息id 查询管理考试题目列表
  async getAllExaminationSubject({ commit }, sign) {
    const res = await this.$ajax.post(this.$apis.getAllExaminationSubject, {
      examinationId: sign,
      page: 1,
      size: 1000,
    })
    if (res.ok) {
      commit({
        type: types.SET_ALL_EXAM_AMINATION_SUBJECT,
        allExaminationSubject: res.data.list,
      })
    }
  },

  // 删除考试关联题目
  async getDeleteExaminationSubject({}, deleteExaminationSubjectReqObj) {
    const res = await this.$ajax.post(this.$apis.getDeleteExaminationSubject, {
      examinationId: deleteExaminationSubjectReqObj.examinationId,
      subjectId: deleteExaminationSubjectReqObj.subjectId,
    })
    if (res.ok) {
      $message.success('删除成功')
    } else {
      $message.error('删除失败')
    }
  },

  // 添加考试关联题目
  async getAddExaminationSubject({}, addExaminationSubjectReqObj) {
    const res = await this.$ajax.post(this.$apis.getAddExaminationSubject, {
      examinationId: addExaminationSubjectReqObj.examinationId,
      subjectIdList: addExaminationSubjectReqObj.subjectIdList,
    })
    if (res.ok) {
      $message.success('保存并添加成功')
      return true
    } else {
      $message.error('保存并添加失败')
      return false
    }
  },

  // 考试试卷题目
  async getExaminationTwoList({ commit }, sign) {
    const res = await this.$ajax.post(this.$apis.getExaminationTwoList, {
      examinationId: sign,
      page: 1,
      size: 10000,
    })
    if (res.ok) {
      commit({
        type: types.SET_EXAM_INATION_TWO_LIST,
        examinationTwoList: res.data,
      })
    }
  },

  // 查看考试试卷题目
  async getExaminationThereList({ commit }, examinationSubjectReqObj) {
    const res = await this.$ajax.post(this.$apis.getExaminationTwoList, {
      examinationId: examinationSubjectReqObj.examinationId,
      recordId: examinationSubjectReqObj.recordId,
      page: 1,
      size: 10000,
    })
    if (res.ok) {
      commit({
        type: types.SET_EXAM_INATION_TWO_LIST,
        examinationTwoList: res.data,
      })
    }
  },

  // 考试详情
  async getByExaminationId({ commit }, sign) {
    const res = await this.$ajax.post(this.$apis.getByExaminationId, {
      sign: sign,
    })
    if (res.ok) {
      commit({
        type: types.BY_EXAM_INATION_ID,
        byExaminationIdList: res.data,
      })
    }
  },

  // 添加考试记录
  async getAddExaminationRecord({ commit }, sign) {
    const res = await this.$ajax.post(this.$apis.getAddExaminationRecord, {
      examinationId: sign,
    })
    if (res.ok) {
      commit({
        type: types.ADD_EXAM_INATION_RECORD,
        addExaminationRecord: res.data,
      })
    }
  },

  // 添加历史试卷
  async getAddExaminationPaper({}, addExaminationPaperReqObj) {
    console.log(addExaminationPaperReqObj)
  },

  // 提交考试试卷
  async getSubjectExam({}, subjectExamReqObj) {
    const res = await this.$ajax.post(this.$apis.getSubjectExam, {
      answerList: subjectExamReqObj.answerList,
      examinationId: subjectExamReqObj.examinationId,
      recordId: subjectExamReqObj.recordId,
    })
    if (res.ok) {
      $message.success('提交试卷成功')
      return true
    } else {
      $message.error('提交试卷失败')
      return false
    }
  },

  // 试卷侧边栏的回显
  async getByRecordId({ commit }, sign) {
    let res = await this.$ajax.post(this.$apis.getByRecordId, {
      sign: sign,
    })
    if (res.ok) {
      commit({
        type: types.GET_BY_RECORD_ID_CE_BIAN_LAN,
        byRecordIdLIst: res.data,
      })
    }
  },

  // 考试记录列表
  async getFindRecordList({ commit }, recordReqObj) {
    const res = await this.$ajax.post(this.$apis.getFindRecordList, {
      courseId: recordReqObj.courseId,
      examinationId: recordReqObj.examinationId,
      examinationName: recordReqObj.examinationName,
      page: recordReqObj.page,
      size: recordReqObj.size,
      submitStatus: recordReqObj.submitStatus,
      type: 0,
      userName: recordReqObj.userName,
      studentCard: recordReqObj.studentCard,
    })
    if (res.ok) {
      commit({
        type: types.GET_FIND_RECORD_LIST,
        findRecordList: res.data.list,
        findRecordTotal: res.data.total,
      })
    }
  },

  // 删除课程信息
  async getDeleteExamination({}, idSign) {
    const res = await this.$ajax.post(this.$apis.getDeleteExamination, {
      sign: idSign,
    })
    if (res.ok) {
      $message.success('删除成功')
    } else {
      $message.error(res.message)
    }
  },

  // 修改课程信息
  async getUpdateExamination({}, updateExaminationReqObj) {
    const res = await this.$ajax.post(this.$apis.getUpdateExamination, {
      attention: updateExaminationReqObj.attention,
      courseIdSign: updateExaminationReqObj.courseIdSign,
      endTime: updateExaminationReqObj.endTime,
      examTime: updateExaminationReqObj.examTime,
      examinationName: updateExaminationReqObj.examinationName,
      idSign: updateExaminationReqObj.idSign,
      startTime: updateExaminationReqObj.startTime,
      totalScore: updateExaminationReqObj.totalScore,
      type: updateExaminationReqObj.type,
    })
    if (res.ok) {
      $message.success('修改成功')
      return true
    } else {
      $message.error(res.msg)
      return false
    }
  },

  // 发布状态
  async getUpdateReleaseStatus({}, baseStatusReqObj) {
    const res = await this.$ajax.post(this.$apis.getUpdateReleaseStatus, {
      sign: baseStatusReqObj.sign,
      status: baseStatusReqObj.status,
    })
    if (res.ok) {
      $message.success('修改成功')
      return true
    } else {
      $message.error(res.msg)
      return false
    }
  },

  // 已发布课程的详情
  async getByExamSubjectChoicesReleased({ commit }, sign) {
    const res = await this.$ajax.post(
      this.$apis.getByExamSubjectChoicesReleased,
      {
        sign: sign,
      },
    )
    if (res.ok) {
      commit({
        type: types.GET_BY_EXAM_SUBJECT_CHICES_RELEASED,
        byExamSubjectChoicesReleased: res.data,
      })
    }
  },

  // 已发布课程的修改
  async getUpdateExamSubjectChoicesCopy({}, addExamSubjectChoicesReqObj) {
    const res = await this.$ajax.post(
      this.$apis.getUpdateExamSubjectChoicesCopy,
      {
        analysis: addExamSubjectChoicesReqObj.analysis,
        answer: addExamSubjectChoicesReqObj.answer,
        id: addExamSubjectChoicesReqObj.id,
        level: addExamSubjectChoicesReqObj.level,
        optionList: addExamSubjectChoicesReqObj.optionList,
        score: addExamSubjectChoicesReqObj.score,
        serialNumber: addExamSubjectChoicesReqObj.serialNumber,
        subjectName: addExamSubjectChoicesReqObj.subjectName,
      },
    )
    if (res.ok) {
      $message.success('修改成功')
    } else {
      $message.error('修改失败')
    }
  },

  // 删除关联题目选项
  async getDeleteExamSubjectOptionCopy({}, sign) {
    const res = await this.$ajax.post(
      this.$apis.getDeleteExamSubjectOptionCopy,
      {
        sign: sign,
      },
    )
  },

  // 添加关联题目选项
  async getAddExamSubjectOptionCopy({}, addExamSubjectOptionReqObj) {
    const res = await this.$ajax.post(this.$apis.getAddExamSubjectOptionCopy, {
      optionContent: addExamSubjectOptionReqObj.optionContent,
      optionName: addExamSubjectOptionReqObj.optionName,
      subjectId: addExamSubjectOptionReqObj.subjectId,
    })
  },

  // 删除题目选项
  async getDeleteExamSubjectOption({}, sign) {
    const res = await this.$ajax.post(this.$apis.getDeleteExamSubjectOption, {
      sign: sign,
    })
  },

  // 添加题目选项
  async getAddExamSubjectOption({}, addExamSubjectOptionReqObj) {
    const res = await this.$ajax.post(this.$apis.getAddExamSubjectOption, {
      optionContent: addExamSubjectOptionReqObj.optionContent,
      optionName: addExamSubjectOptionReqObj.optionName,
      subjectId: addExamSubjectOptionReqObj.subjectId,
    })
  },
}
