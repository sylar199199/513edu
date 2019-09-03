export default {
  // login
  login: '/login', // 登陆 post
  register: '/register', // 注册 post
  resetLoginPassword: '/resetLoginPassword', // 忘记密码
  getCodeForMobile: '/baseVerify/sendCodeForMobile', // 获取短信验证码 post
  getVerifiCode: '/baseVerify/getVerifyCode', // 获取验证码 get
  getLoginInfo: 'getLoginInfo', // 获取登陆信息
  loginOut: 'loginOut', // 获取登出信息
  getNewsList: '/news/getNewsList', // pc 首页新闻资讯展示
  getHotList: '/news/getNewList', // 热点资讯展示 半年内最热5条
  getCourseRecommended: '/courseInfo/getCourseRecommended', //首页4条推荐课
  getInformationList: '/news/getAllNewsList', // 新闻资讯列表
  getByNewsId: '/news/getByNewsId', // 根据id获取新闻详情

  getSchoolList: '/school/getSchoolList', // 院校课程首页
  getSchoolTakeList: '/school/getSchoolTakeList', // 院校课程首页
  getByCourseId: '/courseInfo/getByCourseId', // 院校课程首页
  getCourseCatalog: '/courseInfo/courseCatalog', // 获取课程目录
  getAddCourseChapter: '/courseChapter/addCourseChapter', // 添加课程章节
  getDeleteCourseChapter: '/courseChapter/deleteCourseChapter', // 删除章节
  getDeleteCourseChaperVideo: '/courseChapterVideo/deleteCourseChapterVideo', // 删除小节
  getAddCourseChaperVideo: '/courseChapterVideo/addCourseChapterVideo', // 添加视频
  getUploadVideo: '/courseChapterVideo/uploadVideo', // 上传章节视频
  getAddInspectionStandard: '/inspectionStandard/addInspectionStandard', // 添加课程考核

  getUpdatePassword: '/account/updatePassword', // 修改用户密码
  getUpdateUserName: '/account/updateUserName', // 更新用户名称
  getVerifyCodeForMobile: '/baseVerify/verifyCodeForMobile', // 验证修改手机号验证旧手机
  getUpdateMobile: '/account/updateMobile', // 更新手机号
  getUploadUserPhoto: '/account/uploadUserPhoto', // 上传用户头像
  getUpdateSex: '/account/updateSex', // 更新用户性别
  getIdentityAuth: '/identityAuth', // 学生认证
  getFindUserRoleInfo: '/user/findUserRoleInfo', // 认证成功用户信息

  getFindBulletinPage: '/findBulletinPage', // 获取系统公告

  getByInspectionStandardId: '/inspectionStandard/getByInspectionStandardId', // 获取考核详情
  getCourseStudyProgress: '/courseStudyProgress/getCourseStudyProgress', // 查看用户中心我的学习进度
  getAddStudyInfo: '/courseStudy/addStudyInfo', // 添加视频进度
  getStudyInfo: '/courseStudy/getStudyInfo', // 根据用户id,课程id,视频id获取视频进度信息

  getAddCourse: '/courseInfo/addCourse', // 添加课程
  getFindCourseThreeList: '/courseType/findCourseThreeList', // 获取全部课程分类
  getByAllTeacher: '/teacher/getByTeacher', // 获取所有学校所有老师
  getAddCourseTeacher: '/courseTeacher/addCourseTeacher', // 添加课程关联老师
  getAllCourseTeacherList: '/courseTeacher/getAllCourseTeacherList', // 根据课程id查询所有关联老师
  getUpdateCourseTeacherDeleteFlag:
    '/courseTeacher/updateCourseTeacherDeleteFlag', // 删除关联的课程老师
  getUpdateMasterFlag: '/courseTeacher/updateMasterFlag', // 选择课程老师管理者

  getAllCourseQuestionsList: '/courseQuestions/getAllCourseQuestionsList', // 根据课程id查询课程全部提问
  getAddCourseQuestions: '/courseQuestions/addCourseQuestions', // 添加课程视频提问
  getAllCourseQuestionsAnswers:
    '/courseQuestionsAnswers/getAllCourseQuestionsList', // 根据问答id查询全部回复
  getAddCourseQuestionsAnswers:
    '/courseQuestionsAnswers/addCourseQuestionsAnswers', // 添加提问回复

  getByMeCourseList: '/courseInfo/getByMeCourseList', // 教师用户中心我的课程
  getCourseId: '/courseInfo/getCourseId', // 课程详情供修改课程使用
  getUpdateCourse: '/courseInfo/updateCourse', // 保存修改课程信息
  getDeleteCourse: '/courseInfo/deleteCourse', // 删除课程

  // 根据isSign 获取 video auth
  getVideoAuth: '/video/getVideoAuth',

  // 二期功能
  getQrImage: '/baseVerify/getQrImage', // 获取二维码
  getFindOne: '/courseType/findOne', // 获取课程一级分类列表
  getAllCourseRecommendedList: '/courseInfo/getAllCourseRecommendedList', //推荐课程列表
  getAllCourseDataList: '/courseData/getAllCourseDataList', // 根据学校id获取全部资料
  getAllCourseChapterList: '/courseChapter/getAllCourseChapterList', // 获取全部课程章节
  getCourseDownList: '/courseInfo/courseDownList', // 课程下拉
  getCourseChapterDownList: '/courseChapter/courseChapterDownList', // 章节下拉
  getUpdateInspectionStandard: '/inspectionStandard/updateInspectionStandard', // 修改课程考核
  getUpdateCourseChapter: '/courseChapter/updateCourseChapter', // 修改课程章节信息
  getByCourseChapterId: '/courseChapter/getByCourseChapterId', // 根据id获取章节
  getByCourseChapterVideoId: '/courseChapterVideo/getByCourseChapterVideoId', // 根据id获取子章节视频详情
  getUpdateCourseChapterVideo: '/courseChapterVideo/updateCourseChapterVideo', // 修改视频
  getAddCourseData: '/courseData/addCourseData', // 添加课程资料
  getDeleteCourseData: '/courseData/deleteCourseData', //删除课程资料
  getUpdateCourseData: '/courseData/updateCourseData', //修改课程资料
  getDataStatistics: '/courseStudyProgress/dataStatistics', // 获取教师中心运行分析饼图数据
  getAllStudyProgressList: '/courseStudyProgress/getAllStudyProgressList', // 获取教师中心成运行分析成绩列表
  getScoreCount: '/courseScore/getScoreCount', // 获取教师中心成绩管理柱状图数据
  getCourseScoreSum: '/courseScore/getCourseScoreSum', // 获取教师中心成绩管理最高分以及最低分
  getAllCourseScoreList: '/courseScore/getAllCourseScoreList', // 获取教师中心成绩管理成绩列表

  // 题库
  getFindExamSubjectChoicesList:
    '/examSubjectChoices/findExamSubjectChoicesList', // 选择题列表
  getByExamSubjectChoicesId: '/examSubjectChoices/getByExamSubjectChoicesId', // 选择题详情
  getDeleteExamSubjectChoices: '/examSubjectChoices/deleteExamSubjectChoices', // 删除选择题
  getUpdateExamSubjectChoices: '/examSubjectChoices/updateExamSubjectChoices', // 修改选择题
  getAddExamSubjectChoices: '/examSubjectChoices/addExamSubjectChoices', // 添加选择题
  getByExamSubjectChoicesReleased:
    '/examSubjectChoicesCopy/getByExamSubjectChoicesId', // 已发布课程的详情
  getUpdateExamSubjectChoicesCopy:
    '/examSubjectChoicesCopy/updateExamSubjectChoices', // 已发布课程的修改
  getDeleteExamSubjectOptionCopy:
    '/examSubjectOptionCopy/deleteExamSubjectOption', // 删除关联题目选项
  getAddExamSubjectOptionCopy: '/examSubjectOptionCopy/addExamSubjectOption', // 添加关联题目选项
  getDeleteExamSubjectOption: '/examSubjectOption/deleteExamSubjectOption', // 删除题目选项
  getAddExamSubjectOption: '/examSubjectOption/addExamSubjectOption', // 添加题目选项

  // 单元测试
  getFindExamExaminationList: '/examination/findExamExaminationList', // 单元测试列表
  getAddExamination: '/examination/addExamination', // 新建课程
  getAllExaminationSubject: '/examinationSubject/getAllExaminationSubject', // 根据考试信息id 查询管理考试题目列表
  getDeleteExaminationSubject: '/examinationSubject/deleteExaminationSubject', // 删除考试关联题目
  getAddExaminationSubject: '/examinationSubject/addExaminationSubject', // 添加考试关联题目
  getExaminationTwoList: '/examination/ExaminationTwoList', // 考试所有试卷
  getByExaminationId: '/examination/getByExaminationId', // 考试信息详情
  getAddExaminationRecord: '/examinationRecord/addExaminationRecord', // 添加考试记录
  getSubjectExam: '/examAnswer/subjectExam', // 提交考试试卷
  getUpdateExamination: '/examination/updateExamination', // 修改课程信息
  getDeleteExamination: '/examination/deleteExamination', // 删除课程信息
  getUpdateReleaseStatus: '/examination/updateReleaseStatus', // 取消发布
  getAddExaminationPaper: '/examinationPaper/addExaminationPaper', // 添加历史试卷

  // 消息通知
  getAllSystemMsgList: '/messageInfo/getAllSystemMsgList',
  getAllCourseMsgList: '/messageInfo/getAllCourseMsgList', // 课程公告
  getCourseMsgList: '/messageInfo/getCourseMsgList', // 学习中心课程公告
  getAddMessageInfo: '/messageInfo/addMessageInfo', // 添加学习中心课程公告
  getByRecordId: '/examinationRecord/getByRecordId', // 试卷侧边栏的回显
  getFindRecordList: '/examinationRecord/findRecordList', // 考试记录列表

  // 支付页面
  getOrderList: '/order/orderList', // 账户订单列表
  getSelectByCourseId: '/courseInfo/selectByCourseId', // 订单课程详情展示
  getOrderSuccess: '/order/orderSuccess', // 账户订单列表
  getToOrderPay: '/order/toOrderPay', // 订单支付
  getContinuePay: '/order/continuePay', // 继续订单支付
  getDeleteOrder: '/order/deleteOrder', // 删除订单
  getFindStudentOrderExist: '/courseStudyProgress/findStudentOrderExist', // 查看用户是否已购买此课程

  // 首页轮播图
  getAllAdvertisingList: '/adverting/getAllAdvertisingList', // 首页轮播图
  getUploadRecognitionPhoto: '/user/uploadRecognitionPhoto', // 更新存储人脸识别头像

  // 教师中心，学生管理
  getFindStudentList: '/courseStudyProgress/findStudentList', // 教师中心学员管理列表
  getDeleteTeacher: '/courseStudyProgress/deleteTeacher', // 教师中心学员管理退课
  getSchoolTeacherList: '/school/getSchoolTeacherList', //教师中心引进课程列表
  getAllCourseScoreListOne: '/courseScore/getAllCourseScoreListOne', //教师中心成绩管理引进课程成绩列表
  getCourseScoreSumYinJin: '/courseScore/getCourseScoreSum', //教师中心成绩管理引进课程平均，最低，最高分统计，签名为课程id
  getScoreCountOneYinJin: '/courseScore/getScoreCountOne', //教师中心成绩管理引进课程成绩柱状图，签名为课程id
  getAllStudyProgressListOneYinJin:
    '/courseStudyProgress/getAllStudyProgressListOne', //教师中心运行分析引进课程运行分析学习进度列表展示
  getdataStatisticsOneYinJin: '/courseStudyProgress/dataStatisticsOne', //教师中心运行分析引进课程运行分析汇总统计
  getFindRecordListOneYinJin: '/examinationRecord/findRecordListOne', //教师中心单元测试引进课程考试记录列表
  getExaminationTwoListOneYinJin: '/examination/ExaminationTwoListOne', //教师中心单元测试引进课程考试试卷
}
