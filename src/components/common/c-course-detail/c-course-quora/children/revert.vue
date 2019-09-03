<template>
  <div>
    <ul class="revert-list">
      <li class="revert-list-text">
        {{ revertList.questions_content }}
      </li>
      <li class="revert-list-Self-introduction">
        <span class="revert-list-Self-name">
          {{ revertList.userName }}【{{ revertList.schoolNme }}】
        </span>
        <span class="revert-list-Self-name">
          发布于：{{ revertList.questions_time }}
        </span>
      </li>
      <li class="revert-item-dispatch">
        <el-input v-model="revertInput" placeholder="请输入内容"></el-input>
        <el-button
          type="primary"
          class="revert-item-dispatch-btn"
          @click="getRevert"
        >
          提交
        </el-button>
      </li>
    </ul>
    <ul class="revert-answer-list">
      <li
        class="revert-answer-item"
        v-for="item in allCourseQuestionsAnswers"
        :key="item.sign"
      >
        <div class="revert-answer-one">
          <img class="revert-answer-headImg" :src="item.answersPhoto" alt="" />
          <span class="revert-answer-name-school">
            {{ item.answersName }}【{{ item.answersSchool }}】
          </span>
        </div>
        <div class="revert-answer-two">
          {{ item.answersContent }}
        </div>
        <div class="revert-answer-three">
          <span class="revert-answer-list">{{ item.answersTime }}</span>
        </div>
      </li>
    </ul>
    <div class="course-quora-page">
      <base-pagenation
        :total="allCourseQuestionsAnswersTotal || 1"
        :page-size="3"
      />
    </div>
  </div>
</template>

<script>
import BasePagenation from '@components/base/base-pagenation'
import { searchByCondition } from '@mixins/locality'
import { mapState, mapActions } from 'vuex'
export default {
  props: {
    revertList: {
      type: Object,
    },
  },
  components: {
    'base-pagenation': BasePagenation,
  },
  mixins: [searchByCondition()],
  data() {
    return {
      revertInput: '',
      answerInput: '',
    }
  },
  computed: {
    ...mapState('course-detail', {
      allCourseQuestionsAnswers: state => state.allCourseQuestionsAnswers,
      allCourseQuestionsAnswersTotal: state =>
        parseInt(state.allCourseQuestionsAnswersTotal),
    }),
  },
  methods: {
    ...mapActions('course-detail', {
      handleGetDataByCondition: 'getAllCourseQuestionsAnswers',
      getAddCourseQuestionsAnswers: 'getAddCourseQuestionsAnswers',
    }),
    async getRevert() {
      await this.getAddCourseQuestionsAnswers(this.revertInput)
      await this.handleGetDataByCondition()
    },
  },
}
</script>

<style lang="less" scoped>
.revert-list {
  .revert-list-text {
    font-size: 16px;
    font-family: SourceHanSansCN-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
  .revert-list-Self-introduction {
    margin: 20px 0;
    .revert-list-Self-name {
      font-size: 12px;
      font-family: SourceHanSansCN-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      margin-right: 15px;
    }
    .revert-list-Self-huifu {
      color: #58c6bd;
    }
  }
  .revert-item-dispatch {
    display: flex;
    justify-content: space-between;
    .revert-item-dispatch-btn {
      margin-left: 25px;
    }
  }
}
.revert-answer-list {
  margin-top: 56px;
  margin-left: 30px;
  .revert-answer-item {
    margin-bottom: 30px;
    .revert-answer-one {
      position: relative;
      .revert-answer-headImg {
        width: 34px;
        height: 34px;
        border-radius: 50%;
      }
      .revert-answer-name-school {
        font-size: 14px;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        cursor: pointer;
        position: absolute;
        top: 10px;
        left: 50px;
      }
    }
    .revert-answer-two {
      width: 700px;
      margin: 8px 0 20px 45px;
      font-size: 14px;
      font-family: SourceHanSansCN-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 24px;
    }
    .revert-answer-three {
      margin-left: 15px;
      .revert-answer-list {
        font-size: 12px;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        margin-right: 20px;
      }
      .revert-green {
        color: #58c6bd;
      }
    }
    .revert-answer-fours {
      display: flex;
      padding-left: 45px;
      padding-right: 20px;
      margin-top: 20px;
      .revert-answer-fours-btn {
        margin-left: 24px;
      }
    }
  }
}
</style>
