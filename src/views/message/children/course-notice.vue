<template>
  <div class="course-notice">
    <div v-if="allCourseMsgList.length === 0" class="default-img">
      <img :src="$imgUrl + '/message/defaultpage_content%402x.png'" alt="" />
      <p>
        这里还没有内容哦
      </p>
    </div>
    <div v-else>
      <ul class="system-list">
        <li
          class="system-item"
          v-for="(item, index, key) in allCourseMsgList"
          :key="key"
          @click="
            dialog(item.content, item.title, item.createTime, item.courseName)
          "
        >
          <img
            class="system-img"
            :src="$imgUrl + '/message/list_icon_course_unread%402x.png'"
            alt=""
          />
          <div class="system-main">
            <div class="system-main-top">
              <span class="system-main-text">{{ item.title }}</span>
              <span class="system-main-data">{{ item.createTime }}</span>
            </div>
            <p class="system-main-bottom">
              {{ item.content }}
            </p>
            <p class="system-main-className">
              来自课程<span>《{{ item.courseName }}》</span>
            </p>
          </div>
        </li>
      </ul>
      <el-dialog
        title="消息详情"
        :visible.sync="dialogVisible"
        width="40%"
        :close-on-click-modal="false"
      >
        <p class="el-dialog-title">
          {{ dialogTitle }}
        </p>
        <p class="el-dialog-date">
          来自课程<span>《{{ courseName }}》 </span>{{ dialogCreateTime }}
        </p>
        <div class="el-dialog-content" v-html="marked2html(dialogText)" />
        <span slot="footer" class="dialog-footer"> </span>
      </el-dialog>
      <div class="news-business-page">
        <base-pagenation :total="allCourseMsgTotal" :page-size="5" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BasePagenation from '@components/base/base-pagenation'
import { searchByCondition, resolverMarked } from '@mixins/locality'

export default {
  data() {
    return {
      dialogVisible: false,
      dialogText: '',
      dialogTitle: '',
      dialogCreateTime: '',
      courseName: '',
    }
  },
  components: {
    'base-pagenation': BasePagenation,
  },
  mixins: [searchByCondition(), resolverMarked],
  computed: {
    ...mapState('message', {
      allCourseMsgList: state => state.allCourseMsgList,
      allCourseMsgTotal: state => parseInt(state.allCourseMsgTotal),
    }),
  },
  methods: {
    ...mapActions('message', {
      handleGetDataByCondition: 'getAllCourseMsgList',
    }),
    dialog(text, title, createTime, courseName) {
      this.dialogText = text
      this.dialogTitle = title
      this.dialogCreateTime = createTime
      this.courseName = courseName
      this.dialogVisible = true
    },
  },
}
</script>

<style lang="less" scoped>
.course-notice {
  .default-img {
    min-height: calc(100vh - 348px);
    img {
      width: 150px;
      height: 150px;
      margin-left: 453px;
      margin-top: 200px;
    }
    p {
      text-align: center;
      font-size: 14px;
      font-family: SourceHanSansCN-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
  }
  .system-list {
    margin-top: 52px;
    padding-bottom: 20px;
    min-height: 530px;
    .system-item {
      display: flex;
      padding: 0 30px;
      margin-bottom: 15px;
      cursor: pointer;
      .system-img {
        width: 74px;
        height: 74px;
        border-radius: 50%;
      }
      .system-main {
        margin-left: 34px;
        border-bottom: 1px #e6e6e6 solid;
        .system-main-top {
          display: flex;
          justify-content: space-between;
          .system-main-text {
            font-size: 18px;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
          }
          .system-main-data {
            font-size: 14px;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
          }
        }
        .system-main-bottom {
          margin: 16px 0;
          width: 862px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 14px;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(102, 102, 102, 1);
        }
        .system-main-className {
          margin-bottom: 18px;
          span {
            color: #58c6bd;
            font-size: 14px;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
          }
        }
      }
    }
  }
  .el-dialog-title {
    font-size: 18px;
    font-family: SourceHanSansCN-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    margin-bottom: 20px;
  }
  .el-dialog-date {
    font-size: 14px;
    font-family: SourceHanSansCN-Normal;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    margin-bottom: 30px;
    span {
      color: #58c6bd;
    }
  }
  .el-dialog-content {
    font-size: 14px;
    font-family: SourceHanSansCN-Normal;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 24px;
    min-height: 150px;
  }
  .news-business-page {
    margin-bottom: 15px;
  }
}
</style>
