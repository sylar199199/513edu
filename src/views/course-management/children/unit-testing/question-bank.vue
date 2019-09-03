<template>
  <div class="question-bank-main">
    <div class="question-bank-top">
      全部
    </div>
    <ul>
      <li
        v-for="(item, index) in newFindExamSubjectChoicesList"
        :key="item.idSign"
      >
        <div class="question-bank-left">
          <p>
            {{ index + 1 }}.【{{ item.subjectType }}】
            {{ item.subjectName }}
          </p>
          <p>
            <span> 分值：{{ item.score }}分 </span>
            <span>
              难度：<el-rate
                :value="item.level"
                :disabled="true"
                class="question-el-rate"
              >
              </el-rate>
            </span>
            <span> 日期：{{ item.createTime }} </span>
            <span> 应用：{{ item.examinationName }} </span>
          </p>
        </div>
        <div class="question-bank-right">
          <span @click="details(item.idSign)">详情</span>
          <span @click="redactTopic(item.idSign)">编辑</span>
          <span @click="deteleTopic(item.idSign)">删除</span>
        </div>
      </li>
    </ul>
    <!-- 分页器 -->
    <div class="question-bank-pagination">
      <el-pagination
        background
        layout="total,sizes,prev,pager,next,jumper"
        :total="findExamSubjectChoicesTotal"
        :page-size="5"
        :page-sizes="[5, 10, 20]"
        hide-on-single-page
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
    <!-- 选择题详情 -->
    <el-dialog
      title="题目详情"
      :visible.sync="detailsVisible"
      width="30%"
      class="question-el-radio"
      :close-on-click-modal="false"
    >
      <p class="question-el-p">
        {{ examSubjectChoicesIdList.subjectName }}
      </p>
      <ul class="question-el-div">
        <li
          v-for="item in newexamSubjectOptionVoList"
          :key="item.optionContent"
        >
          <el-radio
            v-model="radio"
            :label="item.optionName"
            class="question-el-check"
            disabled
          ></el-radio>
        </li>
      </ul>
      <div class="question-el-answer-analysis">
        <div class="question-el-answer">
          <p>【答案】</p>
          <p>
            正确答案：<span>{{ examSubjectChoicesIdList.answer }}</span>
          </p>
        </div>
        <div class="question-el-analysis question-el-answer">
          <p>【解析】</p>
          <p>{{ examSubjectChoicesIdList.analysis }}</p>
        </div>
      </div>
      <div class="question-el-wujiaoxing">
        <span> 分值：{{ examSubjectChoicesIdList.score }}分 </span>
        <span class="question-el-wujiaoxing-bottom">
          难度：<el-rate
            :value="newExamSubjectChoicesIdLevel"
            :disabled="true"
            class="wujiaoxing-el-rate"
          >
          </el-rate>
        </span>
      </div>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
    <!-- 编辑选择题 -->
    <multiple-choice
      :new-visible="newVisible"
      :multiple-from="multipleFrom"
      :page-num="pageNum"
      :redact-topic-id="redactTopicId"
      @closeRedactTopic="closeRedactTopic"
      @setDomains="setDomains"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import multipleChoice from '@components/Dialog/choice-question/multiple-choice'

export default {
  data() {
    return {
      radio: '1',
      pageNum: 1,
      size: 5,
      detailsVisible: false,
      newVisible: false,
      multipleFrom: {
        typeValue: '1',
        options: [
          {
            value: '1',
            label: '选择题',
          },
        ],
        numericalVal: '',
        scoreVal: '',
        difficultyVal: null,
        titleVal: '',
        analysisVal: '',
        radio: '1',
        domains: [
          {
            optionContent: '',
            optionName: 'A',
          },
          {
            optionContent: '',
            optionName: 'B',
          },
          {
            optionContent: '',
            optionName: 'C',
          },
          {
            optionContent: '',
            optionName: 'D',
          },
        ],
      },
      turing: true,
      titleMsg: '添加题目',
      redactTopicId: '',
    }
  },
  components: {
    'multiple-choice': multipleChoice,
  },
  methods: {
    ...mapActions('course-management', [
      'getFindExamSubjectChoicesList',
      'getByExamSubjectChoicesId',
      'getDeleteExamSubjectChoices',
      'getUpdateExamSubjectChoices',
    ]),
    handleSizeChange(val) {
      this.size = val
      let numSizeObj = {
        courseIdSign: this.$route.query.sign,
        pageNum: this.pageNum,
        size: this.size,
      }
      this.getFindExamSubjectChoicesList(numSizeObj)
    },

    handleCurrentChange(val) {
      this.pageNum = val
      let numSizeObj = {
        courseIdSign: this.$route.query.sign,
        pageNum: this.pageNum,
        size: this.size,
      }
      this.getFindExamSubjectChoicesList(numSizeObj)
    },
    // 选择题详情
    details(idSign) {
      this.detailsVisible = true
      this.getByExamSubjectChoicesId(idSign)
    },
    // 删除选择题
    async deteleTopic(idSign) {
      await this.getDeleteExamSubjectChoices(idSign)
      let numSizeObj = {
        pageNum: this.pageNum,
        size: this.size,
      }
      await this.getFindExamSubjectChoicesList(numSizeObj)
    },
    // 点击编辑选择题
    async redactTopic(idSign) {
      this.redactTopicId = idSign
      this.newVisible = true
      await this.getByExamSubjectChoicesId(idSign)
      this.multipleFrom.numericalVal = this.examSubjectChoicesIdList.serialNumber
      this.multipleFrom.scoreVal = this.examSubjectChoicesIdList.score
      this.multipleFrom.difficultyVal = parseInt(
        this.examSubjectChoicesIdList.level,
      )
      this.multipleFrom.titleVal = this.examSubjectChoicesIdList.subjectName
      this.multipleFrom.radio = this.examSubjectChoicesIdList.answer
      this.multipleFrom.analysisVal = this.examSubjectChoicesIdList.analysis
      this.multipleFrom.domains = this.examSubjectChoicesIdList.examSubjectOptionVoList
    },
    // 点击取消编辑
    closeRedactTopic() {
      this.newVisible = false
    },
    // 点击新增动态框新增一个
    setDomains() {
      this.multipleFrom.domains = this.examSubjectChoicesIdList.examSubjectOptionVoList
    },
    // 分值变化时
    handDifficulty(val) {
      this.difficultyVal = val
    },
  },
  computed: {
    ...mapState('course-management', {
      findExamSubjectChoicesList: state => state.findExamSubjectChoicesList,
      findExamSubjectChoicesPageNum: state =>
        parseInt(state.findExamSubjectChoicesPageNum),
      findExamSubjectChoicesTotal: state =>
        parseInt(state.findExamSubjectChoicesTotal),
      examSubjectChoicesIdList: state => state.examSubjectChoicesIdList,
    }),
    newExamSubjectChoicesIdLevel() {
      return parseInt(this.examSubjectChoicesIdList.level)
    },
    newFindExamSubjectChoicesList() {
      let list = this.findExamSubjectChoicesList.map(item => {
        if (item.level) {
          item.level = parseInt(item.level)
        }
        return item
      })
      return list
    },
    newexamSubjectOptionVoList() {
      if (this.examSubjectChoicesIdList) {
        var newVoList = this.examSubjectChoicesIdList.examSubjectOptionVoList.map(
          item => {
            if (item.optionName) {
              item.optionName = `${item.optionName}. ${item.optionContent}`
            }
            return item
          },
        )
        return newVoList
      }
      return newVoList || ''
    },
  },
}
</script>

<style lang="less" scoped>
.question-bank-main {
  .question-bank-top {
    padding-left: 31px;
    width: 932px;
    height: 40px;
    font-size: 14px;
    font-family: SourceHanSansCN-Regular;
    font-weight: 400;
    color: rgba(88, 198, 189, 1);
    line-height: 40px;
    background: rgba(240, 240, 240, 1);
  }
  ul {
    margin-top: 30px;
    min-height: 440px;
    li {
      margin-bottom: 30px;
      display: flex;
      justify-content: space-between;
      .question-bank-left {
        width: 710px;
        p:nth-child(1) {
          font-size: 14px;
          font-family: SourceHanSansCN-Regular;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 20px;
        }
        p:nth-child(2) {
          margin-top: 15px;
          display: flex;
          span {
            margin: 0 20px;
          }
          span:nth-child(2) {
            display: flex;
            .question-el-rate {
              position: relative;
              top: -3px;
            }
          }
          span:nth-child(4) {
            display: inline-block;
            width: 170px;
            height: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
      .question-bank-right {
        span {
          margin-right: 30px;
          font-size: 14px;
          font-family: SourceHanSansCN-Regular;
          font-weight: 400;
          color: rgba(88, 198, 189, 1);
          cursor: pointer;
        }
      }
    }
  }
  .question-bank-pagination {
    margin-bottom: 40px;
    margin-top: 40px;
    text-align: center;
  }
  .question-el-radio {
    .question-el-p {
      font-size: 14px;
      font-family: SourceHanSansCN-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 20px;
    }
    .question-el-div {
      padding-left: 20px;
      .question-el-check {
        margin-top: 20px;
        .el-radio__label {
          display: inline-block;
          white-space: pre-wrap;
          padding: 0;
          margin: 0 15px;
          line-height: 20px;
        }
      }
    }
    .question-el-answer-analysis {
      width: 530px;
      height: 167px;
      margin-top: 30px;
      background: rgba(245, 245, 245, 1);
      padding: 0 15px;
      .question-el-answer {
        p:nth-child(1) {
          font-size: 14px;
          font-family: SourceHanSansCN-Regular;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 41px;
        }
        p:nth-child(2) {
          font-size: 14px;
          font-family: SourceHanSansCN-Regular;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: 41px;
          span {
            color: #3ec053;
          }
        }
      }
      .question-el-analysis {
        border-top: 1px #eee solid;
      }
    }
    .question-el-wujiaoxing {
      display: flex;
      margin-top: 20px;
      span {
        font-size: 14px;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
      .question-el-wujiaoxing-bottom {
        margin-left: 30px;
        display: flex;
        .wujiaoxing-el-rate {
          position: relative;
          top: -2px;
        }
      }
    }
  }
  .question-bank-right-answers {
    display: flex;
    margin-bottom: 20px;
    p {
      margin-right: 10px;
    }
  }
}
</style>
