<template>
  <div class="course-quora">
    <div class="course-bulletin-notice">
      <span class="course-bulletin-green"></span>
      <h2 class="course-bulletin-notice">
        互动问答
      </h2>
      <div class="course-quora-radio">
        <el-radio v-model="radio" label="1">
          最新
        </el-radio>
        <el-radio v-model="radio" label="2">
          最热
        </el-radio>
      </div>
      <div class="course-quora-button">
        <el-button type="primary" @click="centerDialogVisible = true">
          提问
        </el-button>
      </div>
    </div>
    <Newst v-if="quoraIsshow" />
    <Hotlist v-else />
    <el-dialog
      title="回复"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
      :close-on-click-modal="false"
    >
      <el-input
        type="textarea"
        class="quora-dialog-input"
        placeholder="请输入内容"
        v-model="textareaText"
        maxlength="1000"
        show-word-limit
      >
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closeReply()">发布问题</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Newst from './children/newst'
import Hotlist from './children/hotlist'
import { mapActions } from 'vuex'
export default {
  components: {
    Newst,
    Hotlist,
  },
  data() {
    return {
      radio: '1',
      quoraIsshow: true,
      centerDialogVisible: false,
      textareaText: '',
    }
  },
  watch: {
    radio: function(newRadio, oldRadio) {
      if (parseInt(newRadio) === 2) {
        this.quoraIsshow = false
      } else {
        this.quoraIsshow = true
      }
    },
  },
  methods: {
    ...mapActions('course-detail', [
      'getAddCourseQuestions',
      'getAllCourseQuestionsList',
      'getAllCourseQuestionsOneList',
    ]),
    async closeReply() {
      this.centerDialogVisible = false
      await this.getAddCourseQuestions(this.textareaText)
      await setTimeout(() => {
        this.getAllCourseQuestionsList()
      }, 600)
    },
  },
}
</script>

<style lang="less">
.el-tabs__content {
  overflow: visible !important;
}
.course-quora-radio {
  margin-left: 28px;
  margin-top: 3px;
}
.course-quora-button {
  position: absolute;
  right: 0;
  top: -10px;
}
.course-quora-main {
  .course-quora-list {
    .course-quora-item {
      display: flex;
      margin-top: 20px;
      padding-bottom: 30px;
      border-bottom: 1px #e6e6e6 solid;
      position: relative;
      .course-quora-portrait {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: url('http://front.513online.top/front/head%20portrait_img01%402x.png');
        background-size: cover;
      }
      .course-quora-item-main {
        margin-left: 22px;
        margin-top: 7px;
        .course-quora-title {
          font-size: 16px;
          font-family: SourceHanSansCN-Regular;
          font-weight: 400;
          color: #333;
        }
        .course-quora-two {
          margin-top: 15px;
          .course-quora-browse {
            font-size: 14px;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: #666;
          }
          .course-quora-answer {
            font-size: 14px;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: @maincolor;
            margin-left: 29px;
          }
        }
        .course-quora-university {
          font-size: 12px;
          font-family: SourceHanSansCN-Regular;
          font-weight: 400;
          color: #999;
          margin-top: 15px;
        }
      }
      .course-quora-data {
        position: absolute;
        right: 0;
        top: 7px;
        font-size: 12px;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: #999;
      }
    }
  }
}
.quora-dialog-input {
  width: 100%;
  height: 200px;
  background: #e6e6e6;
  textarea {
    widows: 100%;
    height: 100%;
  }
}
</style>
