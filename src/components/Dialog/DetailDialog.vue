<template>
  <el-dialog
    title="题目详情"
    :visible.sync="detailsVisible"
    width="30%"
    class="question-el-radio"
    :close-on-click-modal="false"
    :show-close="false"
  >
    <p class="question-el-p">
      {{
        byExamSubjectChoicesReleased
          ? byExamSubjectChoicesReleased.subjectName
          : ''
      }}
    </p>
    <ul class="question-el-div">
      <li v-for="item in newexamSubjectOptionVoList" :key="item.optionContent">
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
          正确答案：<span>{{
            byExamSubjectChoicesReleased
              ? byExamSubjectChoicesReleased.answer
              : ''
          }}</span>
        </p>
      </div>
      <div class="question-el-analysis question-el-answer">
        <p>【解析】</p>
        <p>
          {{
            byExamSubjectChoicesReleased
              ? byExamSubjectChoicesReleased.analysis
              : ''
          }}
        </p>
      </div>
    </div>
    <div class="question-el-wujiaoxing">
      <span>
        分值：{{
          byExamSubjectChoicesReleased
            ? byExamSubjectChoicesReleased.score
            : ''
        }}分
      </span>
      <span class="question-el-wujiaoxing-bottom">
        难度：<el-rate
          :value="newExamSubjectChoicesIdLevel"
          :disabled="true"
          class="wujiaoxing-el-rate"
        >
        </el-rate>
      </span>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('closeDialog')">
        取 消
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      radio: '1',
    }
  },
  props: {
    /* ruleForm: {
      type: Object,
      required: true,
      default: () => {},
    }, */
    detailsVisible: {
      type: Boolean,
    },
    /* page: {
      type: [String, Number],
    }, */
  },
  computed: {
    ...mapState('management', {
      byExamSubjectChoicesReleased: state => state.byExamSubjectChoicesReleased,
    }),
    newexamSubjectOptionVoList() {
      if (this.byExamSubjectChoicesReleased) {
        var newVoList = this.byExamSubjectChoicesReleased.examSubjectOptionVoList.map(
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
    newExamSubjectChoicesIdLevel() {
      return parseInt(
        this.byExamSubjectChoicesReleased
          ? this.byExamSubjectChoicesReleased.level
          : '',
      )
    },
  },
  methods: {
    ...mapActions('management', ['getByExamSubjectChoicesReleased']),
  },
}
</script>

<style lang="less">
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
</style>
