<template>
  <div>
    <div v-if="allCourseQuestionsList.length == 0" class="default-img">
      <img :src="$imgUrl + '/message/defaultpage_content%402x.png'" alt="" />
      <p>
        这里还没有内容哦
      </p>
    </div>
    <div v-else>
      <div class="course-quora-main">
        <ul class="course-quora-list">
          <li
            class="course-quora-item"
            v-for="item in allCourseQuestionsList"
            :key="item.idSign"
          >
            <div class="course-quora-portrait">
              <img :src="item.headPic" alt="" />
            </div>
            <div class="course-quora-item-main">
              <p class="course-quora-title">
                {{ item.questions_content }}
              </p>
              <div class="course-quora-two">
                <span class="course-quora-browse"
                  >{{ item.browsing_volume }}浏览</span
                >
                <span class="course-quora-answer" @click="answer(item)"
                  >{{ item.num }}回答</span
                >
              </div>
              <p class="course-quora-university">
                {{ item.userName }}【{{ item.schoolNme }}】
              </p>
            </div>
            <div class="course-quora-data">
              {{ item.questions_time }}
            </div>
            <el-dialog
              title="互动详情"
              :visible.sync="newstShow"
              width="30%"
              :before-close="handleClose"
              :close-on-click-modal="false"
            >
              <Revert :revert-list="newstNontent" />
              <span slot="footer" class="dialog-footer"> </span>
            </el-dialog>
          </li>
        </ul>
      </div>
      <div class="course-quora-page">
        <base-pagenation :total="quoraTotal" :page-size="3" />
      </div>
    </div>
  </div>
</template>

<script>
import BasePagenation from '@components/base/base-pagenation'
import Revert from './revert'
import { searchByCondition } from '@mixins/locality'
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      newstShow: false,
      newstNontent: {},
    }
  },
  components: {
    'base-pagenation': BasePagenation,
    Revert,
  },
  mixins: [searchByCondition()],
  computed: {
    ...mapState('course-detail', {
      allCourseQuestionsList: state => state.allCourseQuestionsList,
      quoraTotal: state => parseInt(state.quoraTotal),
    }),
  },
  methods: {
    ...mapActions('course-detail', {
      handleGetDataByCondition: 'getAllCourseQuestionsList',
      getAllCourseQuestionsAnswers: 'getAllCourseQuestionsAnswers',
    }),
    ...mapMutations('course-detail', ['geTallCourseQuestionsAnswersId']),
    async answer(content) {
      this.newstNontent = content
      this.newstShow = true
      await this.geTallCourseQuestionsAnswersId(content.idSign)
      await this.getAllCourseQuestionsAnswers()
    },
    async handleClose() {
      this.newstShow = false
      await this.handleGetDataByCondition()
    },
  },
}
</script>

<style lang="less" scoped>
.default-img {
  img {
    width: 150px;
    height: 150px;
    margin-left: 492px;
    margin-top: 100px;
  }
  p {
    text-align: center;
    font-size: 14px;
    font-family: SourceHanSansCN-Regular;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
  }
}
.course-quora-main {
  .course-quora-list {
    margin-bottom: 30px;
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
        img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
        }
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
            cursor: pointer;
          }
          .course-quora-answer {
            font-size: 14px;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: @maincolor;
            margin-left: 29px;
            cursor: pointer;
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
</style>
